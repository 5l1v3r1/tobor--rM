const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms")
var prefix = 'Mr.';

client.on('ready', () => {
    client.user.setPresence({ game: { name:`Mr.help | ${client.users.size} membres` }})
  console.log(`Connecté en tant que ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === prefix + 'help') {
      msg.delete()
      let helpembed = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setTitle("Page d'aide")
      .setColor("#7289da")
      .setDescription("Voici la page d'aide \`Mr.help\`")
      .addField("Administration", "```mpall```")
      .addField("Modération", "```ban, unban, kick, clearall, purge```")
      .addField("Utile", "```serveurinfo, botinfo, membercount, sondage, annonce, timer, google, youtube, avatar```")
      .addField("Jeux", "```8ball, roll, flip, lucky```")
      .addField("Auteur", "```infos```")
      .setFooter("Mr Robot")
      .setThumbnail("https://images.emojiterra.com/google/android-oreo/512px/2753.png")
      .setTimestamp()
    msg.author.send(helpembed)
    msg.reply("la page d'aide t'a été envoyée en message privé !").then(msg => msg.delete(10000));
 console.log(`Commande help effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)

  }

  if (msg.author.bot) return;
       if(msg.channel.type=="dm")return;
       if (!msg.content.startsWith(prefix))return
       let args = msg.content.split(' ').slice(1)  
        command = msg.content.split(' ')[0];
           command = command.slice(prefix.length)
         
         if (command === "say"){
          if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
           msg.delete()
         msg.channel.send(args.join(' '));
         console.log(`Commande say effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
         }

  if (msg.content === prefix + 'kick'){
      msg.delete()  
    if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
    let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    if (!member) return msg.reply("vous devez mentionner l'utilisateur à kicker !").then(msg => msg.delete(10000));
    if (!member.kickable) return msg.reply(":x: vous ne pouvez pas kicker un membre avec un rôle supérieur ou égale à vous !").then(msg => msg.delete(10000));
    
    let reason = args.slice(1).join(' ');
    
    member.kick(reason)
    .catch(error => msg.reply(`:x: désolé, vous ne pouvez pas kicker car une erreur a eu lieu. **erreur :** ${error}`)).then(msg => msg.delete(10000));
    
    let kickEmbed = new Discord.RichEmbed()
    .setColor("#7289da")
    .setTitle(':hammer: **KICKE** :hammer:')
    .setDescription(`${member.user.tag} a été kické avec la raison : **${reason}**`)
    .setFooter("Mr Robot")
    .setTimestamp()
    msg.channel.send(kickEmbed)
    console.log(`Commande kick effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
    }

    if (command === 'ban'){  
        msg.delete()
        if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
        let member = msg.mentions.members.first();
        if (!member) return msg.reply("vous devez mentionner l'utilisateur à bannir !").then(msg => msg.delete(10000));
        if (!member.bannable) return msg.reply(":x: vous ne pouvez pas bannir un membre avec un rôle supérieur ou égale à vous !").then(msg => msg.delete(10000));
        
        let reason = args.slice(1).join(' ');
        
        member.ban(reason)
        .catch(error => msg.reply(`:x: désolé, vous ne peux pas bannir car une erreur a eu lieu. **erreur :** ${error}`)).then(msg => msg.delete(10000));
        
        let BanEmbed = new Discord.RichEmbed()
        .setColor("#7289da")
        .setTitle(':hammer: **BANNI** :hammer:')
        .setDescription(`${member.user.tag} a été banni avec la raison : **${reason}**`)
        .setFooter("Mr Robot")
        .setTimestamp()
        msg.channel.send(BanEmbed)
        console.log(`Commande ban effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
        }

        if(command === "unban"){
            msg.delete()
          if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
                const reason = args.slice(1).join(' ');
              client.unbanReason = reason;
              bot.unbanAuth = msg.author;
              const user = args[0];
              if (reason.length < 1) return msg.reply('vous devez donner une raison !').then(msg => msg.delete(10000));
              if (!user) return msg.reply("vous devez entrer l'id de l'utilisateur à unban !").catch(console.error).then(msg => msg.delete(10000));
              msg.guild.unban(user);
              msg.channel.send(`L'utilisateur ${user} a été unban avec la raison ${reason} !`)
          
              console.log(`Commande unban effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
          }

    if(command === "mpall") {
        msg.delete()
        let member = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0])
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            return msg.reply(`vous n'avez pas la permission d'utiliser cette commande ! :rage:`).then(msg => msg.delete(10000));
        let DMALL = args.join(" ").slice(0);
      if (!DMALL) return msg.reply("vous devez mettre un texte après la commande !").then(msg => msg.delete(10000));
      
      msg.guild.members.forEach((player) => {
         let alertembed = new Discord.RichEmbed()
         .setThumbnail(msg.guild.iconURL)
            .setColor("#7289da")
            .setThumbnail("http://leforestbadminton62.fr/wp-content/uploads/2018/01/alert.png")
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle("Mpall")
            .setDescription(`Depuis le serveur **${msg.guild.name}**\n\nMessage : ${DMALL}`)
            .setFooter("Mr Robot")
            .setTimestamp()
            msg.guild.member(player).send(alertembed)
            console.log(`Commande mpall effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
      })
      }

      if(msg.content === prefix + "membercount"){
        msg.delete()
        let online = msg.guild.members.filter(member => member.user.presence.status !== 'offline');
        let sicon = msg.guild.iconURL
        let mcembed = new Discord.RichEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle("Membercount")
        .setThumbnail(sicon)
        .setDescription("Voici les informations des membres du serveur")
        .setColor("#7289da")
        .addField("Membres", msg.guild.memberCount)
        .addField("En ligne", online.size)
        .addField('Status des membres', `**${msg.guild.members.filter(o => o.presence.status === 'online').size}** En ligne\n**${msg.guild.members.filter(i => i.presence.status === 'idle').size}** Inactif\n**${msg.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Ne pas déranger\n**${msg.guild.members.filter(off => off.presence.status === 'offline').size}** Déconnecté/Invisible\n**${msg.guild.members.filter(s => s.presence.status === 'streaming').size}** Streaming`)
        .addField("Humains", msg.guild.memberCount - msg.guild.members.filter(m => m.user.bot).size)
        .addField("Bots", msg.guild.members.filter(m => m.user.bot).size)
        .setFooter("Mr Robot")
        .setTimestamp()
        msg.channel.send(mcembed).then(msg => msg.delete(30000));
        console.log(`Commande membercount effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
      }
      
        if(msg.content === prefix + "serveurinfo"){
            msg.delete()
          let online = msg.guild.members.filter(member => member.user.presence.status !== 'offline');
        let day = msg.guild.createdAt.getDate()
        let month = 1 + msg.guild.createdAt.getMonth()
        let year = msg.guild.createdAt.getFullYear()
        let hour = msg.guild.createdAt.getHours()
        let min = msg.guild.createdAt.getMinutes()
        let siconn = msg.guild.iconURL
          let siembed = new Discord.RichEmbed()
          .setColor("#7289da")
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .setTitle("Serveurinfo")
          .setThumbnail(siconn)
          .setDescription("Voici les informations du serveur")
          .addField("Fondateur", msg.guild.owner, true)
          .addField("ID", msg.guild.id, true)
          .addField("Membres", msg.guild.memberCount, true)
          .addField("En ligne", online.size, true)
          .addField("Bots", msg.guild.members.filter(m => m.user.bot).size, true)
          .addField("Humains", msg.guild.memberCount - msg.guild.members.filter(m => m.user.bot).size, true)
          .addField("Rôles", msg.guild.roles.size, true)
          .addField("Salons", msg.guild.channels.size, true)
          .addField('Status des membres', `**${msg.guild.members.filter(o => o.presence.status === 'online').size}** En ligne\n**${msg.guild.members.filter(i => i.presence.status === 'idle').size}** Inactif\n**${msg.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Ne pas déranger\n**${msg.guild.members.filter(off => off.presence.status === 'offline').size}** Déconnecté/Invisible\n**${msg.guild.members.filter(s => s.presence.status === 'streaming').size}** Streaming`)
          .addField("Création du serveur",`${day}/${month}/${year} à ${hour}:${min}`)
          .addField("Région", msg.guild.region, true)
          .setFooter("Mr Robot")
          .setTimestamp()
          msg.channel.send(siembed).then(msg => msg.delete(30000));
          console.log(`Commande serveurinfo effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
        }
        if (msg.content === prefix + "botinfo"){
            msg.delete()
            let day = msg.guild.joinedAt.getDate()
            let month = 1 + msg.guild.joinedAt.getMonth()
            let year = msg.guild.joinedAt.getFullYear()
            let hour = msg.guild.joinedAt.getHours()
            let min = msg.guild.joinedAt.getMinutes()
            let biembed = new Discord.RichEmbed()
            .setColor("#7289da")
            .setAuthor(msg.author.user, msg.author.avatarURL)
            .setTitle("Botinfo")
            .setThumbnail("https://cdn.discordapp.com/avatars/467792656504717316/233069362c92db26d1f44cde524bb14b.png?size=256")
            .setDescription("Voici les informations du bot")
            .addField("ID",msg.client.user.id, true)
            .addField("Créé par", "IceKow™")
            .addField("Rôle par défault", "Mr Robot", true)
            .addField("Date de création", "15/7/2018")
            .addField("Date d'arrivée", `${day}/${month}/${year} à ${hour}:${min}`)
            .addField('Bot', "true", true)
            .setFooter("Mr Robot")
            .setTimestamp()
            msg.channel.send(biembed).then(msg => msg.delete(30000));
            console.log(`Commande botinfo effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
        }

        if (command === 'avatar'){
            msg.delete()
            let user = msg.mentions.users.first() || msg.author;
          let AvatarEmbed = new Discord.RichEmbed()
          .setColor("#7289da")
          .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle(`Avatar de ${user.username}`)
            .setImage(user.displayAvatarURL)
            .setFooter("Mr Robot")
            .setTimestamp()
            msg.channel.send(AvatarEmbed).then(msg => msg.delete(10000));
            console.log(`Commande avatar effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
          }

        if(command === 'clearall'){
            msg.delete()
            if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
            msg.channel.bulkDelete(100)
          .then(msg => console.log(`Commande clearall effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`))
          .catch(console.error);
          }

        if(command === 'purge'){
            msg.delete()
            if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
          if(isNaN(args[0])) return msg.reply("vous devez mettre un chiffre/nombre !").then(msg => msg.delete(10000));
          msg.channel.bulkDelete(args[0])
          .then(msg => console.log(`Commande purge effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`))
            .catch(console.error);
          }
    
          if(msg.content === prefix + 'lucky'){
              msg.delete()
            var LuckNumber = Math.floor((Math.random() * 12000) + 0.120);
            const numEmb = new Discord.RichEmbed()
            .setColor("#7289da")
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle("Lucky")
            .setThumbnail("https://i.skyrock.net/2931/65632931/pics/2636721288_1.png")
            .addField("Lucky de :", `${msg.author}`)
            .addField('Et votre nombre chanceux est...', `${LuckNumber} !`)
            .setFooter("Mr Robot")
             .setTimestamp()
             msg.channel.send({embed: numEmb}).then(msg => msg.delete(10000));
            console.log(`Commande lucky effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
          
          }
    
          if(msg.content === prefix + 'flip') {
              msg.delete()
            let flipEmbed = new Discord.RichEmbed()
            .setColor("#7289da")
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle("Flip")
            .setThumbnail("https://www.isolation-a-1euro.fr/wp-content/uploads/2015/11/250px-1_euro_pile.png")
            .setTitle('Pile ou Face ?')
            .addField("Pile ou Face de :", `${msg.author}`)
            .addField("Réponse :", `**${Math.floor(Math.random() * 2) == 0 ? "Face" : "Pile"}** !`)
            .setFooter("Mr Robot")
            .setTimestamp()
            msg.channel.send(flipEmbed).then(msg => msg.delete(10000));
            console.log(`Commande flip effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
          }

    if(command === "timer"){
        msg.delete()
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
    let Timer = args[0];
    
    if(!args[0]){
      return msg.reply("vous devez entrer une période de temps, soit `s, m ou h` à la fin !").then(msg => msg.delete(10000));
    }
    
    if(args[0] <= 0){
      return msg.reply("vous devez entrer une période de temps, soit `s, m ou h` à la fin !").then(msg => msg.delete(10000));
    }
    
    msg.reply("le timer a été réglé pour : " + `${ms(ms(Timer), {long: true})}`).then(msg => msg.delete(10000));
    
    setTimeout(function(){
        msg.reply(`le timer est terminé, il a duré : ${ms(ms(Timer), {long: true})}`)
    
    }, ms(Timer));
    console.log(`Commande timer effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
    }
    
    if(msg.content.startsWith(prefix + "google")) {
        msg.delete()
      let google = args.slice().join('+');
      let googlembed = new Discord.RichEmbed()
      .setColor("#008744")
      .setAuthor("Google", "https://images-ext-2.discordapp.net/external/dVb3uElHyzLN4VY2XqR98CAr9lV-xSuYpiS1T_d2Qs8/https/cdn.discordapp.com/attachments/459211484484861952/459212971156045853/unknown.png")
      .setThumbnail("https://i.imgur.com/mSecJnk.gif?1")
      .addField("Résultat :", "https://www.google.com/search?q=" + `${google}`)
      .setFooter("Mr Robot")
      .setTimestamp()
      msg.channel.send(googlembed).then(msg => msg.delete(30000));
    console.log(`Commande google effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
    }
      
    if(msg.content.startsWith(prefix + "youtube")) {
        msg.delete()
      let youtube = args.slice().join('+');
      let youtubeembed = new Discord.RichEmbed()
      .setColor("#cc181e")
      .setAuthor("Youtube", "https://cdn.discordapp.com/emojis/335112740957978625.png?v=1")
      .setThumbnail("https://media.giphy.com/media/13Nc3xlO1kGg3S/source.gif")
      .addField("Résultat :", "https://www.youtube.com/results?search_query=" + `${youtube}`)
      .setFooter("Mr Robot")
      .setTimestamp()
      msg.channel.send(youtubeembed).then(msg => msg.delete(30000));
    console.log(`Commande youtube effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
    }

    if(command === "annonce"){
        msg.delete()
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
        const color = args[0]
        let title = args[0];
        const text = args.slice().join(" ");
        const author = msg.author;
        if (text.length < 1) return msg.reply("vous devez mettre un texte après la commande !").then(msg => msg.delete(10000));
        //const colour = args.slice(2).join("");
        const aembed = new Discord.RichEmbed()
        .setColor("#7289da")
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle("Annonce")
        .setThumbnail("http://leforestbadminton62.fr/wp-content/uploads/2018/01/alert.png")
        .setDescription(`Annonce de ${msg.author}\n\n**Annonce :** ${text}`)
        .setFooter("Mr Robot")
        .setTimestamp()
       msg.channel.send(aembed)
       console.log(`Commande annonce effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
      }
    
      if (msg.author.equals(client.user)) return;
        
    if (!msg.content.startsWith(prefix)) return;
    
    
    var argss = msg.content.substring(prefix.length).split(" ");
    
    switch (argss[0].toLowerCase()) {
    
            case "8ball":
            msg.delete()
        let argss = msg.content.split(" ").slice(1);
        let tte = argss.join(" ")
        if (!tte){
            return msg.reply("vous devez poser une question !").then(msg => msg.delete(10000));}
        
    
            var replys = [
                "Oui",
                "Non",
                "Je sais pas",
                "Peut être",
                "C'est possible",
                "Je pense que oui",
                "Ouaip",
                "Ouais",
                "Ok",
                "C'est cool mais je m'en fiche",
                "Carrément",
                "Je sais pas comment répondre",
                "C'est chaud comme question",
                "Je peux pas répondre",
                "C'est impossible"
            ];
    
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var bembed = new Discord.RichEmbed()
            .setColor("#7289da")
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle("8ball")
            .setThumbnail("https://emojipedia-us.s3.amazonaws.com/thumbs/160/facebook/65/crystal-ball_1f52e.png")
            .setDescription(":8ball: 8ball")
            .addField("Question :", `${msg.author}, ${tte}`)
            .addField("Réponse :", `**${reponse}** !`)
            .setFooter("Mr Robot")
            .setTimestamp()
            msg.channel.sendEmbed(bembed).then(msg => msg.delete(10000));
            console.log(`Commande 8ball effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
    
    }

    if (msg.author.equals(client.user)) return;
        
    if (!msg.content.startsWith(prefix)) return;
    
    
    var argss = msg.content.substring(prefix.length).split(" ");
    
    switch (argss[0].toLowerCase()) {
    
            case "roll":
            msg.delete()
        let argss = msg.content.split(" ").slice(1);
        
    
            var replys = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6"
            ];
    
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var bembed = new Discord.RichEmbed()
            .setColor("#7289da")
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle("Roll")
            .setThumbnail("http://www.zamagame.com/wp-content/uploads/2015/02/One-Dice.png")
            .addField("dé lancé par :", `${msg.author}`)
            .addField("Réponse :", `**${reponse}** !`)
            .setFooter("Mr Robot")
            .setTimestamp()
            msg.channel.sendEmbed(bembed).then(msg => msg.delete(10000));
            console.log(`Commande roll effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
        }

    if(msg.content === prefix + "infos"){
        msg.delete()
        let infembed = new Discord.RichEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setColor("#7289da")
        .setTitle("Infos")
        .setThumbnail("http://drapeau-brode.fr/142-home_default/couronne-de-palmes-or.jpg")
        .setDescription("Hey salut toi !\nSi tu as fait cette commande c'est que tu as regardé le help :p\nPour commencer ce bot m'a prit plus de 4h00 !\nIl restera unique au monde !\n(PS : Mon pseudo est IceKow™#5613 si tu souhaites me dire quelques chose ou autre.)\nSur ceux je te souhaite une bonne journée/soirée à toi !\n\nIceKow™.")
        .setFooter("Mr Robot")
        .setTimestamp()
        msg.channel.send(infembed).then(msg => msg.delete(30000));
        console.log(`Commande sondage effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
    }

    if(msg.content.startsWith(prefix + "sondage")){
        msg.delete()
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply("vous n'avez pas la permission d'utiliser cette commande ! :rage:").then(msg => msg.delete(10000));
        let args = msg.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var sembed = new Discord.RichEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle("Sondage")
        .setThumbnail('http://leforestbadminton62.fr/wp-content/uploads/2018/01/alert.png')
        .setDescription(`Sondage de ${msg.author}\n\n**Sondage :** ${thingToEcho}\n\n✅ Oui\n❌ Non`)
        .setColor("#7289da")
        .setFooter("Mr Robot")
        .setTimestamp()
        msg.channel.send(sembed)
        .then(function (msg){
        msg.react("✅");
        msg.react("❌");
        console.log(`Commande sondage effectuée par ${msg.author.tag} sur le serveur ${msg.guild.name}`)
        
      }).catch(function(){

      });
    }
});


client.login('NDY3NzkyNjU2NTA0NzE3MzE2.Di1yxA.zlKYP38kL7jtKUruBXoBo18hP7o');