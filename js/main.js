//import randomAgent from 'js/characterDb.js';

class randomAgent 
{
    constructor()
    {
            this.controller = 
        [
            "Controlador",
            "Brimstone",
            "Astra",
            "Clove",
            "Harbor",
            "Omen",
            "Viper"
        ];

        this.initiator = 
        [
            "Iniciador",
            "Breach",
            "Fade",
            "Gekko",
            "KAY/O",
            "Skye",
            "Sova"
        ];

        this.sentinel = 
        [
            "Centinela",
            "Chamber",
            "Cypher",
            "Deadlock",
            "Killjoy",
            "Sage"
        ];

        this.duelist = 
        [   
            "Duelista", 
            "Iso",
            "Jett",
            "Neon",
            "Phoenix",
            "Raze",
            "Reyna",
            "Yoru"
        ];

        this.juampaPunisher = 
        [
            "Yoru",
            "Astra",
            "Brimstone",
            "Deadlock"
        ];

        this.roleList = 
        [
            this.controller,
            this.initiator,
            this.sentinel,
            this.duelist,
            this.juampaPunisher
        ];
    }
    
    randomRole(roleIndex)
        {
            return this.roleList[roleIndex][0];
        }
             
    randomAgentList(roleIndex,agentIndex)
        {
            return this.roleList[roleIndex][agentIndex];
        }        

}


//---------------------Main-----------------------

names = ["Juampa", "Lucía", "Fabri", "Pancho", "Juguito"]
characters = new randomAgent();

for (let name = 0; name < names.length;name++)
    {
        let roleChoicer = Math.floor(Math.random()*5);
        let randomRole = characters.randomRole(roleChoicer);

        if (roleChoicer === 0 || roleChoicer === 1)
            {
                randomAgent = characters.randomAgentList(roleChoicer,Math.floor(Math.random()*7) + 1)
            }
            
        else if (roleChoicer === 2 )
            {
                randomAgent = characters.randomAgentList(roleChoicer,Math.floor(Math.random()*6) + 1)
    
            }
            
        else if (roleChoicer === 3)
        {
            randomAgent = characters.randomAgentList(roleChoicer,roleChoicer,Math.floor(Math.random()*8) + 1)
        }
    
        else if (roleChoicer === 4)
        {
            randomAgent = characters.randomAgentList(roleChoicer,roleChoicer,Math.floor(Math.random()*4) + 1)
        }
            
        document.write(`<br>${names[name]} debe usar un ${randomRole}, sugiero que sea ${randomAgent}<br>`)
    }
 

   