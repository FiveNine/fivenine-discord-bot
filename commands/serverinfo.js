module.exports = {
    name: 'serverinfo',
    description: '',
    guildOnly: true,
    execute(message, args) {
        message.channel.send(`Server name: ${message.guild.name}\nOwner ID: ${message.guild.ownerID}\nTotal members: ${message.guild.memberCount}`);
    },
};
