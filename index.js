import { Client, Collection, GatewayIntentBits } from "discord.js";
import { BOT_TOKEN } from "./config.js";
import { uploadScriptCommand } from "./commands/uploadScript.js";
import { listScriptsCommand } from "./commands/listScripts.js";
import { runScriptCommand } from "./commands/runScript.js";
import { generateApiKeyCommand } from "./commands/generateApiKey.js";
import { viewLogsCommand } from "./commands/viewLogs.js";
import { logger } from "./handlers/logHandler.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection([
  [uploadScriptCommand.data.name, uploadScriptCommand],
  [listScriptsCommand.data.name, listScriptsCommand],
  [runScriptCommand.data.name, runScriptCommand],
  [generateApiKeyCommand.data.name, generateApiKeyCommand],
  [viewLogsCommand.data.name, viewLogsCommand]
]);

client.once("ready", () => logger.info(`Logged in as ${client.user.tag}`));

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try { await command.execute(interaction); } 
  catch (err) {
    logger.error(err);
    interaction.reply({ content: "Error executing command.", ephemeral: true });
  }
});

client.login(BOT_TOKEN);
