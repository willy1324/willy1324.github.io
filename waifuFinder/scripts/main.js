let typeSelector = document.getElementById("typeSelector");
let waifuCategory = document.getElementById("waifuCategory");
let waifuCategoryChoice = document.getElementById("waifuCategoryChoice");
let getWaifuBtn = document.getElementById("getWaifuBtn");

const sfw = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle"];
const nsfw = ["waifu", "neko", "trap", "blowjob"];

function urlGenerator(type, category) {
  return (url = `https://api.waifu.pics/${type}/${category}`);
}

function imageCategory(type, category) {
  type.forEach((element) => {
    let listOption = document.createElement("option");
    listOption.textContent = element;
    category.append(listOption);
  });
}

async function getWaifu(type, categoryChoice) {
  try {
    let response = await fetch(urlGenerator(type, categoryChoice));
    let data = await response.json();
    console.log(data);
    document.querySelector("img").src = data.url;
  } catch (error) {
    console.log(error);
  }
}

typeSelector.addEventListener("change", () => {
  waifuCategory.innerHTML = "";
  if (typeSelector.value === "SFW") {
    imageCategory(sfw, waifuCategory);
  } else {
    imageCategory(nsfw, waifuCategory);
  }
});

getWaifuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (waifuCategoryChoice.value === "") {
    waifuCategoryChoice.value = "waifu";
  }
  getWaifu(typeSelector.value, waifuCategoryChoice.value);
});

getWaifu("sfw", "waifu");
