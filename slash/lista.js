const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lista")
    .setDescription("muestra la canción actual en la lista")
    .addNumberOption((option) =>
      option
        .setName("pagina")
        .setDescription("Número de página de la lista")
        .setMinValue(1)
    ),

  run: async ({ client, interaction }) => {
    const queue = client.player.nodes.get(interaction.guildId);
    if (!queue || !queue.isPlaying()) {
      return await interaction.editReply("No hay canciones en la lista");
    }

    const totalPages = Math.ceil(queue.getSize() / 10) || 1;
    const page = (interaction.options.getNumber("pagina") || 1) - 1;

    if (page > totalPages)
      return interaction.reply(
        `Página invalida. Solo hay un total de ${totalPages} páginas`
      );

    
    const queueString = queue.tracks.data
      .slice(page * 10, page * 10 + 10)
      .map((song, i) => {
        return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${
          song.title
        } -- <@${song.requestedBy.id}>`;
      })
      .join("\n");

    const currentSong = queue.currentTrack;
      console.log(currentSong)
    const embed = new EmbedBuilder();
    embed
      .setDescription(
        `**Reproduciendo**\n` +
          (currentSong
            ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>`
            : "Nadie") +
          `\n\n**Lista**\n${queueString}`
      )
      .setFooter({
        text: `Pagina ${page + 1} de ${totalPages}`,
      })
      .setThumbnail(currentSong.thumbnail);
    interaction.reply({
      embeds: [embed],
    });
  },
};
