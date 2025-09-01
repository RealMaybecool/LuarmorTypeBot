import { SlashCommandBuilder } from "discord.js";
import { obfuscateLua } from "../handlers/luaHandler.js";
import { saveScript } from "../handlers/fileHandler.js";

export const uploadScriptCommand = {
  data: new SlashCommandBuilder()
    .setName("uploadscript")
    .setDescription("Upload a Lua script")
    .addStringOption(opt => opt.setName("name").setDescription("Script name").setRequired(true))
    .addStringOption(opt => opt.setName("code").setDescription("Lua code").setRequired(true)),
  execute: async (interaction) => {
    const name = interaction.options.getString("name");
    const code = interaction.options.getString("code");


    const obf = obfuscateLua(code);
    const savedFile = saveScript(name, obf);

    await interaction.reply(`Script uploaded securely as: ${savedFile}`);
  }
};
