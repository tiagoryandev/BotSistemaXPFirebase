const Discord = require("discord.js"); // Dependência da Discord.js para importação de funções para nossa aplicação
const firebase = require("firebase"); // Dependência da Firebase para a conecção com o nosso banco de dados
const database = firebase.database(); // Função para ligar o bando de dados do Firebase

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")){
        return message.channel.send(`:no_entry_sign: **|** ${message.author}, você não tem a permissão de **Gerenciar o Servidor** para usar esse comando!`);
    }; // Verifica se o author do comando tem a permissão de Gerenciar o Servidor, se não ele é notificado que não poderá usar o comando
   
    let channel_level = message.mentions.channels.first(); //Define um parametro de menção de canal
    
    if(!channel_level){
        return message.channel.send(`:no_entry_sign: **|** ${message.author}, você precisa mencionar um canal para usar esse comando!`);
    }; // Verifica se o autor mencionou um canal, se não ele é notificado

    database.ref(`Servidores/${message.guild.id}/ChannelLevelUP`).once("value").then(async function(db){
        if(db.val() = null){
            database.ref(`Servidores/${message.guild.id}/ChannelLevelUP`).set({
                channel: channel_level.id
            }); // Caso não tenha nada setado, ele seta o parametro com o id do canal que o autor mencionou
            const embed = new Discord.MessageEmbed()
                .setTitle(":white_check_mark:  **|** Canal para LevelUP")
                .setColor("RANDOM")
                .setDescription(`Foi adicionado um novo canal para o envio de mensagens de **LevelUP**.` +
                `\n\nCanal: ${channel_level}` +
                `\n\nTodas as mensagens de LevelUP seram enviadas nesse canal!`)
                .setTimestamp(); // Definição de embed com as informações canal setado

            return message.channel.send(`${message.author}`, embed); // Envia a embed mencionando o autor
        }else{
            database.ref(`Servidores/${message.guild.id}/ChannelLevelUP`).update({
                channel: channel_level.id
            }); // Caso já tenha um parametro setado, ele atualiza o parametro com o id do canal mencionado
            const embed = new Discord.MessageEmbed()
                .setTitle(":white_check_mark:  **|** Canal para LevelUP")
                .setColor("RANDOM")
                .setDescription(`Foi atualizado um novo canal para o envio de mensagens de **LevelUP**.` +
                `\n\nCanal: ${channel_level}` +
                `\n\nTodas as mensagens de LevelUP seram enviadas nesse canal!`)
                .setTimestamp(); // Definição de embed com as informações canal atualizado

            return message.channel.send(`${message.author}`, embed); // Envia a embed mencionando o autor
        };
    });
};