module.exports = {
    name: 'avatar',
	description: '',
	guildOnly: true,
	usage: '<user>',
    execute(message, args) {
        if(!message.mentions.users.size) {
			return message.channel.send(`<@${message.author.id}>\'s avatar: ${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}\'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`;
		});
		message.channel.send(avatarList);
    },
};
