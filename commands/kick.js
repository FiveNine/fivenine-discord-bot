module.exports = {
    name: 'kick',
	description: '',
	guildOnly: true,
	args: true,
	tags: true,
	usage: '<user1> <user2>...',
    execute(message, args) {
		if(message.member.hasPermission('KICK_MEMBERS')) {

			const taggedUsers = message.mentions.members.map(user => {
				return user;
			});
	
			for(let i = 0; i < taggedUsers.length; i++) {
				if(taggedUsers[i].id != 333789596834070528) {
					taggedUsers[i].kick().then(() => {
						message.channel.send(`${taggedUsers[i]} has been successfully kickced`);
					}).catch(() => {
						message.channel.send(`I do not have permissions to kick ${taggedUsers[i]}`);
					});
				}
				else {
					message.channel.send('cant kick fivenine');
				}
			}
			
			
		}
		else {
            message.channel.send('You don\'t have permissions to kick anyone');
        }
    },
};
// if (command === 'kick') {
	// 	if(!message.mentions.users.size) {
	// 		return message.channel.send('You need to tag a user in order to kick them!');
	// 	}
	// 	const taggedUser = message.mentions.users.first();

	// 	message.channel.send(`Kicking: ${taggedUser.username}`);
	// }