window.addEventListener("hashchange", navigator, false);

//------------Navegación----------------------------------------

//Funcíon principal
function navigator() {
  window.scrollTo(0, 0);
  if (location.hash.startsWith("#search")) searchPage();
  else if (location.hash.startsWith("#genre")) genrePage();
  else if (location.hash.startsWith("#category")) categoriesPage();
  else if (location.hash.startsWith("#movie")) movieDetailsPage();
  else homePage();
}

//Configuraciónes de DOM
function showCompleteMovieDetails() {
  movieDetails.classList.remove("inactive");
  previewPage.classList.add("inactive");
  media.classList.remove("media");
  media.classList.add("inactive");
}

function showMediaPage() {
  mediaTitle.classList.remove("inactive");
  movieDetails.classList.add("inactive");
  media.classList.remove("inactive");
  media.classList.add("media");
  previewPage.classList.add("inactive");
}

function showHomePage() {
  previewPage.classList.remove("inactive");
  media.classList.remove("media");
  media.classList.add("inactive");
  movieDetails.classList.add("inactive");
  getMoviesGenres();
  getAllPreviews();
}

//Llamadas al DOM
function homePage() {
  showHomePage();
}

function searchPage() {
  showMediaPage();
  mediaTitle.classList.add("inactive");
  searchMediaTitle.classList.remove("inactive");
  const [_, query] = location.hash.split("=");
  getMovieBySearch(query);
}

function genrePage() {
  showMediaPage();
  searchMediaTitle.classList.add("inactive");
  const [_, genreData] = decodeURIComponent(location.hash).split("=");
  const [genreId, genreName] = genreData.split("-");
  getGenreMovies(genreId, genreName);
}

function categoriesPage() {
  showMediaPage();
  searchMediaTitle.classList.add("inactive");
  const [_, categoryId] = location.hash.split("=");

  switch (categoryId) {
    case "popular":
      getCategorieMovies(endpoints.popular.endpoint, "Popular");
      break;
    case "trending":
      getCategorieMovies(endpoints.trending.endpoint, "Trending");
      break;
    case "upcoming":
      getCategorieMovies(endpoints.upcoming.endpoint, "Proximamente");
      break;
  }
}

function movieDetailsPage() {
  showCompleteMovieDetails();
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}

navigator();
