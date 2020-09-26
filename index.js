const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// Whenever a message is sent inside a channel your bot has access to, the message's content will be logged to your console.
client.on('message', message => {
	console.log(`${message.author.username}: ${message.content}`);

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	

	// if message does not start with prefix or message author is bot, return
	if(!message.content.startsWith(prefix) || message.author.bot) return;


	try {
		const command = client.commands.get(commandName);
	

		//for messages in DM
		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply('Smooth brain use that command in a server...');
		}
		//for commands mentioning users
		if(command.args && command.tags && !message.mentions.users.size) {
			let reply = 'You didn\'t mention any user';

			if(command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}
		//for giveaway command
		if(args.length < command.numberOfArgs) {
			let reply = 'You didn\'t provide all the arguments!';
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			return message.channel.send(reply);
		}
		//for commands having arguments
		if (command.args && !args.length) {
			let reply = 'You didn\'t provide any arguments!';

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}

		// if (commandName === 'giveaway') {
		// 	const giveawayMember = message.author.id;
		// 	message.channel.send('Let\'s set-up your giveaway! Please choose a channel to host the giveaway in. You can type \`cancel\` at anytime to stop this giveaway creation session.');
		// 	// message.channel.send(giveawayMember);
		// 	if(message.author.id === giveawayMember) {
		// 		const messageContent = message.content;
		// 		if(messageContent == message.guild.channels) {
		// 			message.channel.send(messageContent);
		// 		}
		// 	}
		// }

		command.execute(message, args);
	}
	catch (error) {
		console.error(console.error());

		message.channel.send('Hmm... there seems to be some issue with that command... please DM <@333789596834070528> about this');
	}

});

// login to Discord with your app's token
client.login(token);
