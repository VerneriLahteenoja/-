require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

const BOT_PREFIX = '?'

const rollNum = () => {
    return (String(Math.floor(Math.random() * 100 + 1)));
}

const BOT_COMMANDS = ['help', 'roll', 'pick']

client.on('messageCreate', async function(message) {
    try {
        if (message.author.bot) return;
        if (message.content.startsWith(BOT_PREFIX)) {
            if (message.author.id === process.env.SECONDARY_MASTER_USER) {
                message.reply("Yes master, right away master!");
            }
            if (message.content.startsWith(`${BOT_PREFIX}help`)) {
                message.reply(`Current available commands are:${BOT_COMMANDS.map(com => ' ' + com)}`);
            }
            if (message.content.startsWith(`${BOT_PREFIX}roll`)) {
                const roll = rollNum()
                message.reply(`${message.author.displayName}'s roll = ${roll}`);
            }
            if (message.content.startsWith(`${BOT_PREFIX}pick`)) {
                message.reply('Sorry, this command is not implemented...');
            } 
            if (message.content.startsWith(`${BOT_PREFIX}chat`)) {
                message.reply(`Hello ${message.member.nickname }!`);
            }
        }
        return;
    } catch(err){
        console.log(err);
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("ChatAI bot is online.");
