module.exports = {
    name: 'mute',
    description: '',
    guildOnly: true,
    args: true,
    tags: true,
    usage: '<user1> <user2>...',
    execute(message, args) {
        if (message.member.hasPermission('MUTE_MEMBERS')) {
            
            const taggedUsers = message.mentions.members.map(user => {
                return user;
            });

            
            if(message.guild.name === 'CSGOWORLDTRADE') {
                const mutedRole = message.guild.roles.cache.find(r => r.name === 'Muted');
                const normalRole = message.guild.roles.cache.find(r => r.name === 'TRADER');
            

                for(let i = 0; i < taggedUsers.length; i++) {
                    taggedUsers[i].roles.remove(normalRole);
                    taggedUsers[i].roles.add(mutedRole).then(() => {
                        message.channel.send(`Muted ${taggedUsers[i]}`);
                    }).catch(() => {
                        message.channel.send(`Couldn\'t mute ${taggedUsers[i]}`);
                    });
                }
            }  
            
        }
        else {
            message.channel.send('You don\'t have permissions to mute anyone');
        }

    },
};
