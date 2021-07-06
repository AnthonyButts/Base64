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
                    .setDescription('**Base64**:\n∟ `b!encode <message>` - Encodes a message in Base64.\n∟ `b!decode <message>` - Decodes a message in Base64.\n\n**General**\n∟ `b!help` - Shows you this message.\n∟ `b!info` - Shows you info about the bot.\n\n**Help**:\n∟ `b!support` - Gives you invite link to support server.')
                    .setFooter('Base64')
                    .setTimestamp()
            )

            break;

        case 'info':

            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Information')
                    .setColor('#D12127')
                    .setDescription('∟ `b!` - Bot Prefix\n∟ `Klem#0965` - Bot Prefix\n')
                    .setFooter('Base64')
                    .setTimestamp()
            )        

        break;

        case 'support':
            
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Support Discord Server')
                    .setColor('#D12127')
                    .setDescription('**If you need help with using the bot, or support click ** [here]b!(https://discord.com/invite/YQz3zFq/).')
                    .setImage('https://i.ibb.co/XyCxfCL/support-image.jpg')
                    .setFooter('Base64')
                    .setTimestamp()
            )

        break
    }

});

client.login( authToken );