<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

// Кому отправляем
$to = "dekslerid@tech-new.ru";

// Тема
$subject = "=?UTF-8?B?" . base64_encode("Предложение закупок МОТ с сайта") . "?=";

// Получаем данные
$name    = $_POST["fullName"] ?? "";
$company = $_POST["company"] ?? "";
$email   = $_POST["email"] ?? "";
$phone   = $_POST["phone"] ?? "";
$inn     = $_POST["inn"] ?? "";

// ✅ Согласие
$agreement = !empty($_POST["agreement"]) ? "ДА" : "НЕТ";

// ❗ Метаданные
$date = gmdate("c"); // UTC ISO 8601
$policyVersion = "v1.0 (от 01.04.2024)";
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// Проверка обязательных полей
if (!$name || !$company || !$email || !$inn) {
    echo json_encode(["success" => false, "error" => "Заполните все поля"]);
    exit;
}

// Граница
$boundary = md5(time());

// Заголовки
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: no-reply@tech-new.ru\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Тело письма
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";

$message .= "<h2>Контактные данные</h2>";
$message .= "<b>ФИО:</b> $name<br>";
$message .= "<b>Компания:</b> $company<br>";
$message .= "<b>Email:</b> $email<br>";
$message .= "<b>Телефон:</b> $phone<br>";
$message .= "<b>ИНН:</b> $inn<br><br>";

$message .= "<h3>Согласие и юридические данные</h3>";
$message .= "<b>Политика конфиденциальности:</b> " . ($agreement === "ДА" ? "✔ ДА" : "✖ НЕТ") . "<br>";
$message .= "<b>Дата согласия:</b> $date<br>";
$message .= "<b>Версия политики:</b> $policyVersion<br>";
$message .= "<b>IP адрес:</b> $ip<br>";
$message .= "<b>User-Agent:</b> $userAgent<br><br>";

// Файлы
foreach ($_FILES as $file) {
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

$message .= "--$boundary--";

// Отправка
$success = mail($to, $subject, $message, $headers);

// Ответ
echo json_encode([
    "success" => $success
]);