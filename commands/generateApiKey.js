import { SlashCommandBuilder } from "discord.js";
import { generateApiKey } from "../handlers/profileHandler.js";
import { ADMIN_ROLE } from "../config.js";

export const generateApiKeyCommand = {
  data: new SlashCommandBuilder()
    .setName("generateapikey")
    .setDescription("Generate a new API key for a user")
    .addUserOption(option =>
      option.setName("user").setDescription("User to generate key for").setRequired(true)),
  execute: async (interaction) => {
    if (!interaction.member.roles.cache.some(r => r.name === ADMIN_ROLE))
      return interaction.reply({ content: "No permission.", ephemeral: true });

    const user = interaction.options.getUser("user");
    const key = generateApiKey(user.id);
    interaction.reply(`Generated API key for ${user.username}: \`${key}\``);
  }
};
