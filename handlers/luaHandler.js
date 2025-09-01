import crypto from "crypto";


export function obfuscateLua(luaCode) {
  const hex = Buffer.from(luaCode, "utf8").toString("hex");
  return `loadstring("${hex.replace(/(..)/g,"\\\\x$1")}")()`;
}


export function encryptCode(code, key = process.env.ENCRYPTION_KEY || "defaultkey") {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(code, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}


export function decryptCode(encrypted, key = process.env.ENCRYPTION_KEY || "defaultkey") {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
