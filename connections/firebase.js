const firebase = require("firebase"); // Dependência da Firebase para a conecção com o nosso banco de dados

let fire = () => {
    var configF = {
        apiKey: "KEY",
        authDomain: "KEY",
        databaseURL: "KEY",
        projectId: "KEY",
        storageBucket: "KEY",
        messagingSenderId: "KEY",
        appId: "KEY",
        measurementId: "KEY"
      }; // Define o as dados para logor com o seu banco de dados
    
    firebase.initializeApp(configF); // Loga com os dados do banco de dados
    console.log(`[FIREBASE] - Conectado com Sucesso!`); // Envia uma notificação que o seu banco de dados foi logado com sucessp
}; 
    
module.exports = fire; // Exporta a função fire, onde vai realizar todo o processo