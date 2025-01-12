//-------------Botones Funcionalidad------------------------------------
//=======Funciones Botones

function callPage(event) {
  if (event.target.classList.contains("sub-title")) {
    location.hash = "#home";
  } else if (event.target.classList.contains("back-btn")) {
    history.back();
  } else if (event.target.classList.contains("search-btn")) {
    location.hash = `#search=` + searchInput.value;
    searchMediaTitle.textContent = "Busqueda : " + searchInput.value;
  } else if (event.target.classList.contains("genre-label")) {
    location.hash = `#genre=${event.target.id}-${event.target.textContent}`;
  } else if (event.target.classList.contains("category-title")) {
    console.log(event.target.textContent);
    location.hash = "#category=" + event.target.parentElement.id;
  } else if (event.target.classList.contains("movie-preview")) {
    console.log(event.target.textContent);
    location.hash = "#movie=" + event.target.getAttribute("data-movie-id");
  }
}

//=======Llamados a Botones

//Generos
document.body.addEventListener("click", (event) => callPage(event));
