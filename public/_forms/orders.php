<?php
declare(strict_types=1);
namespace RuAstro\Forms;

if (!defined('RUASTRO_FORM_ENTRY')) { http_response_code(404); exit; }

function orderOnce(array $data, callable $send): array
{
    $requestId = text($data, 'requestId', 'Идентификатор заявки', 36);
    if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $requestId)) {
        throw new FormError('Некорректный идентификатор заявки. Обновите страницу.');
    }
    unset($data['requestId']);
    $fingerprint = hash('sha256', json_encode($data, JSON_THROW_ON_ERROR));
    $directory = privateDirectory() . '/orders';
    if (!is_dir($directory) && !@mkdir($directory, 0700) && !is_dir($directory)) throw new FormError('Сервис заявок временно недоступен.', 503);
    $path = $directory . '/' . hash('sha256', strtolower($requestId)) . '.json';
    $file = fopen($path . '.lock', 'c+');
    if (!$file || !flock($file, LOCK_EX)) throw new FormError('Сервис заявок временно недоступен.', 503);
    @chmod($path . '.lock', 0600);
    try {
        $contents = is_file($path) ? file_get_contents($path) : '';
        $record = $contents === '' ? null : json_decode($contents, true, 16, JSON_THROW_ON_ERROR);
        if ($record && !hash_equals($record['fingerprint'], $fingerprint)) throw new FormError('Этот идентификатор уже использован для другой заявки.', 409);
        if (($record['state'] ?? '') === 'complete') return $record['response'];
        if (($record['state'] ?? '') === 'pending') {
            throw new FormError('Заявка ' . $record['id'] . ' уже обрабатывается. Не отправляйте её повторно; уточните статус у менеджера.', 409);
        }
        // A catalog failure happens before any mail attempt and must remain retryable.
        $order = orderLines($data);
        $record = [
            'fingerprint' => $fingerprint,
            'id' => $record['id'] ?? 'NT-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(6))),
            'state' => 'pending', 'time' => gmdate('c'),
        ];
        writeOrderRecord($path, $record);
        try {
            $response = $send($record['id'], $order);
        } catch (FormError $error) {
            // An explicit rejection is safe to retry; ambiguous failures stay pending.
            if ($error->status < 500 || $error->status === 502) {
                $record['state'] = 'failed';
                writeOrderRecord($path, $record);
            }
            throw $error;
        }
        $record['state'] = 'complete';
        $record['response'] = $response;
        writeOrderRecord($path, $record);
        return $response;
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}

function writeOrderRecord(string $path, array $record): void
{
    $json = json_encode($record, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    $temporary = $path . '.' . bin2hex(random_bytes(8)) . '.tmp';
    $file = fopen($temporary, 'x');
    if (!$file) throw new \RuntimeException('Order record unavailable');
    @chmod($temporary, 0600);
    try {
        if (fwrite($file, $json) !== strlen($json) || !fflush($file) || (function_exists('fsync') && !fsync($file))) {
            throw new \RuntimeException('Order record write failed');
        }
    } finally {
        fclose($file);
    }
    // Replace the record atomically: an interrupted write must not erase a sent order.
    if (!rename($temporary, $path)) { @unlink($temporary); throw new \RuntimeException('Order record replace failed'); }
}
