<?php
header("Content-Type: application/json; charset=UTF-8");

$to = "dekslerid@tech-new.ru";
$subject = "=?UTF-8?B?" . base64_encode("Предложение закупок МОТ с сайта") . "?=";

// Получаем данные формы
$supplier = [
    "name"    => $_POST["fullName"] ?? "",
    "company" => $_POST["company"] ?? "",
    "email"   => $_POST["email"] ?? "",
    "inn"     => $_POST["inn"] ?? "",
];

// Проверка обязательных полей
if (!$supplier["name"] || !$supplier["company"] || !$supplier["email"] || !$supplier["inn"]) {
    echo json_encode(["success" => false, "error" => "Заполните все поля формы"]);
    exit;
}

// Создаём boundary для multipart письма
$boundary = md5(time());

// Заголовки
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: no-reply@tech-new.ru\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Тело письма
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";

$message .= "<html><body>";
$message .= "<h2>Контактные данные</h2>";
$message .= "<p>";
$message .= "ФИО: " . htmlspecialchars($supplier["name"]) . "<br>";
$message .= "Компания: " . htmlspecialchars($supplier["company"]) . "<br>";
$message .= "Email: " . htmlspecialchars($supplier["email"]) . "<br>";
$message .= "ИНН: " . htmlspecialchars($supplier["inn"]) . "<br>";
$message .= "</p>";

$message .= "<h2>Прикреплённые файлы</h2><ul>";
foreach ($_FILES as $file) {
    if ($file["error"] === 0) {
        $message .= "<li>" . htmlspecialchars($file["name"]) . " (" . $file["size"] . " байт)</li>";
    }
}
$message .= "</ul></body></html>\r\n";

// Прикрепляем файлы
foreach ($_FILES as $file) {
    if ($file["error"] === 0 && $file["size"] > 0) {
        $fileName = $file["name"];
        $fileContent = chunk_split(base64_encode(file_get_contents($file["tmp_name"])));

        $message .= "--$boundary\r\n";
        $message .= "Content-Type: application/octet-stream; name=\"" . htmlspecialchars($fileName) . "\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"" . htmlspecialchars($fileName) . "\"\r\n\r\n";
        $message .= $fileContent . "\r\n";
    }
}

// Закрываем boundary
$message .= "--$boundary--";

// Отправка письма
$success = mail($to, $subject, $message, $headers);

echo json_encode(["success" => $success]);
?>