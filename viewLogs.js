import { SlashCommandBuilder } from "discord.js";
import { getLogsByApiKey } from "../handlers/logHandler.js";

export const viewLogsCommand = {
  data: new SlashCommandBuilder()
    .setName("viewlogs")
    .setDescription("View logs of scripts executed with your API key")
    .addStringOption(opt => opt.setName("apikey").setDescription("Your API key").setRequired(true)),
  execute: async (interaction) => {
    const apiKey = interaction.options.getString("apikey");
    const logs = getLogsByApiKey(apiKey);
    if (!logs.length) return interaction.reply("No logs found for this API key.");
    const formatted = logs.map(l => `[${l.timestamp}] ${l.scriptName} - ${l.status}`).join("\n");
    interaction.reply(`**Execution Logs:**\n${formatted}`);
  }
};
