import fs from "fs";
import path from "path";
import { SCRIPTS_DIR } from "../config.js";
import { encryptCode, decryptCode } from "./luaHandler.js";

if (!fs.existsSync(SCRIPTS_DIR)) fs.mkdirSync(SCRIPTS_DIR);


export function saveScript(name, code) {
  const fileName = `${Date.now()}_${name.replace(/\s+/g,"_")}.lua`;
  const encrypted = encryptCode(code);
  const filePath = path.join(SCRIPTS_DIR, fileName);
  fs.writeFileSync(filePath, encrypted, { flag: "w", mode: 0o600 });
  return fileName;
}


export function listScripts() {
  return fs.readdirSync(SCRIPTS_DIR);
}


export function loadScript(fileName) {
  const filePath = path.join(SCRIPTS_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  const encrypted = fs.readFileSync(filePath, "utf8");
  return decryptCode(encrypted);
}
