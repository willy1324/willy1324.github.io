class randomAgent 
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
            "Sage"
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

}

playerNames = ["Juampa", "Lucía", "Fabri", "Pancho", "Juguito"]
let characters = new randomAgent();

agentGenerator();

function agentGenerator()
{
        //Bucle de asignacion de personajes
    for (let name = 0; name < playerNames.length;name++)
        {
            //Declaración y seleccion del rol dentro de la lista de roles.
            let roleChoicer = characters.roleList[Math.round(Math.random()*3)];
            let finalCharacter = characters.controller[0];
            let randomNum;
            let infoOutput = document.getElementById("pInfoOutput");

            //generara un numero aleatorio dependiendo del largo de la lista de personajes actual, elegira un personaje de la lista
            // y luego lo borrara para evitar duplicados.
            switch (roleChoicer)
            {
                case "Controlador":
                    randomNum = Math.floor(Math.random() * characters.controller.length);
                    finalCharacter = characters.controller[randomNum];
                    characters.controller.splice(randomNum,1)
                    break;

                case "Iniciador":
                    randomNum = Math.floor(Math.random() * characters.initiator.length);
                    finalCharacter = characters.initiator[Math.floor(randomNum)]
                    characters.initiator.splice(randomNum,1)
                    break;
                
                case "Centinela":
                    randomNum = Math.floor(Math.random() * characters.sentinel.length);
                    finalCharacter = characters.sentinel[Math.floor(randomNum)]
                    characters.sentinel.splice(randomNum,1)
                    break;

                case "Duelista":
                    randomNum = Math.floor(Math.random() * characters.duelist.length);
                    finalCharacter = characters.duelist[Math.floor(randomNum)]
                    characters.duelist.splice(randomNum,1)
                    break;
            }
            
            //Mostrara la informacion en pantalla
            infoOutput.innerHTML += `<br>${playerNames[name]} debe usar un ${roleChoicer}, sugiero que sea ${finalCharacter}<br>`;
        }
}




   