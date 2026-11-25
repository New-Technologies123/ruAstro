<?php
declare(strict_types=1);

namespace RuAstro\Forms;

if (!defined('RUASTRO_FORM_ENTRY')) {
    http_response_code(404);
    exit;
}

const MAX_FILE_BYTES = 3 * 1024 * 1024;
const MAX_FILES_BYTES = 12 * 1024 * 1024;

final class FormError extends \RuntimeException
{
    public int $status;

    public function __construct(string $message, int $status = 422)
    {
        parent::__construct($message);
        $this->status = $status;
    }
}

function respond(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
}

function run(callable $handler): void
{
    ini_set('display_errors', '0');
    try {
        $handler();
    } catch (FormError $error) {
        respond(['success' => false, 'error' => $error->getMessage()], $error->status);
    } catch (\Throwable $error) {
        // Do not put submitted values, headers or exception messages into public logs.
        error_log('ruAstro form: internal failure (' . get_class($error) . ')');
        respond(['success' => false, 'error' => 'Не удалось обработать заявку. Попробуйте позже.'], 500);
    }
}

function begin(string $endpoint, string $type): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        throw new FormError('Используйте метод POST.', 405);
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = array_filter(array_map('trim', explode(',', getenv('FORM_ALLOWED_ORIGINS') ?: 'https://tech-new.ru,https://www.tech-new.ru')));
    if (PHP_SAPI === 'cli-server') {
        $allowed[] = 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
    }
    if ($origin !== '' && !in_array($origin, $allowed, true)) {
        throw new FormError('Отправка с этого сайта запрещена.', 403);
    }
    $contentType = strtolower(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]);
    if ($contentType !== $type) {
        throw new FormError('Неверный формат запроса.', 415);
    }
    $limit = $type === 'application/json' ? 32768 : MAX_FILES_BYTES + 1024 * 1024;
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > $limit) {
        throw new FormError('Превышен допустимый размер заявки.', 413);
    }
    rateLimit($endpoint);
}

function privateDirectory(): string
{
    $directory = getenv('FORM_PRIVATE_DIR') ?: sys_get_temp_dir() . '/ruastro-forms-' . substr(hash('sha256', __DIR__), 0, 16);
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        throw new FormError('Сервис заявок временно недоступен.', 503);
    }
    $resolved = realpath($directory);
    $roots = [realpath(dirname(__DIR__)), realpath($_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__))];
    foreach ($roots as $root) {
        if ($root && $resolved && str_starts_with(strtolower(str_replace('\\', '/', $resolved)) . '/', strtolower(str_replace('\\', '/', $root)) . '/')) {
            throw new FormError('Сервис заявок временно недоступен.', 503);
        }
    }
    if (!$resolved || !is_writable($resolved)) {
        throw new FormError('Сервис заявок временно недоступен.', 503);
    }
    return $resolved;
}

function rateLimit(string $endpoint): void
{
    $file = fopen(privateDirectory() . '/rate-limits.json', 'c+');
    if (!$file || !flock($file, LOCK_EX)) {
        throw new FormError('Сервис заявок временно недоступен.', 503);
    }
    try {
        $now = time();
        $entries = json_decode(stream_get_contents($file, 2 * 1024 * 1024), true) ?: [];
        foreach ($entries as $key => $timestamps) {
            $entries[$key] = array_values(array_filter($timestamps, static fn($value) => is_int($value) && $value > $now - 900));
            if (!$entries[$key]) unset($entries[$key]);
        }
        $key = hash('sha256', $endpoint . ':' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        $limit = max(1, min(1000, (int) (getenv('FORM_RATE_LIMIT') ?: 10)));
        if (count($entries[$key] ?? []) >= $limit) {
            header('Retry-After: 900');
            throw new FormError('Слишком много заявок. Повторите попытку через 15 минут.', 429);
        }
        if (count($entries) >= 10000 && !isset($entries[$key])) {
            throw new FormError('Сервис заявок временно перегружен.', 503);
        }
        $entries[$key][] = $now;
        rewind($file);
        ftruncate($file, 0);
        if (fwrite($file, json_encode($entries)) === false) throw new \RuntimeException('Rate limit write failed');
        fflush($file);
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}

function jsonBody(): array
{
    $body = file_get_contents('php://input', false, null, 0, 32769);
    if ($body === false || strlen($body) > 32768) throw new FormError('Превышен размер заявки.', 413);
    try {
        $data = json_decode($body, true, 32, JSON_THROW_ON_ERROR);
    } catch (\JsonException $error) {
        throw new FormError('Неверный JSON.', 400);
    }
    if (!is_array($data) || !str_starts_with(ltrim($body), '{')) throw new FormError('Ожидается объект заявки.', 400);
    return $data;
}

function text(array $data, string $field, string $label, int $max = 200, bool $required = true, bool $multiline = false): string
{
    $value = $data[$field] ?? '';
    if (!is_string($value) || !preg_match('//u', $value)) throw new FormError('Некорректное поле «' . $label . '».');
    $value = trim($value);
    $length = preg_match_all('/./us', $value);
    if (($required && $value === '') || $length > $max || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $value) || (!$multiline && preg_match('/[\r\n]/', $value))) {
        throw new FormError('Проверьте поле «' . $label . '» (не более ' . $max . ' символов).');
    }
    return $value;
}

function contact(array $data, string $nameField = 'name'): array
{
    $name = text($data, $nameField, 'Имя');
    $email = text($data, 'email', 'Email', 254);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) throw new FormError('Укажите корректный email.');
    $phone = text($data, 'phone', 'Телефон', 30);
    $digits = preg_replace('/\D/', '', $phone);
    if (!preg_match('/^\+?[0-9 ()-]+$/', $phone) || strlen($digits) < 10 || strlen($digits) > 15) {
        throw new FormError('Укажите корректный телефон.');
    }
    return compact('name', 'email', 'phone');
}

