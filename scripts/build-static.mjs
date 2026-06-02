import { execSync } from "node:child_process";
import { rmSync, existsSync } from "node:fs";

if (existsSync("out")) rmSync("out", { recursive: true, force: true });

process.env.BUILD_TARGET = "static";
execSync("npm run build", { stdio: "inherit" });
