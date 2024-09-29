import * as playerDisplay from "./playerDisplay.js";

const playerName = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"]
const randomizerButton = document.getElementById("randomizerButton");

//Mostrara la informacion en pantalla
const mainSection = document.getElementById("mainSection");
const playerContainer = document.createElement("section");
playerContainer.className = "player-container" //para darle estilo
mainSection.prepend(playerContainer);

//Resetea el objeto ya que para impedir la repeticion elimina entradas y tambien resetea el contenedor.
//Luego itera la funcion para volver a mostrar la informacion.
randomizerButton.addEventListener("click", () =>{
    const display = new playerDisplay.Display;
    playerContainer.innerHTML = '';
    for(let player of playerName)
        {
            display.characterAssigner(playerContainer,player);
        }
})
