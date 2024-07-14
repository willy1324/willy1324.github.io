import { randomAgent } from "./characterDb";

playerNames = ["Juampa", "Lucía", "Fabri", "Pancho", "Juguito"]
let characters = new randomAgent();

for (let name = 0; name < playerNames.length;name++)
    {
        let roleChoicer = characters.roleList[Math.round(Math.random()*3)];
        let finalCharacter = characters.controller[0];
        
        switch (roleChoicer)
        {
            case "Controlador":
                finalCharacter = characters.controller[Math.floor(Math.random() * characters.controller.length)]
                break;

            case "Iniciador":
                finalCharacter = characters.initiator[Math.floor(Math.random() * characters.initiator.length)]
                break;
            
            case "Centinela":
                finalCharacter = characters.sentinel[Math.floor(Math.random() * characters.sentinel.length)]
                break;

            case "Duelista":
                finalCharacter = characters.duelist[Math.floor(Math.random() * characters.duelist.length)]
                break;
        }

        document.write(`<br>${playerNames[name]} debe usar un ${roleChoicer}, sugiero que sea ${finalCharacter}<br>`)
    }
 

   