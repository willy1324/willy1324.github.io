const $ = (id) => {
  return document.querySelector(id);
};
//Aside
const searchInput = $("#searchInput");
const searchBtn = $("#seachBtn");
const genreList = $("#genreList");

//Movies section
const homeBtn = $(".home-btn");
const movies = $("#movies");
//Genre section
const media = $("#media");
const mediaTitle = $("#mediaTitle");
const searchMediaTitle = $("#searchMediaTitle");
const mediaArtContainer = $("#media .movies-art-container");
const moreMovies = $("#moreMovies");
const backToHomeBtn = $("#backToHomeBtn");
const backToTopBtn = $("#backToTopBtn");
//Selected Movie section
//Preview Section
const previewPage = $("#previewPage");
//Favorites
const favorites = $("#favorites");
const favoritesArtContainer = $("#favorites .movies-art-container");
//Top Movie
const topMovie = $("#topMovie");
const topMovieImg = $("#topMovieImg");
const topMovieInfo = $("#topMovieInfo");
const topMovieTitle = $("#topMovieInfo h2");
const topMovieInfop = $("#topMovieInfo p");
//Movie categories
previewCategories = {
  popular: $("#popular"),
  trending: $("#trending"),
  upcoming: $("#upcoming"),
};
//Selected Movie section
movieDetails = $("#movieDetails");
movieDetailsImg = $("#movieDetailsImg");
movieDetailsInfo = $("#movieDetailsInfo");
movieDetailsTitle = $("#movieDetailsInfo h2");
movieDetailsInfoP = $("#movieDetailsInfo p");
movieReleaseDate = $("#movieReleaseDate");
movieScore = $("#movieScore");
movieGenres = $("#movieGenres");
recommendedMovies = $("#recommendedMovies");
