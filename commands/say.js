module.exports = {
    name: 'say',
    description: '',
    guildOnly: true,
    args: true,
    usage: '<message>',
    execute(message, args) {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.bulkDelete(1);
            message.channel.send(args);
        }
    },
};