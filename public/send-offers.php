<?php

header("Content-Type: application/json");

// Получаем данные
$supplier = isset($_POST["supplier"]) ? json_decode($_POST["supplier"], true) : null;
$offers = isset($_POST["offers"]) ? json_decode($_POST["offers"], true) : [];

if (!$supplier || !$offers) {
    echo json_encode(["success" => false, "error" => "Нет данных"]);
    exit;
}

$to = "your@email.com";
$subject = "Новые предложения поставщика";

// граница письма
$boundary = md5(time());

// заголовки
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: noreply@site.com\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// ===== ТЕЛО ПИСЬМА =====
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";

// HTML часть
$message .= "<html><body>";
$message .= "<h2>Контактные данные</h2>";
$message .= "<p>
ФИО: {$supplier["name"]}<br>
Компания: {$supplier["company"]}<br>
Email: {$supplier["email"]}
</p>";

$message .= "<h2>Предложения</h2>";
$message .= "<table border='1' cellpadding='5' cellspacing='0'>";
$message .= "<tr>
<th>Требуемый товар</th>
<th>Предложенный</th>
<th>Количество</th>
<th>Примечание</th>
</tr>";

foreach ($offers as $offer) {
    $message .= "<tr>
        <td>{$offer["requested"]["name"]}</td>
        <td>{$offer["proposed"]["proposedName"]}</td>
        <td>{$offer["proposed"]["quantity"]}</td>
        <td>{$offer["proposed"]["note"]}</td>
    </tr>";
}

$message .= "</table>";
$message .= "</body></html>\r\n";


// ===== 📎 ФАЙЛЫ =====
foreach ($_FILES as $file) {

    if ($file["error"] === 0) {

        $fileName = $file["name"];
        $fileTmp = $file["tmp_name"];
        $fileSize = $file["size"];

        if ($fileSize > 0) {

            $fileContent = chunk_split(base64_encode(file_get_contents($fileTmp)));

            $message .= "--$boundary\r\n";
            $message .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
            $message .= $fileContent . "\r\n";
        }
    }
}

// закрываем boundary
$message .= "--$boundary--";

// ===== ОТПРАВКА =====
$success = mail($to, $subject, $message, $headers);

// ответ
echo json_encode([
    "success" => $success
]);