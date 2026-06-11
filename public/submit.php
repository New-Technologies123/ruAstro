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
$subject = "=?UTF-8?B?" . base64_encode("📦 Предложение закупок МТР с сайта") . "?=";

// Получаем данные (проверяем как POST, так и JSON)
$inputData = [];
if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    $inputJSON = file_get_contents('php://input');
    $inputData = json_decode($inputJSON, true) ?? [];
}

// Функция для получения данных
function getValue($key, $default = '', $isCheckbox = false) {
    global $inputData;
    
    if (isset($_POST[$key])) {
        return $isCheckbox ? ($_POST[$key] === 'true' || $_POST[$key] === 'on' || $_POST[$key] === '1') : $_POST[$key];
    }
    if (isset($inputData[$key])) {
        return $isCheckbox ? (bool)$inputData[$key] : $inputData[$key];
    }
    return $default;
}

// Получаем данные формы
$name    = trim(getValue('fullName', ''));
$company = trim(getValue('company', ''));
$email   = trim(getValue('email', ''));
$phone   = trim(getValue('phone', ''));
$inn     = trim(getValue('inn', ''));

// Получаем состояния чекбоксов
$consent = getValue('consent', false, true);
$privacyAgreement = getValue('privacyAgreement', false, true);

// Метаданные
$date = date("d.m.Y H:i:s");
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// Проверка обязательных полей
$errors = [];
if (!$name) $errors[] = "ФИО";
if (!$company) $errors[] = "Компания";
if (!$email) $errors[] = "Email";
if (!$inn) $errors[] = "ИНН";
if (empty($phone)) $errors[] = "Телефон";

if (count($errors) > 0) {
    echo json_encode([
        "success" => false, 
        "error" => "Заполните обязательные поля: " . implode(", ", $errors)
    ]);
    exit;
}

// Проверка чекбоксов
if (!$consent) {
    echo json_encode([
        "success" => false, 
        "error" => "Необходимо дать согласие на обработку персональных данных"
    ]);
    exit;
}

if (!$privacyAgreement) {
    echo json_encode([
        "success" => false, 
        "error" => "Необходимо подтвердить ознакомление с политикой конфиденциальности"
    ]);
    exit;
}

// Формируем текстовое письмо
$message = "";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$message .= "📦 НОВОЕ ПРЕДЛОЖЕНИЕ ЗАКУПОК МТР\n";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$message .= "👤 КОНТАКТНЫЕ ДАННЫЕ:\n";
$message .= "────────────────────────────────────────\n";
$message .= "ФИО: $name\n";
$message .= "Компания: $company\n";
$message .= "Email: $email\n";
$message .= "Телефон: $phone\n";
$message .= "ИНН: $inn\n\n";

$message .= "✅ СОГЛАСИЯ:\n";
$message .= "────────────────────────────────────────\n";
$message .= "Согласие на обработку персональных данных: " . ($consent ? "✅ ДА" : "❌ НЕТ") . "\n";
$message .= "Согласие с политикой конфиденциальности: " . ($privacyAgreement ? "✅ ДА" : "❌ НЕТ") . "\n\n";

$message .= "📎 ПРИКРЕПЛЕННЫЕ ФАЙЛЫ:\n";
$message .= "────────────────────────────────────────\n";

// Обрабатываем файлы
$attachments = [];
$fileList = "";

if (!empty($_FILES)) {
    foreach ($_FILES as $fieldName => $file) {
        if ($file['error'] === UPLOAD_ERR_OK && $file['size'] > 0) {
            $fileName = basename($file['name']);
            $attachments[] = $fileName;
            $fileList .= "• $fileName\n";
        }
    }
}

if (count($attachments) > 0) {
    $message .= $fileList;
} else {
    $message .= "Файлы не прикреплены\n";
}

$message .= "\n📊 ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ:\n";
$message .= "────────────────────────────────────────\n";
$message .= "Дата и время: $date\n";
$message .= "IP-адрес: $ip\n";
$message .= "User-Agent: $userAgent\n";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

// Заголовки для текстового письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: no-reply@tech-new.ru\r\n";
$headers .= "Reply-To: $email\r\n";

// Если есть файлы, отправляем multipart письмо
if (count($attachments) > 0) {
    $boundary = md5(uniqid(time()));
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: no-reply@tech-new.ru\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    
    $multipartMessage = "--$boundary\r\n";
    $multipartMessage .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $multipartMessage .= $message . "\r\n\r\n";
    
    // Прикрепляем файлы
    foreach ($_FILES as $fieldName => $file) {
        if ($file['error'] === UPLOAD_ERR_OK && $file['size'] > 0) {
            $fileName = basename($file['name']);
            $fileType = $file['type'] ?: 'application/octet-stream';
            $fileData = chunk_split(base64_encode(file_get_contents($file['tmp_name'])));
            
            $multipartMessage .= "--$boundary\r\n";
            $multipartMessage .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
            $multipartMessage .= "Content-Transfer-Encoding: base64\r\n";
            $multipartMessage .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
            $multipartMessage .= $fileData . "\r\n";
        }
    }
    
    $multipartMessage .= "--$boundary--";
    $messageToSend = $multipartMessage;
} else {
    $messageToSend = $message;
}

// Логирование
$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'company' => $company,
    'email' => $email,
    'consent' => $consent,
    'privacy_agreement' => $privacyAgreement,
    'attachments' => $attachments,
    'ip' => $ip
];
$logFile = __DIR__ . '/form-submissions.log';
file_put_contents($logFile, json_encode($logData, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);

// Отправка письма
$mailSent = mail($to, $subject, $messageToSend, $headers);

if ($mailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Предложение успешно отправлено",
        "attachments" => count($attachments)
    ]);
} else {
    error_log("Mail send failed to: $to");
    echo json_encode([
        "success" => false,
        "error" => "Не удалось отправить письмо. Пожалуйста, попробуйте позже."
    ]);
}
?>