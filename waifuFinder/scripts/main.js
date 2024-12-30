const sfw = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "pat"];
const nsfw = ["waifu", "neko", "trap", "blowjob"];

let nsfwMode = false;

const imgContainer = document.getElementById("imgContainer");
const waifuMode = document.getElementById("waifuMode");

function urlGenerator(type, category) {
  return (url = `https://api.waifu.pics/${type}/${category}`);
}

async function waifuGetter(type, category) {
  const response = await fetch(urlGenerator(type, category));
  const data = await response.json();
  console.log(data);

  const waifuImg = document.createElement("img");
  waifuImg.src = data.url;
  waifuImg.alt = type + " " + category;
  imgContainer.appendChild(waifuImg);
}

function showWaifu(mode) {
  if (mode) {
    nsfw.forEach((category) => {
      waifuGetter("nsfw", category);
    });
  } else {
    sfw.forEach((category) => {
      waifuGetter("sfw", category);
    });
  }
}

showWaifu(nsfwMode);

waifuMode.addEventListener("click", () => {
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
  showWaifu(nsfwMode);
});
