import fs from "fs";
import crypto from "crypto";

const PROFILE_FILE = "./profiles.json";

if (!fs.existsSync(PROFILE_FILE)) fs.writeFileSync(PROFILE_FILE, JSON.stringify({}));

export function generateApiKey(userId) {
  const key = crypto.randomBytes(16).toString("hex");
  const profiles = JSON.parse(fs.readFileSync(PROFILE_FILE));
  profiles[key] = { userId, createdAt: new Date().toISOString() };
  fs.writeFileSync(PROFILE_FILE, JSON.stringify(profiles, null, 2));
  return key;
}

export function validateApiKey(key) {
  const profiles = JSON.parse(fs.readFileSync(PROFILE_FILE));
  return profiles[key] || null;
}

export function getUserByApiKey(key) {
  const profiles = JSON.parse(fs.readFileSync(PROFILE_FILE));
  return profiles[key] || null;
}
