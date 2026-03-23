<?php
header("Content-Type: application/json");

// Настройки
$to = "dekslerid@tech-new.ru";
$subject = "Новое предложение поставщика";

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
$headers .= "From: noreply@site.com\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// ===== Тело письма (HTML) =====
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";

$message .= "<html><body>";
$message .= "<h2>Контактные данные</h2>";
$message .= "<p>
ФИО: {$supplier["name"]}<br>
Компания: {$supplier["company"]}<br>
Email: {$supplier["email"]}<br>
ИНН: {$supplier["inn"]}
</p>";

$message .= "<h2>Прикреплённые файлы</h2>";
$message .= "<ul>";
foreach ($_FILES as $key => $file) {
    if ($file["error"] === 0) {
        $message .= "<li>{$file['name']} ({$file['size']} байт)</li>";
    }
}
$message .= "</ul>";
$message .= "</body></html>\r\n";

// ===== Добавляем файлы =====
foreach ($_FILES as $file) {
    if ($file["error"] === 0 && $file["size"] > 0) {
        $fileName = $file["name"];
        $fileContent = chunk_split(base64_encode(file_get_contents($file["tmp_name"])));

        $message .= "--$boundary\r\n";
        $message .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $message .= $fileContent . "\r\n";
    }
}

// Закрываем boundary
$message .= "--$boundary--";

// ===== Отправка письма =====
$success = mail($to, $subject, $message, $headers);

// Ответ клиенту
echo json_encode(["success" => $success]);