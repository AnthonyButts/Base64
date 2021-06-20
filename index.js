const Discord = require('discord.js');
const Base64 = require('base-64')

const client = new Discord.Client();
const { prefix, authToken } = require('./config.json');

function updatePresence() {
    client.user.setPresence(
        {
            activity: {
                name: 'with Base64 | ' + client.guilds.cache.size + (client.guilds.cache.size == 1 ? ' Server!' : ' Servers!'),
                type: 'PLAYING'
            }
        }
    );
}

client.once('ready', () => {
    setInterval(() => {
        updatePresence();
    }, 15000);
});

client.on('message', ( message ) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    
    switch ( command ) {
        case 'encode':

            if (args.length < 1) return (
                message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Invalid Usage')
                    .setColor('#f54242')
                    .setDescription(`Usage: \`${prefix}encode <message>\``)
                    .setFooter('Base64')
                    .setTimestamp()
                )
            )

            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Encoded Messaged')
                    .setColor('#D12127')
                    .setDescription(`\`${Base64.encode(args.join(' '))}\``)
                    .setFooter('Base64')
                    .setTimestamp()
            )

            break;
        case 'decode':

        if (args.length < 1) return (
            message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Invalid Usage')
                .setColor('#f54242')
                .setDescription(`Usage: \`${prefix}decode <message>\``)
                .setFooter('Base64')
                .setTimestamp()
            )
        )

        try {

            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Decoded Messaged')
                    .setColor('#D12127')
                    .setDescription(`\`${Base64.decode(args.join(' '))}\``)
                    .setFooter('Base64')
                    .setTimestamp()
            )

        } catch {

            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Invalid Message')
                    .setColor('#f54242')
                    .setDescription('`Please provide a valid Base64 encoded message.`')
                    .setFooter('Base64')
                    .setTimestamp()
            )
            
        }

        break;

        case 'help':

            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('List of Commands')
                    .setColor('#D12127')
                    .setDescription('**Base64**:\n∟ `!encode <message>` - Encodes a message in Base64.\n∟ `!decode <message>` - Decodes a message in Base64.\n\n**General**\n∟ `!help` - Shows you this message.\n∟ `!info` - Shows you info about the bot.')
                    .setFooter('Base64')
                    .setTimestamp()
            )

            break;

        case 'info':

            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Information')
                    .setColor('#D12127')
                    .setDescription('∟ `!` - Bot Prefix\n∟ `Klem#0965` - Bot Prefix\n')
                    .setFooter('Base64')
                    .setTimestamp()
            )        

        break;
    }

});

client.login( authToken );