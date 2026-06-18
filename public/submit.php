<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

// Кому отправляем - СПИСОК ПОЛУЧАТЕЛЕЙ
$recipients = [
    "nadyrgulovty@tech-new.ru",
    "naf@tech-new.ru",
    "dolgushinasl@tech-new.ru",
    "elizarevaiv@tech-new.ru",
    "nurmukhametovab@tech-new.ru",
    "zinurovih@tech-new.ru"
];

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
$uploadedFiles = [];

if (!empty($_FILES)) {
    foreach ($_FILES as $fieldName => $file) {
        if ($file['error'] === UPLOAD_ERR_OK && $file['size'] > 0) {
            $fileName = basename($file['name']);
            $attachments[] = $fileName;
            $fileList .= "• $fileName\n";
            $uploadedFiles[] = $file;
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

// Подготавливаем письмо с вложениями (если есть)
$boundary = md5(uniqid(time()));
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: no-reply@tech-new.ru\r\n";
$headers .= "Reply-To: $email\r\n";

if (count($attachments) > 0) {
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
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
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
    'ip' => $ip,
    'recipients' => $recipients
];
$logFile = __DIR__ . '/form-submissions.log';
file_put_contents($logFile, json_encode($logData, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);

// ============================================
// ОТПРАВКА ПИСЬМА НА НЕСКОЛЬКО ПОЧТ ОДНОВРЕМЕННО
// ============================================
$successCount = 0;
$failedEmails = [];

// Отправляем каждому получателю
foreach ($recipients as $recipient) {
    if (mail($recipient, $subject, $messageToSend, $headers)) {
        $successCount++;
    } else {
        $failedEmails[] = $recipient;
    }
}

// Формируем ответ
if ($successCount > 0) {
    $response = [
        "success" => true,
        "message" => "Предложение успешно отправлено",
        "sent_to" => $successCount . " из " . count($recipients) . " получателей",
        "attachments" => count($attachments)
    ];
    
    // Если есть неудачные отправки, добавляем информацию в ответ
    if (count($failedEmails) > 0) {
        $response["warning"] = "Письмо не отправлено на: " . implode(", ", $failedEmails);
        $response["failed_recipients"] = $failedEmails;
    }
    
    echo json_encode($response);
} else {
    error_log("Mail send failed to all recipients");
    echo json_encode([
        "success" => false,
        "error" => "Не удалось отправить письмо ни одному получателю. Пожалуйста, попробуйте позже."
    ]);
}
?>