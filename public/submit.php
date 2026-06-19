<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

// Обработка preflight запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Кому отправляем
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

// Получаем данные
$name = isset($_POST['fullName']) ? trim($_POST['fullName']) : '';
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$inn = isset($_POST['inn']) ? trim($_POST['inn']) : '';
$consent = isset($_POST['consent']) ? filter_var($_POST['consent'], FILTER_VALIDATE_BOOLEAN) : false;
$privacyAgreement = isset($_POST['privacyAgreement']) ? filter_var($_POST['privacyAgreement'], FILTER_VALIDATE_BOOLEAN) : false;

// Метаданные
$date = date("d.m.Y H:i:s");
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// Проверка обязательных полей
$errors = [];
if (empty($name)) $errors[] = "ФИО";
if (empty($company)) $errors[] = "Компания";
if (empty($email)) $errors[] = "Email";
if (empty($inn)) $errors[] = "ИНН";
if (empty($phone)) $errors[] = "Телефон";

if (count($errors) > 0) {
    echo json_encode([
        "success" => false, 
        "error" => "Заполните обязательные поля: " . implode(", ", $errors)
    ]);
    exit;
}

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

// Проверка файлов
$requiredFiles = ['egrul', 'charter', 'partnerCard', 'directorDecision', 'offerFile', 'invoicePDF'];
$missingFiles = [];
$uploadedFiles = [];

foreach ($requiredFiles as $fileKey) {
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
        $missingFiles[] = $fileKey;
    } else {
        $uploadedFiles[$fileKey] = $_FILES[$fileKey];
    }
}

if (count($missingFiles) > 0) {
    echo json_encode([
        "success" => false,
        "error" => "Не загружены файлы: " . implode(", ", $missingFiles)
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
foreach ($uploadedFiles as $key => $file) {
    $message .= "• " . basename($file['name']) . " (" . round($file['size']/1024, 2) . " KB)\n";
}
$message .= "\n📊 ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ:\n";
$message .= "────────────────────────────────────────\n";
$message .= "Дата и время: $date\n";
$message .= "IP-адрес: $ip\n";
$message .= "User-Agent: $userAgent\n";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

// ============================================
// ОТПРАВКА С ВЛОЖЕНИЯМИ
// ============================================
$boundary = md5(uniqid(time()));

// Заголовки
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: no-reply@tech-new.ru\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Формируем письмо
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$body .= $message . "\r\n\r\n";

// Добавляем все файлы
foreach ($uploadedFiles as $file) {
    $fileName = basename($file['name']);
    $fileType = $file['type'] ?: 'application/octet-stream';
    $fileData = chunk_split(base64_encode(file_get_contents($file['tmp_name'])));
    
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
    $body .= $fileData . "\r\n";
}

$body .= "--$boundary--";

// Логирование
$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'company' => $company,
    'email' => $email,
    'files' => array_keys($uploadedFiles),
    'ip' => $ip
];
$logFile = __DIR__ . '/form-submissions.log';
file_put_contents($logFile, json_encode($logData, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);

// ============================================
// ОТПРАВКА НА ВСЕ АДРЕСА
// ============================================
$successCount = 0;
$failedEmails = [];

foreach ($recipients as $recipient) {
    $headersWithTo = $headers . "To: $recipient\r\n";
    
    if (mail($recipient, $subject, $body, $headersWithTo)) {
        $successCount++;
    } else {
        $failedEmails[] = $recipient;
        error_log("Failed to send to: $recipient");
    }
}

// Ответ
if ($successCount > 0) {
    $response = [
        "success" => true,
        "message" => "Предложение успешно отправлено",
        "sent_to" => $successCount . " из " . count($recipients),
        "files" => count($uploadedFiles)
    ];
    
    if (count($failedEmails) > 0) {
        $response["warning"] = "Не отправлено на: " . implode(", ", $failedEmails);
    }
    
    echo json_encode($response);
} else {
    // Проверяем ошибки
    $error = error_get_last();
    error_log("Mail error: " . print_r($error, true));
    
    echo json_encode([
        "success" => false,
        "error" => "Не удалось отправить письмо. Проверьте логи сервера."
    ]);
}
?>