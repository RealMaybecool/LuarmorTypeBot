import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const ADMIN_ROLE = process.env.ADMIN_ROLE || "ScriptManager";
export const SCRIPTS_DIR = path.join(__dirname, "scripts");
