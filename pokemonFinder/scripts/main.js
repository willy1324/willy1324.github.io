/*function fetchData()
{
    //Llama a la webapi
    fetch("https://pokeapi.co/api/v2/pokemon/gengar")
        //Llama a la respuesta y lo pone en un json
        .then((response) => response.json
        ())
        //Muestra los datos en consola
        .then((data) => console.log(data))
        //Captura los posibles errores y los pone en consola
        .catch((error)=> console.log(error));

}*/
function capitalizeFirstLetter(string) {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

class Pokemon {
  constructor() {
    this.name = document.getElementById("pokemonName");
    this.pokedexNumber = document.getElementById("pokedexNumber");
    this.sprite = document.getElementById("pokemonSprite");
    this.type = document.getElementById("pokemonType");
    this.ability = document.getElementById("ability");
    this.hp = document.getElementById("hpStat");
    this.atk = document.getElementById("atkStat");
    this.def = document.getElementById("defStat");
    this.spAtk = document.getElementById("spAtkStat");
    this.spDef = document.getElementById("spDefStat");
    this.speed = document.getElementById("speedStat");
  }

  //Ya es una promesa
  async fetchData(pokemon) {
    try {
      //Await indica que espera a la promesa resuelta
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      let data = await response.json();
      console.log(data);

      this.name.textContent = capitalizeFirstLetter(data.name);
      this.sprite.src = data.sprites.front_default;
      this.pokedexNumber.textContent = "Pokedex ID : " + data.id;

      this.type.textContent = "";
      for (let types of data.types) {
        this.type.textContent += capitalizeFirstLetter(types.type.name) + " ";
      }

      this.ability.textContent = "";
      for (let abilities of data.abilities) {
        this.ability.textContent +=
          capitalizeFirstLetter(abilities.ability.name) + " ";
      }

      this.hp.textContent = "HP : " + data.stats[0].base_stat;
      this.atk.textContent = "Attack : " + data.stats[1].base_stat;
      this.def.textContent = "Defense : " + data.stats[2].base_stat;
      this.spAtk.textContent = "Special Attack : " + data.stats[3].base_stat;
      this.spDef.textContent = "Special Defense : " + data.stats[4].base_stat;
      this.speed.textContent = "Speed : " + data.stats[5].base_stat;
    } catch (error) {
      console.log(error);
      alert("Pokémon incorrecto");
    }
  }
}

let inputPokemon = document.querySelector("#inputPokemon");
let findPokemonBtn = document.querySelector("#findPokemonBtn");

const pokemonDex = new Pokemon();
pokemonDex.fetchData("bulbasaur");

findPokemonBtn.addEventListener("click", () => {
  pokemonDex.fetchData(inputPokemon.value.toLowerCase());
});
