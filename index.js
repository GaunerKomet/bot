const Discord = require("discord.js");
const bot = new Discord.Client()
const TOKEN = 'ODU2NTU1NDAxNTU3MTgwNDI3.YNCvYQ.tb4gP_g-rFl9dSeIx-Nz7Kq15sw'
const prefix = 't!'

bot.on('ready', () => {
    console.log('Der Bot ist Nun Online')

    bot.user.setPresence({
        activity:{
            name: '/help test bot',
            type: 'WATCHING',
        },
        status: 'online'
    })
})

bot.on('message', message => {
    let parts = message.content.split(" ");

    if(parts[0] == 't!help') {
        message.channel.send('**Hier meine Befehle**\n** t!clear**/**t!purge** - Löscht bis zu 100 Nachrichten\n**t!member** - Sagt dir, wieviel Mitglieder der Server hat, auf dem du dich befindest.\n**t!owner** - sagt dir, wer der die Eigentumsrechte von einem Server hat.\n**t!userinfo <@>** - Damit kannst du dir die Benutzerinfo von die oder jemand anderes anzeigen lassen.')
    }
    else if(parts[0] == 't!clear' || parts[0] == 't!purge') {
        if(!message.member.hasPermission('MANAGE_MESSAGE')) return message.channel.send('Du brauchst die Berechtigung, Nachrichten zu löschen!')
        if(!parts[1]) return message.channel.send('Du must angeben, wieviel Nachrichten du löschen möchtest!')
        if(isNaN(parts[1])) return message.channel.send('Die Angabe, wieviele Nachrichten du löschen möchtest, muss eine Zahl sein!')
        if(parts[1] > 100) return message.channel.send('Du kannst nciht mehr als 100 Nachrichten löschen!')
        if(parts[1] < 2) return message.channel.send('Du kannst nicht weniger als 2 Nachrichten löschen!')
        message.channel.bulkDelete(parts[1])
        message.channel.send(`Ich habe erfolgreich **${parts[1]}** Nachrichten gelöscht!`).then(m => m.delete({timequt: 3000}))

    }
    else if(parts[0] == 't!member') {
        message.channel.send(`Der **${message.guild.name}**-Server hat gerade **${message.guild.memberCount}** Mitglieder (Inklusive Bots)`)
    }
    else if(parts[0] == 't!owner') {
        message.channel.send(`Der Owner vom **${message.guild.name}**-Server ist **${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}**`)
    }
    else if(parts[0] == 't!userinfo') {
        const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user

        const embed = new Discord.MessageEmbed()
        .setColor('69e3e2')
        .setAuthor(`${usr.tag}`, `${usr.displayAvatarURL({dynamic: true})}`)
        .setThumbnail(`${usr.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${usr}'s Informationen`)
        .addField('**Name + ID:**', `${usr.username}#${usr.discriminator}`)
        .addField('**ID:**', `${usr.id}`)
        .addField('**Avatar URL:**', `${usr.displayAvatarURL({dynamic:true})}`)
        .addField('**Nickname (Wenn vorhanden):**', `${member.nickname || `Der Benutzer at kein Nickname`}`)
        .addField('**Dem Server gejoined:**', `${member.joinedAt}`)
        .addField('**Discord gejoined**', `${usr.createAt}`)
        .addField('**Status:**', `${userr.presence.status}`)
        .addField('**Bot:**', `${usr.bot}`)
        .addField({
            name: '**Rollenmenge:**',
            value: member.roles.cache - 1,
        })

        message.channel.send(embed)


    }
    else if(message.content.includes('<@!856555401557180427>')) {
        const embed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('**Was gibts?**')
        .addField('Braust du Hilfe?', 'Benutze t!help')
        .addField('Willst du dem Owner eine FA schicken?', `Hier der Name: **${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}**`)
        .addField('Brauchst du bei sonst etwas Hilfe?', 'Wende dich an den Owner oder das Server Team')

        message.channel.send(embed)
    }
})

bot.login(TOKEN)