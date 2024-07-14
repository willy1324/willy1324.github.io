import "characerDb.randomAgent"

names = ["Juampa", "Lucía", "Fabri", "Pancho", "Juguito"]
characters = randomAgent();


names.array.forEach(element =>
    {
        roleChoicer = Math.floor(Math.random()*5);
        randomRole = characters.randomRole(roleChoicer);

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
            randomAgent = characters.randomAgentList(roleChoicer,random.roleChoicer,Math.floor(Math.random()*4) + 1)
        }
            
        document.write("- {name} debe usar un {randomRole}, sugiero que sea {randomAgent}")
    }

)
   