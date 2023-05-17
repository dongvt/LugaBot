const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volumen")
    .setDescription("Cambia el volumen del robot")
    .addIntegerOption((option) =>
      option
        .setName("vol")
        .setDescription("volumen a poner")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(false)
    ),
  run: async ({ client, interaction }) => {
    const queue = client.player.nodes.get(interaction.guildId);
    if (!queue || !queue.isPlaying())
      return interaction.reply("Eh? No hay canciones en reprodución");

    const volume = interaction.options.getInteger("vol");

    if (!volume)
      return interaction.reply(`Volumen actual is ${queue.node.volume}`);

    queue.node.setVolume(volume);
    return interaction.reply(`Volumen cambiado a ${volume}`);
  },
};
