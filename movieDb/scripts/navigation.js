//---variables de navegacion
let moviePage = 1;
let isInfiniteScrollOn = false;
let infiniteScroll;
let totalPages = 0;
//------------Navegación----------------------------------------

window.addEventListener("hashchange", navigator, false);

//Funcíon principal
function navigator() {
  moviePage = 1;
  resetMoviePages();
  mediaArtContainer.innerHTML = "";
  window.scrollTo(0, 0);
  if (location.hash.startsWith("#search")) searchPage();
  else if (location.hash.startsWith("#genre")) genrePage();
  else if (location.hash.startsWith("#category")) categoriesPage();
  else if (location.hash.startsWith("#movie")) movieDetailsPage();
  else homePage();
}

//Infinite Scroll
window.addEventListener("scroll", () => {
  if (infiniteScroll && isInfiniteScrollOn && moviePage <= totalPages) {
    infiniteScrollController();
  }
});

function infiniteScrollController() {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let scrollClient = document.documentElement.clientHeight;

  if (scrollTop + scrollClient >= scrollHeight - 50) {
    moviePage++;
    infiniteScroll();
  }
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
  getLikedMovies();
}

//Llamadas al DOM
function homePage() {
  defaultCategories();
  topMovieDefault();
  createDefaultArticles(articleQuantity, previewCategories.popular);
  createDefaultArticles(articleQuantity, previewCategories.trending);
  createDefaultArticles(articleQuantity, previewCategories.upcoming);
  showHomePage();
  isInfiniteScrollOn = false;
}

function searchPage() {
  showMediaPage();
  getMoviesGenres();
  moviePage = 1;
  mediaArtContainer.innerHTML = "";
  mediaTitle.classList.add("inactive");
  searchMediaTitle.classList.remove("inactive");
  //moreMovies.classList.add("inactive");
  const [_, query] = location.hash.split("=");
  getMovieBySearch(query)();
  isInfiniteScrollOn = true;
  infiniteScroll = getMovieBySearch(query);
}

function genrePage() {
  showMediaPage();
  getMoviesGenres();
  moviePage = 1;
  mediaArtContainer.innerHTML = "";
  searchMediaTitle.classList.add("inactive");
  //moreMovies.classList.remove("inactive");
  const [_, genreData] = decodeURIComponent(location.hash).split("=");
  const [genreId, genreName] = genreData.split("-");
  getGenreMovies(genreId, genreName)();
  isInfiniteScrollOn = true;
  infiniteScroll = getGenreMovies(genreId, genreName);

  /*moreMovies.addEventListener("click", () => {
    moviePage++;
    getGenreMovies(genreId, genreName, moviePage);
  });*/
}

function categoriesPage() {
  showMediaPage();
  searchMediaTitle.classList.add("inactive");
  const [_, categoryId] = location.hash.split("=");
  moviePage = 1;
  let actualEndpoint;
  let actualTitle;

  //Arreglar mas adelante
  switch (categoryId) {
    case "popular":
      getCategorieMovies(endpoints.popular.endpoint, "Popular")();
      actualEndpoint = endpoints.popular.endpoint;
      actualTitle = "Popular";
      break;
    case "trending":
      getCategorieMovies(endpoints.trending.endpoint, "Trending")();
      actualEndpoint = endpoints.trending.endpoint;
      actualTitle = "Trending";
      break;
    case "upcoming":
      getCategorieMovies(endpoints.upcoming.endpoint, "Proximamente")();
      actualEndpoint = endpoints.upcoming.endpoint;
      actualTitle = "Proximamente";
      break;
  }
  isInfiniteScrollOn = true;
  infiniteScroll = getCategorieMovies(actualEndpoint, actualTitle);
  /*moreMovies.addEventListener("click", () => {
    moviePage++;
    getCategorieMovies(actualEndpoint, actualTitle, moviePage);
  });*/
}

function movieDetailsPage() {
  getMoviesGenres();
  showCompleteMovieDetails();
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
  isInfiniteScrollOn = false;
}

navigator();
