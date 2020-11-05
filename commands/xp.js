const Discord = require("discord.js"); // Dependência da Discord.js para importação de funções para nossa aplicação
const firebase = require("firebase"); // Dependência da Firebase para a conecção com o nosso banco de dados
const database = firebase.database(); // Função para ligar o bando de dados do Firebase

module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author; // Define o user como uma menção ou o autor do comando

    database.ref(`Servidores/${message.guild.id}/SistemaXP/Cache/${user.td}`).once("value").then(async function(db){
        if(db.val() == null){
            return message.channel.send(`:no_entry_sign: **|** ${user} não está no **Sistema** de **XP**! Ele deve enviar uma mensagem na minha presença para ser registrado!`); // Se caso o user não teja no sistema de xp, ele é notificado
        }else{
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Abaixo está as informações do **${user.username}**:` +
                `\n\n🔰 **Nivel**: ${db.val().level}` +
                `\n✨ **XP**: ${db.val().xp}` + 
                `\n🌟 **Proximo Nivel**: **[** ${db.val().xp} **/** ${nivel}00 **]**`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })); // Definição de embed com as informações de xp
            
            return message.channel.send(`${user}`, embed); // Envia a embed mencionado o user
        };
    });
}