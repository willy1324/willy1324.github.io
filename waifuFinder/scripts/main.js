const sfw = [
  "waifu",
  "neko",
  "shinobu",
  "megumin",
  "bully",
  "cuddle",
  "cry",
  "hug",
  "awoo",
  "kiss",
  "lick",
  "pat",
  "smug",
  "bonk",
  "yeet",
  "blush",
  "smile",
  "wave",
  "highfive",
  "handhold",
  "nom",
  "bite",
  "glomp",
  "slap",
  "kill",
  "kick",
  "happy",
  "wink",
  "poke",
  "dance",
  "cringe",
];
const nsfw = ["waifu", "neko", "blowjob", "trap"];

let nsfwMode = false;
const defaultCategory = "waifu";
let actualCategory = defaultCategory;
let imgQuantity = 6;

const imgContainer = document.getElementById("imgContainer");
const waifuMode = document.getElementById("waifuMode");
const waifuCategories = document.getElementById("waifuCategories");
const reloadBtn = document.getElementById("reloadBtn");

function urlGenerator(type, category) {
  return (url = `https://api.waifu.pics/${type}/${category}`);
}

async function waifuGetter(type, category) {
  const response = await fetch(urlGenerator(type, category));
  const data = await response.json();

  if (response.status !== 200) {
    const errorMsg = (document.createElement("p").textContent =
      "Error al cargar las imagenes \nERROR:" + response.status);
    errorMsg.style.color = "red";
    imgContainer.append(errorMsg);
  } else {
    const waifuImg = document.createElement("img");
    waifuImg.src = data.url;
    waifuImg.alt = type + " " + category;
    imgContainer.append(waifuImg);
  }
}

//Creacíon de articulos de categorias

function createCategories(categoriesList) {
  categoriesList.forEach((category) => {
    let newCategory = document.createElement("label");
    newCategory.textContent = category;
    newCategory.classList.add("waifu-category");
    waifuCategories.append(newCategory);
  });
}

function showWaifu(mode, category, imgQuantity) {
  waifuCategories.innerHTML = "";
  if (mode) {
    createCategories(nsfw, imgQuantity);
    for (let i = 0; i < imgQuantity; i++) {
      waifuGetter("nsfw", category);
    }
  } else {
    createCategories(sfw, imgQuantity);
    for (let i = 0; i < imgQuantity; i++) {
      waifuGetter("sfw", category);
    }
  }
}

//Llamadas a funciones

waifuMode.addEventListener("click", () => {
  actualCategory = defaultCategory;
  if (!nsfwMode) {
    nsfwMode = true;
    waifuMode.textContent = "Modo NSFW";
    console.log("NSFW Photos " + nsfwMode);
  } else {
    nsfwMode = false;
    waifuMode.textContent = "Modo SFW";
    console.log("NSFW Photos " + nsfwMode);
  }
  imgContainer.innerHTML = "";
  showWaifu(nsfwMode, defaultCategory, imgQuantity);
});

waifuCategories.addEventListener("click", (event) => {
  if (event.target.classList.contains("waifu-category")) {
    const category = event.target.textContent;
    console.log(category);
    actualCategory = category;

    imgContainer.innerHTML = "";
    showWaifu(nsfwMode, category, imgQuantity);
  }
});

reloadBtn.addEventListener("click", () => {
  imgContainer.innerHTML = "";
  showWaifu(nsfwMode, actualCategory, imgQuantity);
});

showWaifu(nsfwMode, defaultCategory, imgQuantity);
