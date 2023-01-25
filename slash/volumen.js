const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("volumen").setDescription("Cambia el volumen del robot")
    .addIntegerOption((option) => option.setName("vol").setDescription("volumen a poner").setMinValue(1).setMaxValue(100).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
		if (!queue) return await interaction.editReply("No hay canciones en la lista")

        
		queue.setVolume(interaction.options.getInteger("vol"))
        await interaction.editReply(`Volumen cambiado a ${interaction.options.getInteger("vol")}`)
	},
}