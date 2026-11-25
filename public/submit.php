<?php
declare(strict_types=1);
namespace RuAstro\Forms;
define('RUASTRO_FORM_ENTRY', true);
require __DIR__ . '/_forms/bootstrap.php';

run(static function (): void {
    begin('procurement', 'multipart/form-data');
    $contact = contact($_POST, 'fullName');
    $company = text($_POST, 'company', 'Компания', 300);
    $inn = text($_POST, 'inn', 'ИНН', 12);
    if (!preg_match('/^(?:[0-9]{10}|[0-9]{12})$/', $inn)) throw new FormError('ИНН должен содержать 10 или 12 цифр.');
    $lot = text($_POST, 'lot', 'Номер лота', 200);
    consent($_POST, 'consent');
    consent($_POST, 'privacyAgreement');
    $documents = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
    $attachments = [];
    foreach (['egrul', 'charter', 'partnerCard', 'directorDecision'] as $field) {
        $attachments[] = attachment($field, $documents);
    }
    $attachments[] = attachment('offerFile', ['xlsx', 'xls']);
    $attachments[] = attachment('invoicePDF', ['pdf']);
    if (array_sum(array_column($attachments, 'size')) > MAX_FILES_BYTES) throw new FormError('Общий размер файлов не должен превышать 12 МБ.', 413);
    $id = bin2hex(random_bytes(8));
    $message = "ПРЕДЛОЖЕНИЕ ПО ЛОТУ $lot\nНомер обращения: $id\nДата (UTC): " . gmdate('c') . "\n\n";
    $message .= "ФИО: {$contact['name']}\nКомпания: $company\nEmail: {$contact['email']}\nТелефон: {$contact['phone']}\nИНН: $inn\n\n";
    $message .= "Согласие на обработку персональных данных: ДА\nОзнакомление с политикой конфиденциальности: ДА\n\nДокументы:\n";
    foreach ($attachments as $file) $message .= $file['name'] . ' (' . $file['size'] . " байт)\n";
    $boundary = 'ruastro_' . bin2hex(random_bytes(24));
    $headers = mailHeaders($contact['email']) . "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($message)) . "\r\n";
    foreach ($attachments as $file) {
        $body .= "--$boundary\r\nContent-Type: {$file['mime']}\r\nContent-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"{$file['name']}\"\r\n\r\n";
        $body .= chunk_split(base64_encode(file_get_contents($file['path']))) . "\r\n";
    }
    $body .= "--$boundary--\r\n";
    $recipients = [
        'nadyrgulovty@tech-new.ru', 'naf@tech-new.ru', 'dolgushinasl@tech-new.ru',
        'elizarevaiv@tech-new.ru', 'nurmukhametovab@tech-new.ru', 'zinurovih@tech-new.ru',
    ];
    $subject = '=?UTF-8?B?' . base64_encode('Предложение закупок МТР — лот ' . $lot) . '?=';
    $sentCount = 0;
    foreach ($recipients as $recipient) {
        if (mail($recipient, $subject, $body, $headers)) $sentCount++;
    }
    audit('procurement', ['id' => $id, 'sent' => $sentCount, 'files' => count($attachments)]);
    if ($sentCount === 0) throw new FormError('Не удалось отправить предложение. Попробуйте позже.', 502);
    respond(['success' => true, 'message' => 'Предложение успешно отправлено', 'submissionId' => $id]);
});
