<?php
declare(strict_types=1);

// ---------------------------------------------------------------------------
// Configuration
// Set RESEND_API_KEY as a server environment variable (e.g. via .htaccess:
//   SetEnv RESEND_API_KEY re_xxxxxxxx
// or in your hosting panel's PHP/environment settings).
// ---------------------------------------------------------------------------
$apiKey   = getenv('RESEND_API_KEY') ?: '';
$mailFrom = 'Adverse Web <noreply@adverse.cz>';
$mailTo   = ['jan.jirak@adverse.cz', 'ondrej.nedela@adverse.cz'];

// ---------------------------------------------------------------------------
// CORS — allow requests only from the production static site.
// During local dev the form falls back to /contact.php (same origin), so no
// CORS header is needed there.
// ---------------------------------------------------------------------------
$allowedOrigin = 'https://adverse.cz';
$origin        = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === $allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'error' => 'Method not allowed.']);
    exit;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function respond(array $data, int $code = 200): never
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------------------------------------------------------------------------
// Read & sanitise input
// ---------------------------------------------------------------------------
$name    = trim((string) ($_POST['name']    ?? ''));
$email   = trim((string) ($_POST['email']   ?? ''));
$phone   = trim((string) ($_POST['phone']   ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$website = trim((string) ($_POST['website'] ?? '')); // honeypot

if ($website !== '') {
    respond(['status' => 'success']); // silently swallow bot submissions
}

// ---------------------------------------------------------------------------
// Validate
// ---------------------------------------------------------------------------
$fields = [];
if ($name === '' || mb_strlen($name) > 100)       $fields[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))   $fields[] = 'email';
if (mb_strlen($phone) > 50)                       $fields[] = 'phone';
if ($message === '' || mb_strlen($message) > 5000) $fields[] = 'message';

if ($fields) {
    respond([
        'status' => 'error',
        'error'  => 'Zkontrolujte prosím vyplněná pole.',
        'fields' => $fields,
    ], 422);
}

// ---------------------------------------------------------------------------
// Send via Resend API
// ---------------------------------------------------------------------------
if ($apiKey === '') {
    // No key configured — log the submission and return success so the UI
    // can be tested without a real API key (mirrors the TS dev behaviour).
    error_log('[contact] RESEND_API_KEY not set; submission: ' . json_encode(
        compact('name', 'email', 'phone', 'message'),
        JSON_UNESCAPED_UNICODE,
    ));
    respond(['status' => 'success']);
}

$cleanName = (string) preg_replace('/[\r\n]+/', ' ', $name);
$bodyText  = implode("\n", [
    'Nová zpráva z kontaktního formuláře:',
    '',
    "Jméno: $cleanName",
    "E-mail: $email",
    'Telefon: ' . ($phone !== '' ? $phone : '—'),
    '',
    'Zpráva:',
    $message,
]);

$payload = (string) json_encode([
    'from'     => $mailFrom,
    'to'       => $mailTo,
    'reply_to' => $email,
    'subject'  => "Nová zpráva z webu Adverse — $cleanName",
    'text'     => $bodyText,
], JSON_UNESCAPED_UNICODE);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_TIMEOUT        => 10,
]);

$result   = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr !== '' || $httpCode >= 400) {
    error_log('[contact] Resend error: ' . ($curlErr !== '' ? $curlErr : (string) $result));
    respond([
        'status' => 'error',
        'error'  => 'Něco se pokazilo při odesílání. Zkuste to prosím znovu.',
    ], 500);
}

respond(['status' => 'success']);
