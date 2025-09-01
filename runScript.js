import { SlashCommandBuilder } from "discord.js";
import { loadScript } from "../handlers/fileHandler.js";
import { logExecution, getLogsByApiKey } from "../handlers/logHandler.js";

export const runScriptCommand = {
  data: new SlashCommandBuilder()
    .setName("runscript")
    .setDescription("Run a script using your API key")
    .addStringOption(opt => opt.setName("file").setDescription("Script file name").setRequired(true))
    .addStringOption(opt => opt.setName("apikey").setDescription("Your API key").setRequired(true)),
  execute: async (interaction) => {
    const fileName = interaction.options.getString("file");
    const apiKey = interaction.options.getString("apikey");
    const code = loadScript(fileName);

    if (!code) {
      logExecution(apiKey, fileName, "not found");
      return interaction.reply("Script not found.");
    }

   
    logExecution(apiKey, fileName, "executed");
    interaction.reply(`Script executed successfully (simulated):\n\`\`\`lua\n${code}\n\`\`\``);
  }
};
