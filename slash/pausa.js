const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pausa").setDescription("Pausa la música"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la lista")

		queue.setPaused(true)
        await interaction.editReply("Música pausada. Use `/resumir` para resumirla")
	},
}