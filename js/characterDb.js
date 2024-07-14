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
        (
            controller,
            initiator,
            sentinel,
            duelist,
            juampaPunisher
        );
    }
    
    randomRole(roleIndex)
        {
            return roleList[roleIndex][0];
        }
             
    randomAgentList(self,roleIndex,agentIndex)
        {
            return roleList[roleIndex][agentIndex];
        }        

}

        