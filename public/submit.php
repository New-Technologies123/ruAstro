<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS, если React на другом домене
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

// Кому отправляем
$to = "dekslerid@tech-new.ru";

// Тема письма в UTF-8
$subject = "=?UTF-8?B?" . base64_encode("Предложение закупок МОТ с сайта") . "?=";

// Получаем данные из POST
$name    = $_POST["fullName"] ?? "";
$company = $_POST["company"] ?? "";
$email   = $_POST["email"] ?? "";
$phone   = $_POST["phone"] ?? "";
$inn     = $_POST["inn"] ?? "";

// Проверка обязательных полей
if (!$name || !$company || !$email || !$inn) {
    echo json_encode(["success" => false, "error" => "Заполните все поля"]);
    exit;
}

// Граница для multipart
$boundary = md5(time());

// Заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: no-reply@tech-new.ru\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Начало тела письма
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";

$message .= "<h2>Контактные данные</h2>";
$message .= "<b>ФИО:</b> $name<br>";
$message .= "<b>Компания:</b> $company<br>";
$message .= "<b>Email:</b> $email<br>";
$message .= "<b>Телефон:</b> $phone<br>";
$message .= "<b>ИНН:</b> $inn<br><br>";

// Обработка файлов
foreach ($_FILES as $key => $file) {
    if ($file["error"] === 0) {
        $fileName = $file["name"];
        $fileType = $file["type"] ?: "application/octet-stream";
        $fileData = chunk_split(base64_encode(file_get_contents($file["tmp_name"])));

        $message .= "--$boundary\r\n";
        $message .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $message .= $fileData . "\r\n";
    }
}

// Конец письма
$message .= "--$boundary--";

// Отправка
$success = mail($to, $subject, $message, $headers);

// Возврат JSON для React
echo json_encode([
    "success" => $success
]);