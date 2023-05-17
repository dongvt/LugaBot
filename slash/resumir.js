const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("resumir").setDescription("Resume la música"),
	run: async ({ client, interaction }) => {
		const queue = client.player.nodes.get(interaction.guildId)

		if (!queue || queue.isPlaying()) return interaction.reply("No hay canciones en la lista")

		queue.node.setPaused(false)
        interaction.reply("Musica resumida")
	},
}