function consent(array $data, string $field): void
{
    if (($data[$field] ?? null) !== true && ($data[$field] ?? null) !== 'true') {
        throw new FormError('Подтвердите обязательные согласия.');
    }
}

function audit(string $event, array $metadata): void
{
    $path = privateDirectory() . '/submissions-' . gmdate('Y-m') . '.log';
    // Only internal identifiers, delivery status and counts; no contact details or message bodies.
    $record = ['time' => gmdate('c'), 'event' => $event] + $metadata;
    if (file_put_contents($path, json_encode($record, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND | LOCK_EX) === false) {
        error_log('ruAstro form: audit write failed');
    }
    @chmod($path, 0600);
    foreach (glob(privateDirectory() . '/submissions-*.log') ?: [] as $old) {
        if (filemtime($old) < time() - 90 * 86400) @unlink($old);
    }
}

function mailHeaders(string $email): string
{
    return "MIME-Version: 1.0\r\nFrom: no-reply@tech-new.ru\r\nReply-To: $email\r\n";
}

function sendText(string $recipient, string $subject, string $message, string $email): bool
{
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    return mail($recipient, $encodedSubject, $message, mailHeaders($email) . "Content-Type: text/plain; charset=UTF-8\r\n");
}

function orderLines(array $data): array
{
    $cart = $data['cart'] ?? null;
    if (!is_array($cart) || !array_is_list($cart) || count($cart) < 1 || count($cart) > 100) {
        throw new FormError('В заказе должно быть от 1 до 100 позиций.');
    }
    $catalogPath = dirname(__DIR__) . '/server-data/order-catalog.json';
    if (!is_file($catalogPath)) throw new FormError('Каталог временно недоступен.', 503);
    $catalog = json_decode(file_get_contents($catalogPath), true, 32, JSON_THROW_ON_ERROR);
    $counts = [];
    foreach ($cart as $item) {
        if (!is_array($item)) throw new FormError('Некорректная позиция заказа.');
        $sku = text($item, 'sku', 'Код товара', 600);
        $count = $item['count'] ?? null;
        if (!is_int($count) || $count < 1 || $count > 999) throw new FormError('Количество товара должно быть целым числом от 1 до 999.');
        if (!isset($catalog[$sku])) throw new FormError('Товар или цена изменились. Обновите корзину перед отправкой.');
        $counts[$sku] = ($counts[$sku] ?? 0) + $count;
        if ($counts[$sku] > 999) throw new FormError('Суммарное количество одного товара не должно превышать 999.');
    }
    $lines = [];
    $totalMinor = 0;
    foreach ($counts as $sku => $count) {
        $product = $catalog[$sku];
        if (!is_int($product['priceMinor'] ?? null) || $product['priceMinor'] < 0 || !is_string($product['title'] ?? null)) {
            throw new \RuntimeException('Invalid server catalog');
        }
        $lineMinor = $product['priceMinor'] * $count;
        $totalMinor += $lineMinor;
        $lines[] = ['sku' => $sku, 'title' => $product['title'], 'count' => $count, 'priceMinor' => $product['priceMinor'], 'totalMinor' => $lineMinor];
    }
    return ['lines' => $lines, 'totalMinor' => $totalMinor];
}

function money(int $minor): string
{
    return number_format($minor / 100, $minor % 100 === 0 ? 0 : 2, ',', ' ');
}

function attachment(string $field, array $extensions): array
{
    $file = $_FILES[$field] ?? null;
    if (!is_array($file) || !is_int($file['error'] ?? null) || $file['error'] !== UPLOAD_ERR_OK || !is_string($file['tmp_name'] ?? null) || !is_string($file['name'] ?? null)) {
        $tooLarge = is_array($file) && in_array($file['error'] ?? null, [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true);
        throw new FormError($tooLarge ? 'Каждый файл должен быть не больше 3 МБ.' : 'Прикрепите документ «' . $field . '».', $tooLarge ? 413 : 422);
    }
    $path = $file['tmp_name'];
    $size = is_uploaded_file($path) ? filesize($path) : false;
    if (!$size || $size > MAX_FILE_BYTES) throw new FormError('Каждый файл должен быть от 1 байта до 3 МБ.', 413);
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($extension, $extensions, true)) throw new FormError('Недопустимый формат документа «' . $field . '».');
    if (!class_exists(\finfo::class)) throw new FormError('Проверка файлов временно недоступна.', 503);
    $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($path);
    $prefix = file_get_contents($path, false, null, 0, 16);
    $types = [
        'pdf' => ['application/pdf'], 'jpg' => ['image/jpeg'], 'jpeg' => ['image/jpeg'], 'png' => ['image/png'],
        'doc' => ['application/msword', 'application/x-ole-storage', 'application/CDFV2'],
        'xls' => ['application/vnd.ms-excel', 'application/x-ole-storage', 'application/CDFV2'],
        'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'],
        'xlsx' => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'],
    ];
    if (!in_array($mime, $types[$extension], true)) throw new FormError('Содержимое файла не соответствует расширению «' . $field . '».');
    if ($extension === 'pdf' && !str_starts_with($prefix, '%PDF-')) throw new FormError('Некорректный PDF.');
    if (in_array($extension, ['jpg', 'jpeg', 'png'], true) && @getimagesize($path) === false) throw new FormError('Некорректное изображение.');
    if (in_array($extension, ['doc', 'xls'], true)) {
        $contents = file_get_contents($path);
        $stream = $extension === 'doc' ? "W\0o\0r\0d\0D\0o\0c\0u\0m\0e\0n\0t\0" : "W\0o\0r\0k\0b\0o\0o\0k\0";
        if (!str_starts_with($prefix, "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1") || (strpos($contents, $stream) === false && !($extension === 'xls' && strpos($contents, "B\0o\0o\0k\0") !== false))) {
            throw new FormError('Некорректный документ Office.');
        }
    }
    if (in_array($extension, ['xlsx', 'docx'], true)) validateOfficeArchive($path, $extension);
    return ['path' => $path, 'size' => $size, 'name' => $field . '.' . $extension, 'mime' => $types[$extension][0]];
}

function validateOfficeArchive(string $path, string $extension): void
{
    if (!class_exists(\ZipArchive::class)) throw new FormError('Проверка документов Office временно недоступна.', 503);
    $zip = new \ZipArchive();
    if ($zip->open($path, \ZipArchive::RDONLY) !== true) throw new FormError('Повреждён документ Office.');
    try {
        $required = $extension === 'xlsx' ? 'xl/workbook.xml' : 'word/document.xml';
        if ($zip->locateName('[Content_Types].xml') === false || $zip->locateName($required) === false || $zip->numFiles > 2000) throw new FormError('Некорректный документ Office.');
        $total = 0;
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $entry = $zip->statIndex($i);
            $total += $entry['size'];
            if ($total > 30 * 1024 * 1024 || !empty($entry['encryption_method']) || preg_match('~(?:^|/)\.\.(?:/|$)|vbaProject|(?:^|/)embeddings/|\.(?:exe|dll|php|js|vbs)$~i', $entry['name'])) {
                throw new FormError('Документ Office содержит недопустимые вложения или слишком большой объём данных.');
            }
        }
    } finally {
        $zip->close();
    }
}
