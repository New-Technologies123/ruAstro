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

    $message .= "\nИтого: {$total} ₽ без НДС\n";

    $to = "tendernt@tech-new.ru";
    $subject = "=?UTF-8?B?" . base64_encode("Новый заказ с сайта") . "?=";

    // Заголовки с UTF-8
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
