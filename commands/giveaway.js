const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'giveaway',
    description: '',
    guildOnly: true,
    args: true,
    numberOfArgs: 2,
    usage: '<time> <item to giveaway>',
    execute: async (message, args) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            let timeValueWithUnit = args[0];
            let prize = args[1];
            let host = message.author.id;
            if(args[2]) {
                prize += ` ${args[2]}`;
            }
            if(args[3]) {
                prize += ` ${args[3]}`;
            }
            if(args[4]) {
                prize += ` ${args[4]}`;
            }
            if(args[5]) {
                prize += ` ${args[5]}`;
            }
            let timeUnit;
            if(timeValueWithUnit.includes('s')) {
                timeUnit = 'seconds';
            }
            if(timeValueWithUnit.includes('m')) {
                timeUnit = 'minutes';
            }
            if(timeValueWithUnit.includes('h')) {
                timeUnit = 'hours';
            }
            if(timeValueWithUnit.includes('d')) {
                timeUnit = 'days';
            }

            let timeValue = timeValueWithUnit.substring(0, timeValueWithUnit.length - 1);
            let time = parseInt(timeValue);
            

            const Embed = new MessageEmbed()
                    .setTitle(prize)
                    .setDescription(`React with ✨ to enter!\nTime to roll: ${time} ${timeUnit}\nHosted by: <@${host}>`)
                    .setColor('RANDOM')
                    .setFooter(`Ends at - ${time} ${timeUnit} `);

            let finalEmbed = Embed;

            let msg = await message.channel.send('**NEW GIVEAWAY!**', finalEmbed);
            await msg.react('✨');

            
            let winner;
            let isWinnerBot = true;
            let counter = 0;

            

            setTimeout(() => {
                winner = msg.reactions.cache.get('✨').users.cache.random();
                console.log(winner.id);
                if(!winner.bot) {
                    isWinnerBot = false;
                }
                while(winner.bot && counter < 10) {
                    reroll();
                    console.log(`winner is <@${winner.id}>`);
                    counter++;
                }
                if(!isWinnerBot) {
                    const winnerEmbed = new MessageEmbed()
                    .setTitle(prize)
                    .setDescription(`Winner: <@${winner.id}>\nHosted by: <@${host}>`)
                    .setColor('RANDOM')
                    .setFooter(`Ended at - ${time} ${timeUnit} `);

                    finalEmbed = winnerEmbed;
                    msg.edit('**GIVEAWAY ENDED**', finalEmbed);

                    message.channel.send(`The winner for the ${prize} is <@${winner.id}>`);
                }
                
            }, waitingTime());

            
            function waitingTime() {
                let timehere;
                switch(timeUnit) {
                   case 'seconds':
                      timehere = time * 1000;
                      break;
                   case 'minutes':
                      timehere = time * 1000 * 60;
                      break;
                   case 'hours':
                      timehere = time * 1000 * 60 * 60;
                      break;
                   case 'days':
                      timehere = time * 1000 * 60 * 60 * 24;
                      break;
                   default:
                       timehere = time * 1000;
                }
                return timehere;
            }

            function reroll() {
                winner = msg.reactions.cache.get('✨').users.cache.random();
                if(winner.bot) {
                    isWinnerBot = true;
                }
                else {
                    isWinnerBot = false;
                }
            }
        
        }
    },
};