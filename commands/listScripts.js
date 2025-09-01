import { SlashCommandBuilder } from "discord.js";
import { listScripts } from "../handlers/fileHandler.js";

export const listScriptsCommand = {
  data: new SlashCommandBuilder()
    .setName("listscripts")
    .setDescription("List all uploaded scripts"),
  execute: async (interaction) => {
    const scripts = listScripts();
    if (!scripts.length) return interaction.reply("No scripts found.");
    interaction.reply(`**Scripts:**\n${scripts.join("\n")}`);
  }
};
