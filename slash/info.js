const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Muestra información sobre la canción actual"),
  run: async ({ client, interaction }) => {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue || !queue.isPlaying())
      return interaction.reply("No hay canciones en la lista");

    let bar = queue.node.createProgressBar();

    const song = queue.currentTrack;

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Reproduciendo [${song.title}](${song.url})\n\n` + bar
          ),
      ],
    });
  },
};
