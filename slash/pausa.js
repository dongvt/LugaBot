const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pausa").setDescription("Pausa la música"),
	run: async ({ client, interaction }) => {
		const queue = client.player.nodes.get(interaction.guildId)

		if (!queue || !queue.isPlaying()) return interaction.reply({content: "No hay canciones en la lista"})

		queue.node.setPaused(true)
        interaction.reply("Música pausada. Use `/resumir` para resumirla")
	},
}