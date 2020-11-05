# :file_folder: **INFORMAÇÕES DE COMANDOS:**
---
Essa pasta é para armazenar os comandos do seu projeto, veja como é feito exemplo de exportação de comando.

#### :computer: ARQUITETURA DE CÓDIGO: 

Construção de Comandos:
```javascript
const Discord = require("discord.js"); // Dependência da Discord.js
const firebase = require("firebase"); // Dependência da Firebase
const database = firebase.database(); // Definição do banco de dados

module.exports.run = async (client, message, args) => {
  //Código
}
```

