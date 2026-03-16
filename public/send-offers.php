<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$supplier = $data["supplier"];
$offers = $data["offers"];

$to = "your@email.com";
$subject = "Новые предложения поставщика";

// Заголовки для HTML письма
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: noreply@site.com" . "\r\n";

// Начало HTML сообщения
$message = "<html><body>";
$message .= "<h2>Контактные данные поставщика</h2>";
$message .= "<p>ФИО: ".$supplier["name"]."<br>";
$message .= "Компания: ".$supplier["company"]."<br>";
$message .= "Email: ".$supplier["email"]."</p>";

$message .= "<h2>Предложения</h2>";
$message .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>";
$message .= "<thead>
<tr>
<th>Требуемый товар</th>
<th>Количество</th>
<th>Примечание</th>
<th>Предложенный товар</th>
<th>Количество</th>
<th>Примечание поставщика</th>
</tr>
</thead><tbody>";

foreach ($offers as $offer){
    $message .= "<tr>";
    $message .= "<td>".$offer["requested"]["name"]."</td>";
    $message .= "<td>".$offer["requested"]["quantity"]."</td>";
    $message .= "<td>".$offer["requested"]["note"]."</td>";
    $message .= "<td>".$offer["proposed"]["proposedName"]."</td>";
    $message .= "<td>".$offer["proposed"]["quantity"]."</td>";
    $message .= "<td>".$offer["proposed"]["note"]."</td>";
    $message .= "</tr>";
}

$message .= "</tbody></table>";
$message .= "</body></html>";

// Отправка письма
$mail = mail($to, $subject, $message, $headers);

echo json_encode([
  "success"=>$mail
]);