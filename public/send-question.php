<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $name = htmlspecialchars($data['name'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $phone = htmlspecialchars($data['phone'] ?? '');
    $messageText = htmlspecialchars($data['message'] ?? '');

    // ✅ Получаем состояние чекбоксов
    $agreement = !empty($data['agreement']) ? '✅ ДА' : '❌ НЕТ';
    $privacyAgreement = !empty($data['privacyAgreement']) ? '✅ ДА' : '❌ НЕТ';

    // ✅ Метаданные
    $date = date("d.m.Y H:i:s"); // Локальное время
    $dateISO = gmdate("c"); // ISO 8601 (UTC)
    $policyVersion = 'v1.0 (от 01.04.2024)';
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $referer = $_SERVER['HTTP_REFERER'] ?? 'Прямой переход';
    
    // ✅ Формирование красивого письма
    $message = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $message .= "📨 НОВОЕ ОБРАЩЕНИЕ С САЙТА\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    $message .= "👤 ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ:\n";
    $message .= "────────────────────────────────────────\n";
    $message .= "Имя: $name\n";
    $message .= "Email: $email\n";
    $message .= "Телефон: $phone\n\n";
    
    $message .= "💬 СООБЩЕНИЕ:\n";
    $message .= "────────────────────────────────────────\n";
    $message .= "$messageText\n\n";
    
    $message .= "✅ СОГЛАСИЯ:\n";
    $message .= "────────────────────────────────────────\n";
    $message .= "Согласие на обработку персональных данных: $agreement\n";
    $message .= "Ознакомление с политикой конфиденциальности: $privacyAgreement\n\n";
    
    $message .= "📊 ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ:\n";
    $message .= "────────────────────────────────────────\n";
    $message .= "Дата и время: $date\n";
    $message .= "Временная метка (UTC): $dateISO\n";
    $message .= "Версия политики конфиденциальности: $policyVersion\n";
    $message .= "IP-адрес: $ip\n";
    $message .= "Источник: $referer\n";
    $message .= "User-Agent: $userAgent\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

    // Email получателя
    $to = "nt@tech-new.ru";
    $subject = "=?UTF-8?B?" . base64_encode("📨 Новое обращение с сайта") . "?=";

    // Заголовки письма
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: no-reply@tech-new.ru\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Логирование для отладки
    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'to' => $to,
        'subject' => $subject,
        'from' => $email,
        'name' => $name,
        'agreement' => $agreement,
        'privacyAgreement' => $privacyAgreement,
        'ip' => $ip
    ];
    
    // Сохраняем лог (опционально)
    $logFile = 'form-submissions.log';
    file_put_contents($logFile, json_encode($logData) . PHP_EOL, FILE_APPEND);

    // Отправка письма
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode([
            "success" => true,
            "message" => "Сообщение успешно отправлено"
        ]);
    } else {
        error_log("Mail send failed to: $to");
        echo json_encode([
            "success" => false,
            "error" => "Не удалось отправить письмо. Пожалуйста, попробуйте позже."
        ]);
    }

} else {
    echo json_encode([
        "success" => false,
        "error" => "Неверный метод запроса. Используйте POST."
    ]);
}
?>