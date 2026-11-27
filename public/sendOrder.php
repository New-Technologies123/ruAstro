<?php
declare(strict_types=1);
namespace RuAstro\Forms;
define('RUASTRO_FORM_ENTRY', true);
require __DIR__ . '/_forms/bootstrap.php';
require __DIR__ . '/_forms/orders.php';

run(static function (): void {
    $multipart = strtolower(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]) === 'multipart/form-data';
    begin('order', $multipart ? 'multipart/form-data' : 'application/json');
    $data = $multipart ? multipartOrderBody() : jsonBody();
    $attachment = orderAttachment();
    // Fingerprint the verified upload, never a client-supplied file description.
    unset($data['attachment']);
    if ($attachment !== null) {
        $data['attachment'] = ['sha256' => $attachment['sha256'], 'size' => $attachment['size'], 'name' => $attachment['label']];
    }
    $contact = contact($data);
    $position = text($data, 'position', 'Должность', 200, false);
    $company = text($data, 'company', 'Компания', 300);
    $comment = text($data, 'comment', 'Комментарий', 5000, false, true);
    consent($data, 'consent');
    consent($data, 'offerAgreement');
    $result = orderOnce($data, static function (string $orderId, array $order, string $createdAt) use ($contact, $position, $company, $comment, $attachment): array {
        $message = "НОВЫЙ ЗАКАЗ $orderId\nДата (UTC): $createdAt\n\n";
        $message .= "ФИО: {$contact['name']}\nДолжность: $position\nКомпания: $company\n";
        $message .= "Email: {$contact['email']}\nТелефон: {$contact['phone']}\nКомментарий: $comment\n\n";
        if ($attachment !== null) $message .= "Вложение: {$attachment['label']}\n\n";
        $message .= "Согласие на обработку персональных данных: ДА\nСогласие с офертой: ДА\n\n";
        $itemsMessage = '';
        foreach ($order['lines'] as $index => $item) {
            $itemsMessage .= ($index + 1) . '. ' . $item['title'] . "\n";
            $itemsMessage .= 'Количество: ' . $item['count'] . ' шт. Цена: ' . money($item['priceMinor']) . ' ₽. Сумма: ' . money($item['totalMinor']) . " ₽\n\n";
        }
        $message .= $itemsMessage;
        $message .= 'ИТОГО: ' . money($order['totalMinor']) . " ₽ (без НДС)\nЦены проверены по серверному каталогу.";
        $sent = sendOrderMessage("Новый заказ $orderId с сайта", $message, $contact['email'], $attachment);
        audit('order', ['id' => $orderId, 'sent' => $sent, 'items' => count($order['lines'])]);
        if (!$sent) throw new FormError('Не удалось отправить заказ. Попробуйте позже.', 502);

        $confirmation = "Здравствуйте!\n\nВаша заявка $orderId принята в обработку.\n\nЗаказанные товары:\n\n" . $itemsMessage;
        $confirmation .= 'ИТОГО: ' . money($order['totalMinor']) . " ₽ (без НДС).\n\n";
        $confirmation .= "Менеджер свяжется с вами для подтверждения комплектации и условий поставки.\n\nООО ИПП «Новые Технологии»\ntendernt@tech-new.ru";
        $confirmationSent = false;
        try {
            $confirmationSent = sendText($contact['email'], "Ваша заявка $orderId принята", $confirmation, 'tendernt@tech-new.ru');
        } catch (\Throwable $error) {
            // The manager already received the order; a failed customer copy must not invite a duplicate submission.
        }
        audit('order-confirmation', ['id' => $orderId, 'sent' => $confirmationSent]);
        $receipt = [
            'id' => $orderId, 'createdAt' => $createdAt, 'totalMinor' => $order['totalMinor'],
            'lines' => array_map(static fn(array $line): array => array_diff_key($line, ['sku' => true]), $order['lines']),
        ];
        return ['success' => true, 'message' => 'Заказ успешно отправлен', 'orderId' => $orderId, 'totalMinor' => $order['totalMinor'], 'confirmationSent' => $confirmationSent, 'receipt' => $receipt];
    });
    respond($result);
});
