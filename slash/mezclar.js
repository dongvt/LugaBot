const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mezclar")
    .setDescription("Mezcla la lista"),
  run: async ({ client, interaction }) => {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue || !queue.isPlaying())
      return interaction.reply({ content: "No hay canciones en la lista" });

    queue.tracks.shuffle();
	//console.log(queue)
    await interaction.reply(
      `La lista de ${queue.getSize()} canciones ha sido mezclada`
    );
  },
};
