<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {

        $data = json_decode(file_get_contents("php://input"), true);

        $name = htmlspecialchars($data['name'] ?? '');
        $email = htmlspecialchars($data['email'] ?? '');
        $phone = htmlspecialchars($data['phone'] ?? '');
        $messageText = htmlspecialchars($data['message'] ?? '');

        // ✅ Согласие
        $agreement = !empty($data['agreement']) ? 'ДА' : 'НЕТ';

        // ✅ Метаданные
        $date = gmdate("c"); // ISO 8601 (UTC)
        $policyVersion = 'v1.0 (от 01.04.2024)';
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

        // ✅ Формирование письма
        $message = "Получено новое обращение:\n\n";

        $message .= "Имя: $name\n";
        $message .= "Email: $email\n";
        $message .= "Телефон: $phone\n";
        $message .= "Сообщение: $messageText\n\n";

        $message .= "---\n";
        $message .= "Подтверждение согласия: $agreement\n";
        $message .= "Дата и время: $date\n";
        $message .= "Версия политики конфиденциальности: $policyVersion\n";
        $message .= "IP-адрес пользователя: $ip\n";
        $message .= "User-Agent: $userAgent\n";

        $to = "nt@tech-new.ru";
        $subject = "=?UTF-8?B?" . base64_encode("Новое обращение с сайта") . "?=";

        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
        $headers .= "From: no-reply@tech-new.ru\r\n";
        $headers .= "Reply-To: $email\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode([
                "success" => false,
                "error" => "Не удалось отправить письмо"
            ]);
        }

    } else {
        echo json_encode([
            "success" => false,
            "error" => "Неверный метод запроса"
        ]);
    }
?>