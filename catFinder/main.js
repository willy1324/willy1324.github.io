/*HTTP status codes
1XX Respuestas Afirmativas
2XX Respuestas satisfactorias
3XX Re-direcciones
4XX Error del cliente
5XX Error de servidor
?inicio de query parameter
&query parameter distinto
*/
const RANDOM_API_URL =
  "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_SbEVszaWyywfxyrUZaktfdNkNCinVQObHxC3ToRHzR1usnEtpMEwiWqL78w1BVyY"; //Endpoints

function getFavouriteURL(endpoint) {
  if (endpoint === undefined) {
    return `https://api.thecatapi.com/v1/favourites?api_key=live_SbEVszaWyywfxyrUZaktfdNkNCinVQObHxC3ToRHzR1usnEtpMEwiWqL78w1BVyY`;
  } else {
    return `https://api.thecatapi.com/v1/favourites/${endpoint}?api_key=live_SbEVszaWyywfxyrUZaktfdNkNCinVQObHxC3ToRHzR1usnEtpMEwiWqL78w1BVyY`;
  }
}

const loadRandomMishisBtn = document.getElementById("loadRandomMishisBtn");
const favouritesMichis = document.getElementById("favouritesMichis");
const randomMichis = document.getElementById("randomMichis");
const favouriteMichis = document.getElementById("favouritesMichis");
//===================== Llamadas a la API ========================

async function loadRandomMichis() {
  const res = await fetch(RANDOM_API_URL);
  const data = await res.json();
  console.log("random");
  console.log(data);

  if (res.status !== 200) {
    console.log(res.status);
    alert("Se lo comio un perro :c :" + res.status + data.message);
  } else {
    img1 = document.getElementById("img1");
    img1.setAttribute("data-image-id", data[0].id);
    img2 = document.getElementById("img2");
    img1.src = data[0].url;
    img2.setAttribute("data-image-id", data[1].id);
    img2.src = data[1].url;
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(getFavouriteURL());
  const data = await res.json();

  favouriteMichis.innerHTML = "";
  if (res.status !== 200) {
    alert("Se lo comio un perro :c :" + res.status + data.message);
  } else {
    console.log("favourites");
    console.log(data);
    data.forEach((michi) => {
      favouriteMichis.append(favouriteArticle(michi));
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(getFavouriteURL(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_id: id }),
  });
  const data = res.json();
  if (res.status !== 200) {
    alert("Se lo comio un perro :c :" + res.status + data.message);
  }
  console.log("save");
  console.log(data);
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(getFavouriteURL(id), {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.status !== 200) {
    alert("Se lo comio un perro :c :" + res.status + data.message);
  }
  console.log("deleted" + data.image_id);
  //console.log(data);
}

//========================Creación de articulos===================

function defaultFavorite() {
  const article = document.createElement("article");
  const image = document.createElement("img");
  image.src = "./background/default-article-background.png";
  image.alt = "Foto gatito aleatorio";
  article.append(image);
  return article;
}

function favouriteArticle(data) {
  const article = document.createElement("article");
  const image = document.createElement("img");
  const button = document.createElement("button");

  image.src = data.image.url;
  image.alt = "Foto gatito aleatorio";
  image.setAttribute("data-image-id", data.id);

  button.textContent = "Quitar de favoritos";
  button.classList.add("option-btn");
  button.setAttribute("id", "saveFavouriteBtn");

  article.append(image);
  article.append(button);

  return article;
}

//=================Llamadas a funciónes==============================
//Recargar gatos
loadRandomMishisBtn.addEventListener("click", () => {
  loadRandomMichis();
});

//Guardar gato
randomMichis.addEventListener("click", async (event) => {
  if (event.target.classList.contains("option-btn")) {
    const targetArticle = event.target.parentElement;
    const id = targetArticle.children[0].getAttribute("data-image-id");
    console.log(targetArticle.children[0].getAttribute("data-image-id"));

    await saveFavouriteMichi(id);
    await loadFavouriteMichis();
  }
});

//Borrar gato
favouriteMichis.addEventListener("click", async (event) => {
  if (event.target.classList.contains("option-btn")) {
    const targetArticle = event.target.parentElement;
    const id = targetArticle.children[0].getAttribute("data-image-id");
    console.log(targetArticle.children[0].getAttribute("data-image-id"));

    await deleteFavouriteMichi(
      targetArticle.children[0].getAttribute("data-image-id")
    );
    await loadFavouriteMichis();
  }
});

loadRandomMichis();
loadFavouriteMichis();
