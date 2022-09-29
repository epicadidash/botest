const { REST, SlashCommandBuilder, Routes,ChannelType } = require('discord.js');
const dotenv = require('dotenv')
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
dotenv.config()
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.once('ready', () => {
    console.log('Ready!');
});
const clientId = process.env.clientId;
const guildId = process.env.guildID
const token = process.env.DISCORD_TOKEN

const connection =(id) =>{;}
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('join').setDescription('Replies with user info!').addChannelOption((option)=>
    option.setName('channel').setDescription('The Channel to join').setRequired(true).addChannelTypes(ChannelType.GuildVoice)),
  ]
    .map(command => command.toJSON());
  
  const rest = new REST({ version: '10' }).setToken(token);
  
  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);
      client.on('interactionCreate', async interaction => {
          if (!interaction.isChatInputCommand()) return;
      
          const { commandName } = interaction;
          if(commandName === 'join'){
            const p =interaction.options.getChannel('channel')
           
            const voiceConnection=joinVoiceChannel({
                channelId:p.id,
                guildId:interaction.guild,
                adapterCreator:interaction.guild.voiceAdapterCreator
            })
           
          }
         else if (commandName === 'server') {
              await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
          } else if (commandName === 'user') {
              await interaction.reply(`Your tag: @${interaction.user.tag}\nYour id: ${interaction.user.id}`);
          }
      });

client.login(process.env.token)


