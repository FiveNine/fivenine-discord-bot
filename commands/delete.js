module.exports = {
    name: 'delete',
    description: '',
    guildOnly: true,
    usage: '<number of messages to delete>',
    execute(message, args) {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            const amount = parseInt(args[0]) + 1;

            if(isNaN(amount)) {
                return message.channel.bulkDelete(2);
            } 
            else if (amount <= 1 || amount > 100) {
                return message.channel.send('you need to input a number between 1 and 99');
            }
            message.channel.bulkDelete(amount, true).catch(() => {
                message.channel.send('No messages found that are older than 2 weeks in this channel.');
            });
        }
        else {
            message.channel.send('You don\'t have permissions to delete messages.');
        }
    },
};
