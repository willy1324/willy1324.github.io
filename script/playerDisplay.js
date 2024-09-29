export class Display
{

    constructor()
    {

        this.controller = 
        [
            "Brimstone",
            "Astra",
            "Clove",
            "Harbor",
            "Omen",
            "Viper"
        ];

        this.initiator = 
        [
            "Breach",
            "Fade",
            "Gekko",
            "KAY/O",
            "Skye",
            "Sova"
        ];

        this.sentinel = 
        [
            "Chamber",
            "Cypher",
            "Deadlock",
            "Killjoy",
            "Sage",
            "Vyse"
        ];

        this.duelist = 
        [   
            "Iso",
            "Jett",
            "Neon",
            "Phoenix",
            "Raze",
            "Reyna",
            "Yoru"
        ];

        this.roleList = 
        [
            "Controlador",
            "Iniciador",
            "Centinela",
            "Duelista",

        ];
    }

    //Metodo de seleccion de personajes
    characterAssigner(playerContainer,playerName)
    {
        //Declaración y seleccion del rol dentro de la lista de roles.
        let randomRole = this.roleList[Math.round(Math.random()*3)];
        let randomCharacter = this.controller[0];
        let randomNum;

        //generara un numero aleatorio dependiendo del largo de la lista de personajes actual, elegira un personaje de la lista
        // y luego lo borrara para evitar duplicados.
        switch (randomRole)
        {
            case "Controlador":
                randomNum = Math.floor(Math.random() * this.controller.length);
                randomCharacter = this.controller[randomNum];
                this.controller.splice(randomNum,1)
            break;

            case "Iniciador":
                randomNum = Math.floor(Math.random() * this.initiator.length);
                randomCharacter = this.initiator[Math.floor(randomNum)]
                this.initiator.splice(randomNum,1)
            break;
        
            case "Centinela":
                randomNum = Math.floor(Math.random() * this.sentinel.length);
                randomCharacter = this.sentinel[Math.floor(randomNum)]
                this.sentinel.splice(randomNum,1)
            break;

            case "Duelista":
                randomNum = Math.floor(Math.random() * this.duelist.length);
                randomCharacter = this.duelist[Math.floor(randomNum)]
                this.duelist.splice(randomNum,1)
            break;
        }

        //Mostrara la informacion en pantalla
        this.showDisplay(playerContainer,playerName,randomRole,randomCharacter);
        return console.log(randomCharacter);
    }

    //Mostrador de informacion
    showDisplay(playerContainer,playerName,randomRole,randomCharacter)
    {
    
        //Creando contenedores
        const playerInfo = document.createElement("div");
        playerInfo.className = "player-info";

        //Creando Informacion
        //Nombre del jugador
        const playerTitle = document.createElement("h2");
        playerTitle.className = "player-name";
        playerTitle.textContent = playerName;
        playerInfo.append(playerTitle);

        //Rol Seleccionado
        const roleTitle = document.createElement("h2");
        roleTitle.className = "role-name";
        roleTitle.textContent = randomRole;
        playerInfo.append(roleTitle);

        //Agente Seleccionado
        const agentTitle = document.createElement("h2");
        agentTitle.className = "agent-title";
        agentTitle.textContent = randomCharacter;
        playerInfo.append(agentTitle);

        //Imagen Agente
        const agentPortrait = document.createElement("img");
        agentPortrait.alt = "Agent Portrait";
        agentPortrait.src = "https://paimon.moe/images/characters/full/keqing.png";
        playerInfo.append(agentPortrait);

        playerContainer.append(playerInfo);
    }
}
