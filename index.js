/*
		Esse é o código é para Bots de XP, usando uma biblioteca da Firebase,
	caso você use esse código no seu Bot, você pode usar, mais lembre que esse código é para ajudar 
	usuários com essa biblioteca.
		Caso queira entrar em contato com o Autor do código, você pode entrar no meu servidor no Discord, e
	testar a minha Aplicação no Discord, com o nome Mizuhara um Bot de Diversão, Social, Moderação, Utilidades e NSFW.
	
  Autor: Tia#1000
	Website: https://www.mizuhara.tk/
	Twitter: @BotMizuhara
  Meu Servidor: https://discord.gg/QraTZUq
  
	Obrigado por ler meu código! <3
*/

const Discord = require("discord.js"); // Dependência da Discord.js para importação de funções para nossa aplicação
const firebase = require("firebase"); // Dependência da Firebase para a conecção com o nosso banco de dados
const client = new Discord.Client(); // Definição do cliente que irá logar com a nossa aplicação
const fire = require('./conections/firebase.js')(); // Solicitação do arquivo de conecção com o banco de dados e executado
const config = require("./config.json"); // Solicitação do arquivo de configurações como token e prefixo
const database = firebase.database(); // Função para ligar o bando de dados do Firebase
const cooldowns = new Discord.Collection(); // Função de coletores para fazer o cooldown do Sistema de XP

client.on("message", async function(message) {
    if(message.author.bot){
        return; // Ignora mensagens de bots no seu servidor
    };
    if(message.channel.type === "dm"){
        return; // Ignora mensagens no privado da sua aplicação
    };
    if(!cooldowns.has(message.author.id)){
        cooldowns.set(message.author.id, new Discord.Collection()); // Vai verificar se o autor tem um cooldown, se não ele seta um cooldown
    };
  
    const now = Date.now(); // Cria o horario que o autor mandou a mensagem
    const timestamps = cooldowns.get(message.author.id); // Busca o tempo do cooldown do autor
    const cooldownAmount = (message.author.id.cooldown || 3) * 1000; // Define que o cooldown padrão será de 3 segundos
  
    if(timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // Cria um tepo que irá acabar o cooldown
  
        if(now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000; // Mostra quanto tempo falta para terminar o cooldown
            return; // Enquanto não acabar o tempo de cooldown, ele vai retornar nada
        };
    };
  
    timestamps.set(message.author.id, now); // Vai setar o cooldown no autor
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // Vai retirar o cooldown quando o tempo padrão acabar
  
    database.ref(`Servidores/${message.guild.id}/SistemaXP/Cache/${message.author.td}`).once("value").then(async function(db){
        if(db.val() == null){
            database.ref(`Servidores/${message.guild.id}/SistemaXP/Cache/${message.author.td}`).set({
                xp: 0,
                level: 1
            }); // Cano o autor não esteja no sistema de xp, ele vai setar um parametro no banco de dados com o xp e level
        }else{
            let gerarXP = Math.floor(Math.random() * 10) + 1; // Define o valor minimo e maximo de xp que o autor pode pegar por mensagem
            if(db.val().level*100 <= db.val().xp){
                database.ref(`Servidores/${message.guild.id}/SistemaXP/Cache/${message.author.td}`).update({
                    xp: 0,
                    level: db.val().level +1
                }); // Vai atribuir um limite para cada nivel, onde o level*100  será o limite de xp, entã se eu tenho 100 de xp e tou no nivel 1, seria o limite, então ele vai atualizar os dados adicionado 1 level e zerando o xp 
                
                let channel_levelup = await database.ref(`Servidores/${message.guild.id}/ChannelLevelUP`).once("value").then(async function(db){
                    if(db.val() == null){
                        return message.channel.id; // Caso não tenha nenhum canal para xp, ele retorna o canal onde ocorreu a mensagem do autor
                    }else{
                        return db.val().channel; // Retorna o canal que está setado no banco de dados
                    };
                }); 
                message.guild.channels.cache.get(channel_levelup).send(`:star: **|** Parabéns ao ${message.author} por ter chegado no **Nivel ${db.val().level+1}**!`).catch(error => {
                    console.log(`[ERRO] Ocorreu um erro ao enviar uma mensagem no canal!`); // Envia a notificação no canal sobre o level upado do autor, e se der erro ele notifica no console
                });
            }else{
                database.ref(`Servidores/${message.guild.id}/SistemaXP/Cache/${message.author.td}`).update({
                    xp: db.val().xp + gerarXP
                }); // Caso o autor ainda não tenha atingido o limite de xp para o level up, ele apenas atualiza o xp, adicionando o xp que o autor ganhou
            };
        };
    });
});

client.on('message', message => {
	if(message.author.bot){
		return; // Ignora mensagens de bots no seu servidor
	};
	if(message.channel.type == 'dm') {
		return; // Ignora mensagens no privado da sua aplicação
	};
	if(!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())){
		return; // Ignora mensagens que só sejam o prefixo da sua aplicação
	};
	if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)){
		return; // Ignora mensagens que sejam manções a sua aplicação
	};

    const args = message.content.trim().slice(config.prefix.length).split(/ +/g); // Define os argumentos da mensagem

    const command = args.shift().toLowerCase(); // Define qual parametro da mensagem será comando

    try{
        const commandFile = require(`./commands/${command}.js`); // Busca se a sua aplicação tem esse comando 
        if(!commandFile){
            return; // Caso não tenha, a sua aplicação não retorna nada
        };
        commandFile.run(client, message, args); // Caso tenha, ele executa as definições de cliente, mensagem e argumentos dentro do arquivo de comando
    }catch(err){
        console.error(`[ERRO] Ocorreu um erro ao executar o comando:\n${err}`); // Caso ocorra um erro, ele vai notificar no console sobre o erro
    };
});

client.login(config.token); // Loga sua aplicação com o token no arquivo de configurações