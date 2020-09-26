module.exports = {
    name: 'ban',
    description: '',
    guildOnly: true,
    args: true,
    tags: true,
    usage: '<user1> <user2>...',
    execute(message, args) {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            
            const taggedUsers = message.mentions.users.map(user => {
                return `<@${user.id}>`;
            });

            message.channel.send('Banning: ' + taggedUsers);
        } 
        else {
            message.channel.send('You don\'t have permissions to ban anyone');
        }
    },
};
