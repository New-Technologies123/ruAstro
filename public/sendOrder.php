<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = htmlspecialchars($data['name'] ?? '');
    $position = htmlspecialchars($data['position'] ?? '');
    $company = htmlspecialchars($data['company'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $phone = htmlspecialchars($data['phone'] ?? '');
    $comment = htmlspecialchars($data['comment'] ?? '');
    $cart = $data['cart'] ?? [];

    // ✅ Получаем состояния чекбоксов
    $consent = !empty($data['consent']) ? "✅ ДА" : "❌ НЕТ";
    $offerAgreement = !empty($data['offerAgreement']) ? "✅ ДА" : "❌ НЕТ";

    // ============================
    // ✅ МЕТАДАННЫЕ
    // ============================
    $date = date("d.m.Y H:i:s");
    $dateISO = gmdate("c"); // UTC ISO 8601
    $policyVersion = "v1.0 (от 01.04.2024)";
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $referer = $_SERVER['HTTP_REFERER'] ?? 'Прямой переход';
    // ============================

    $total = 0;
    
    // Формируем письмо
    $message = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $message .= "🛒 НОВЫЙ ЗАКАЗ С САЙТА\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    $message .= "👤 КОНТАКТНЫЕ ДАННЫЕ:\n";
    $message .= "────────────────────────────────────────\n";
    $message .= "ФИО: $name\n";
    $message .= "Должность: $position\n";
    $message .= "Компания: $company\n";
    $message .= "Email: $email\n";
    $message .= "Телефон: $phone\n";
    $message .= "Комментарий: " . ($comment ?: "Нет комментария") . "\n\n";
    
    $message .= "✅ СОГЛАСИЯ:\n";
    $message .= "────────────────────────────────────────\n";
    $message .= "Согласие на обработку персональных данных: $consent\n";
    $message .= "Согласие с офертой и условиями возврата: $offerAgreement\n\n";
    
    $message .= "📦 СОСТАВ ЗАКАЗА:\n";
    $message .= "────────────────────────────────────────\n";
    
    if (count($cart) > 0) {
        foreach ($cart as $index => $item) {
            $itemPrice = intval(str_replace(' ', '', $item['price']));
            $itemTotal = $itemPrice * $item['count'];
            $total += $itemTotal;
            $message .= ($index + 1) . ". {$item['title']}\n";
            $message .= "   Количество: {$item['count']} шт.\n";
            $message .= "   Цена за шт.: {$item['price']} ₽\n";
            $message .= "   Сумма: " . number_format($itemTotal, 0, '', ' ') . " ₽\n\n";
        }
    } else {
        $message .= "Корзина пуста!\n\n";
    }
    
    $message .= "────────────────────────────────────────\n";
    $message .= "💰 ИТОГО К ОПЛАТЕ: " . number_format($total, 0, '', ' ') . " ₽ (без НДС)\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    $message .= "📊 ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ:\n";
    $message .= "────────────────────────────────────────\n";
    $message .= "Дата и время: $date\n";
    $message .= "Временная метка (UTC): $dateISO\n";
    $message .= "Версия политики конфиденциальности: $policyVersion\n";
    $message .= "IP-адрес: $ip\n";
    $message .= "Источник: $referer\n";
    $message .= "User-Agent: $userAgent\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

    $to = "tendernt@tech-new.ru";
    $subject = "=?UTF-8?B?" . base64_encode("🛒 Новый заказ с сайта") . "?=";

    // Заголовки
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: no-reply@tech-new.ru\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Логирование для отладки
    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'to' => $to,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'consent' => $consent,
        'offerAgreement' => $offerAgreement,
        'total' => $total,
        'ip' => $ip
    ];
    $logFile = __DIR__ . '/order-submissions.log';
    file_put_contents($logFile, json_encode($logData, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["success" => true, "message" => "Заказ успешно отправлен"]);
    } else {
        error_log("Mail send failed to: $to");
        echo json_encode(["success" => false, "error" => "Не удалось отправить письмо"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Неверный метод запроса"]);
}
?>