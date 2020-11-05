# :bar_chart: **CONECÇÃO COM O FIREBASE:**
---
Esse arquivo é para exportação de login com o Banco de Dados, a palavra **Key**, são as informações da sua chave de conecção com seu projeto do seu banco de dados do **Firebase**.

#### :computer: ARQUITETURA DE CÓDIGO: 

Construção da Conecção:
```javascript
const firebase = require("firebase");

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
      }; 
    
    firebase.initializeApp(configF);
};
    
module.exports = fire;
```

