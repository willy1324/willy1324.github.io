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
    this.lastPokemon = 0;
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
    this.evolutions = document.getElementById("evolutions");
    this.moves = document.getElementById("moves");
  }

  getURL(endpoint) {
    let url = `https://pokeapi.co/api/v2/${endpoint}`;
    return (url = `https://pokeapi.co/api/v2/${endpoint}`);
  }

  //Ya es una promesa
  async getPokemon(pokemon) {
    try {
      //Await indica que espera a la promesa resuelta
      let response = await fetch(this.getURL(`pokemon/${pokemon}`));
      let data = await response.json();
      console.log(data);

      this.lastPokemon = data.id;
      this.getMainInfo(data);
      this.getStats(data);
      this.getMovements(pokemon);
      return data;
    } catch (error) {
      alert("Pokémon incorrecto");
      return console.log(error);
    }
  }

  getMainInfo(data) {
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
  }

  async getEvolution(pokemon) {
    const response = await fetch(this.getURL(`evolution-chain/${pokemon}`));
    let data = await response.json();
    this.processEvolution(data);
  }

  processEvolution(pokemonData) {
    function findEvolutions(evolution) {
      for (let evo of evolution.evolves_to) {
        console.log(evo.species.name);
      }
    }

    for (let evolution of pokemonData.chain.evolves_to) {
      console.log(evolution.species.name);
      findEvolutions(evolution);
    }
  }

  getStats(data) {
    this.hp.textContent = "HP : " + data.stats[0].base_stat;
    this.atk.textContent = "Attack : " + data.stats[1].base_stat;
    this.def.textContent = "Defense : " + data.stats[2].base_stat;
    this.spAtk.textContent = "Special Attack : " + data.stats[3].base_stat;
    this.spDef.textContent = "Special Defense : " + data.stats[4].base_stat;
    this.speed.textContent = "Speed : " + data.stats[5].base_stat;
  }

  async getMovements(pokemon) {
    this.moves.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = "Move list";
    this.moves.append(title);

    let response = await fetch(this.getURL(`pokemon/${pokemon}`));
    let data = await response.json();

    if (response.status !== 200) {
      alert("Consulta erronea");
    } else {
      const moveList = document.createElement("ul");
      moveList.classList.add("moves");

      for (let element of data.moves) {
        const addMove = document.createElement("li");
        addMove.textContent = element.move.name;
        moveList.append(addMove);
      }
      this.moves.append(moveList);
    }
  }

  async getAllPokemons(pokemonList) {
    let response = await fetch(this.getURL("pokedex/national"));
    let data = await response.json();

    for (let pokemon of data.pokemon_entries) {
      const addPokemon = document.createElement("option");
      addPokemon.classList.add("pokemon-entry");
      addPokemon.textContent = pokemon.entry_number;
      pokemonList.append(addPokemon);
    }
  }
}

const inputPokemon = document.querySelector("#inputPokemon");
const findPokemonBtn = document.querySelector("#findPokemonBtn");
const pokemonList = document.querySelector("#pokemonList");

const pokemonDex = new Pokemon();
pokemonDex.getPokemon("bulbasaur");
pokemonDex.getAllPokemons(pokemonList);

findPokemonBtn.addEventListener("click", () => {
  pokemonDex.getPokemon(inputPokemon.value.toLowerCase());
  pokemonList.value = pokemonDex.lastPokemon;
});

pokemonList.addEventListener("change", async (event) => {
  pokemonData = await pokemonDex.getPokemon(event.target.value);
  inputPokemon.value = capitalizeFirstLetter(pokemonData.name);
});
