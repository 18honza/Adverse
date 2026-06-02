<?php
// PHP built-in server router — run from out/: php -S localhost:8000 router.php
// Handles two quirks of Next.js 16 App Router static exports:
//   1. Extensionless page URLs:  /kontakt  → kontakt.html
//   2. RSC payload path mismatch: Next.js requests dot-separated paths like
//      /o-nas/__next.o-nas.__PAGE__.txt but the export writes them as
//      /o-nas/__next.o-nas/__PAGE__.txt (file inside a subdirectory).
declare(strict_types=1);

$uri      = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$root     = __DIR__;
$file     = $root . $uri;
$stripped = rtrim($file, '/');

// Exact file match (.php executes, static assets serve as-is)
if (is_file($file)) {
    return false;
}

// Next.js 16 RSC payload: dot-separated request → directory-separated file
// e.g. /o-nas/__next.o-nas.__PAGE__.txt → /o-nas/__next.o-nas/__PAGE__.txt
if (preg_match('#^(.+/__next\.[^./]+)\.(__.+)$#', $stripped, $m)) {
    $rscFile = $m[1] . '/' . $m[2];
    if (is_file($rscFile)) {
        header('Content-Type: text/plain; charset=utf-8');
        readfile($rscFile);
        exit;
    }
}

// Extensionless URL → .html
if (is_file($stripped . '.html')) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($stripped . '.html');
    exit;
}

// Root or directory → index.html
if (is_file($stripped . '/index.html')) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($stripped . '/index.html');
    exit;
}

http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
readfile($root . '/404.html');
