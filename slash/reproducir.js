const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reproducir")
    .setDescription("reproduce música")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("musica")
        .setDescription("Reproduce una canción a partir de una url")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("url de la canción")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("playlist")
        .setDescription("Reproduce una playlist a partir de una url")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("url de la playlist")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("buscar")
        .setDescription("Busca una canción de acuerdo a los terminos buscados")
        .addStringOption((option) =>
          option
            .setName("terminos")
            .setDescription("palabras a buscar")
            .setRequired(true)
        )
    ),
  run: async ({ client, interaction }) => {
    // if (!interaction.member.voice.channel) return interaction.editReply("Necesitas estar dentro de un canal de voz para usar el comando. IMBÉCIL")

    // const queue = await client.player.createQueue(interaction.guild)
    // if (!queue.connection) await queue.connect(interaction.member.voice.channel)

    // queue.setVolume(25)

    // let embed = new MessageEmbed()

    // if (interaction.options.getSubcommand() === "musica") {
    //     let url = interaction.options.getString("url")
    //     const result = await client.player.search(url, {
    //         requestedBy: interaction.user,
    //         searchEngine: QueryType.YOUTUBE_VIDEO
    //     })
    //     if (result.tracks.length === 0)
    //         return interaction.editReply("Sin resultados")

    //     const song = result.tracks[0]
    //     await queue.addTrack(song)
    //     embed
    //         .setDescription(`**[${song.title}](${song.url})** ha sido añadida a la lista`)
    //         .setThumbnail(song.thumbnail)
    //         .setFooter({ text: `Duración: ${song.duration}`})

    // } else if (interaction.options.getSubcommand() === "playlist") {
    //     let url = interaction.options.getString("url")
    //     const result = await client.player.search(url, {
    //         requestedBy: interaction.user,
    //         searchEngine: QueryType.YOUTUBE_PLAYLIST
    //     })

    //     if (result.tracks.length === 0)
    //         return interaction.editReply("Sin resultados")

    //     const playlist = result.playlist
    //     await queue.addTracks(result.tracks)
    //     embed
    //         .setDescription(`**${result.tracks.length} canciones de [${playlist.title}](${playlist.url})** han sido añadidas a la lista`)
    //         .setThumbnail(playlist.thumbnail)
    // } else if (interaction.options.getSubcommand() === "buscar") {
    //     let url = interaction.options.getString("terminos")
    //     const result = await client.player.search(url, {
    //         requestedBy: interaction.user,
    //         searchEngine: QueryType.AUTO
    //     })

    //     if (result.tracks.length === 0)
    //         return interaction.editReply("sin resultados")

    //     const song = result.tracks[0]
    //     await queue.addTrack(song)
    //     embed
    //         .setDescription(`**[${song.title}](${song.url})** ha sido añadida a la lista`)
    //         .setThumbnail(song.thumbnail)
    //         .setFooter({ text: `Duración: ${song.duration}`})
    // }
    // if (!queue.playing) await queue.play()
    // await interaction.editReply({
    //     embeds: [embed]
    // })

    /***********************************************
     *
     *      END OLD CODE
     *
     * **************** ******** *******************/
    const url = interaction.options.getString("url");
    console.log(url)
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    //No valid url
    if (!result.hasTracks()) {
      return interaction.reply({
        embeds: [new EmbedBuilder().setTitle("No Results").setTimestamp()],
      });
    }

    await interaction.deferReply();
    await interaction.editReply({
      content: `Loading a: ${result.playlist ? "playlist" : "track"}`,
    });

    await interaction.client.player.play(
      interaction.member.voice.channel?.id,
      result,
      {
        nodeOptions: {
          metadata: {
            channel: interaction.channel,
            client: interaction.guild?.members.me,
            requestedBy: interaction.user.username,
          },
          volume: 20,
          bufferingTimeout: 3000,
          leaveOnEnd: true,
        },
      }
    );

    //return interaction.editReply("Sin resultados");
  },
};
