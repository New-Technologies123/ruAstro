<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $messageText = htmlspecialchars($data['message']);

    $message = "Новый вопрос с сайта:\n\n";
    $message .= "Имя: $name\n";
    $message .= "Email: $email\n\n";
    $message .= "Сообщение:\n$messageText\n";

    $to = "nt@tech-new.ru";
    $subject = "=?UTF-8?B?" . base64_encode("Новый вопрос с сайта") . "?=";

    // UTF-8 заголовки
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