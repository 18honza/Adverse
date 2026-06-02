import { copyFileSync, existsSync } from "node:fs";

if (existsSync("out")) {
  copyFileSync("server/contact.php", "out/contact.php");
  copyFileSync("server/.htaccess",   "out/.htaccess");
  copyFileSync("server/router.php",  "out/router.php");
}
