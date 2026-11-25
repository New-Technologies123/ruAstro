<?php
declare(strict_types=1);
namespace RuAstro\Forms;
define('RUASTRO_FORM_ENTRY', true);
require __DIR__ . '/_forms/bootstrap.php';

run(static function (): void {
    begin('question', 'application/json');
    $data = jsonBody();
    $contact = contact($data);
    $question = text($data, 'message', 'Вопрос', 5000, true, true);
    consent($data, 'agreement');
    consent($data, 'privacyAgreement');
    $id = bin2hex(random_bytes(8));
    $message = "НОВОЕ ОБРАЩЕНИЕ $id\nДата (UTC): " . gmdate('c') . "\n\n";
    $message .= "Имя: {$contact['name']}\nEmail: {$contact['email']}\nТелефон: {$contact['phone']}\n\n$question\n\n";
    $message .= "Согласие на обработку персональных данных: ДА\nОзнакомление с политикой конфиденциальности: ДА";
    $sent = sendText('nt@tech-new.ru', 'Новое обращение с сайта', $message, $contact['email']);
    audit('question', ['id' => $id, 'sent' => $sent]);
    if (!$sent) throw new FormError('Не удалось отправить вопрос. Попробуйте позже.', 502);
    respond(['success' => true, 'message' => 'Сообщение успешно отправлено']);
});
