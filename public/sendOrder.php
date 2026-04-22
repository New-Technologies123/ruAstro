<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = htmlspecialchars($data['name']);
    $position = htmlspecialchars($data['position']);
    $company = htmlspecialchars($data['company']);
    $email = htmlspecialchars($data['email']);
    $phone = htmlspecialchars($data['phone']);
    $comment = htmlspecialchars($data['comment']);
    $cart = $data['cart'];

// ============================
// ✅ МЕТАДАННЫЕ
// ============================
    $agreement = !empty($data['agreement']) ? "ДА" : "НЕТ";
    $date = gmdate("c"); // UTC ISO 8601
    $policyVersion = "v1.0 (от 01.04.2024)";
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
// ============================

    $total = 0;
    $message = "Новый заказ с сайта:\n\n";

    $message .= "ФИО: $name\n";
    $message .= "Должность: $position\n";
    $message .= "Компания: $company\n";
    $message .= "Email: $email\n";
    $message .= "Телефон: $phone\n";
    $message .= "Комментарий: $comment\n\n";

    $message .= "Товары:\n";

    foreach ($cart as $item) {
        $itemTotal = intval(str_replace(' ', '', $item['price'])) * $item['count'];
        $total += $itemTotal;
        $message .= "- {$item['title']} | {$item['count']} × {$item['price']} ₽ = {$itemTotal} ₽\n";
    }

    $message .= "\nИтого: {$total} ₽ без НДС\n\n";

// ============================
// ✅ БЛОК МЕТАДАННЫХ В ПИСЬМО
// ============================
    $message .= "---\n";
    $message .= "Согласие с политикой: $agreement\n";
    $message .= "Дата отправки: $date\n";
    $message .= "Версия политики: $policyVersion\n";
    $message .= "IP адрес: $ip\n";
    $message .= "User-Agent: $userAgent\n";
// ============================

    $to = "tendernt@tech-new.ru";
    $subject = "=?UTF-8?B?" . base64_encode("Новый заказ с сайта") . "?=";

    // Заголовки
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: no-reply@tech-new.ru\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Не удалось отправить письмо"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Неверный метод запроса"]);
}
?>