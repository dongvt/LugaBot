const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("saltar").setDescription("Salta la canción actual"),
	run: async ({ client, interaction }) => {
		const queue = client.player.nodes.get(interaction.guildId)

		if (!queue || !queue.isPlaying()) return interaction.reply("No hay canciones en la lista")

        //const currentSong = queue.current

		queue.node.skip()
        return interaction.reply({content: `Se ha saltado ${queue.currentTrack}`})
	},
}