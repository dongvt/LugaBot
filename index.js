const {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");

const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { Player } = require("discord-player");

dotenv.config();
const TOKEN = process.env.TOKEN;

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.slashcommands = new Collection();
client.player = new Player(client, {
  deafenOnJoin: true,
  lagMonitor: 1000,
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

client.player.events.on("playerStart", (queue, track) =>
  queue.metadata.channel.send(`🎶 | Ahora reproduciendo **${track.title}**!`)
);
client.player.events.on("error", (queue, error) =>
  console.log(
    `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
  )
);
client.player.events.on("debug", (_queue, message) =>
  //console.log(`[${cyanBright("DEBUG")}] ${gray(message)}\n`)
  console.log(message)
);

let commands = [];

const slashFiles = fs
  .readdirSync("./slash")
  .filter((file) => file.endsWith(".js"));
for (const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`);
  client.slashcommands.set(slashcmd.data.name, slashcmd);
  commands.push(slashcmd.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(TOKEN);
console.log("Deploying slash commands");
rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commands,
  })
  .then(() => {
    console.log("Successfully loaded");
  })
  .catch((err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
client.on("ready", async () => {
  await client.player.extractors.loadDefault();
  console.log(`Logged in as ${client.user.tag}`);

});
client.on("interactionCreate", (interaction) => {
  async function handleCommand() {
    if (!interaction.isCommand()) return;

    const slashcmd = client.slashcommands.get(interaction.commandName);
    if (!slashcmd) interaction.reply("No es un comando de slash válido");

    //await interaction.deferReply();
    await slashcmd.run({ client, interaction });
  }
  handleCommand();
});
client.login(TOKEN);
