import fs from "fs";

const LOG_FILE = "./executionLogs.json";

if (!fs.existsSync(LOG_FILE)) fs.writeFileSync(LOG_FILE, JSON.stringify([]));

export function logExecution(apiKey, scriptName, status) {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE));
  logs.push({
    apiKey,
    scriptName,
    status,
    timestamp: new Date().toISOString()
  });
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

export function getLogsByApiKey(apiKey) {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE));
  return logs.filter(l => l.apiKey === apiKey);
}
