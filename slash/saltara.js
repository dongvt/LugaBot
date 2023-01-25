const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("saltara").setDescription("Salta a cierto # de la lista")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("Número a saltar").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la lista")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Número de lista inválido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Saltado al número ${trackNum}`)
	},
}