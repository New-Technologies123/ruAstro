<?php
namespace RuAstro\Forms;

// Loaded ONLY by the test PHP process via auto_prepend_file, never by production handlers.
function mail(string $to, string $subject, string $message, string $headers): bool
{
    if (getenv('TEST_MAIL_DELAY_US')) usleep(min(5000000, (int) getenv('TEST_MAIL_DELAY_US')));
    file_put_contents(getenv('TEST_MAIL_CAPTURE'), json_encode(compact('to', 'subject', 'message', 'headers')) . PHP_EOL, FILE_APPEND);
    if (strpos($headers, 'retry-once@example.test') !== false) {
        $attempts = array_filter(file(getenv('TEST_MAIL_CAPTURE')), static fn($line) => strpos($line, 'retry-once@example.test') !== false);
        if (count($attempts) === 1) return false;
    }
    return strpos($headers, 'mail-failure@example.test') === false && $to !== 'confirmation-failed@example.test';
}
