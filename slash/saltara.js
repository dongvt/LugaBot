const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("saltara")
    .setDescription("Salta a cierto # de la lista")
    .addNumberOption((option) =>
      option
        .setName("tracknumber")
        .setDescription("Número a saltar")
        .setMinValue(1)
        .setRequired(true)
    ),
  run: async ({ client, interaction }) => {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue)
      return interaction.editReply("No hay lista");

    const trackNum = interaction.options.getNumber("tracknumber");
    if (trackNum > queue.tracks.length)
      return interaction.reply({content:"Número de lista inválido"});

    queue.node.jump(trackNum - 1);

    interaction.reply(`Saltado al número ${trackNum}`);
  },
};
