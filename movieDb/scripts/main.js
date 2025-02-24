//Variables de entorno

api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: MOVIE_DB_KEY,
    language: navigator.language || "es-ES",
  },
});

const endpoints = {
  popular: {
    endpoint: "movie/popular",
    container: "popular",
  },
  trending: {
    endpoint: "trending/movie/day",
    container: "trending",
  },
  upcoming: {
    endpoint: "movie/upcoming",
    container: "upcoming",
  },
  discover: {
    endpoint: "discover/movie",
  },
  search: {
    endpoint: "search/movie",
  },
  movie: {
    endpoint: "movie/",
  },
};

//==================Generos============================
//Desde aqui se utilizan constantes de nodes.js

async function getMoviesGenres() {
  const {
    data: { genres },
  } = await api("genre/movie/list");

  if (genres === undefined) {
    console.log("Datos erroneos o no encontrados:" + genres);
    return;
  }

  createGenres(genres, genreList);
}
//==================Peliculas=========================

//Utilidades
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting === true) {
      const url = entry.target.getAttribute("data-movieImg-url");
      entry.target.setAttribute("src", url);
    }
  });
});

function createGenres(genresData, genresContainer) {
  genresContainer.innerHTML = "";
  genresData.forEach(({ name, id }) => {
    const genreLink = document.createElement("a");
    const genreLabel = document.createElement("label");

    genreLabel.classList.add("genre-label");
    genreLabel.id = id;
    genreLabel.textContent = name;

    genreLink.appendChild(genreLabel);
    genresContainer.appendChild(genreLink);
  });
}

function createMovieList(movieData, movieContainer, hasInfiniteScroll) {
  const moviesArtContainer = document.querySelector(`#${movieContainer} .movies-art-container`);
  if (hasInfiniteScroll) moviesArtContainer.innerHTML = "";

  movieData.forEach((movie) => {
    const movieArticle = document.createElement("article");
    const movieImg = document.createElement("img");
    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = "❤";
    likeBtn.setAttribute("id", "likeBtn");
    movieImg.classList.add("movie-preview");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", "movieDb/style/placeholder.jpg");
    movieImg.setAttribute("data-movie-id", movie.id);
    movieImg.setAttribute(
      "data-movieImg-url",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    if (movie.poster_path !== null) {
      lazyLoader.observe(movieImg);
    }

    likedMoviesList()[movie.id] && likeBtn.classList.add("liked-btn");

    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("liked-btn");
      likeMovies(movie);
      getLikedMovies();
    });

    movieArticle.appendChild(movieImg);
    movieArticle.appendChild(likeBtn);
    moviesArtContainer.appendChild(movieArticle);
  });
}

//Funciónes de peliculas

async function getTopRatedMoviePreview() {
  const {
    data: { results },
  } = await api("movie/top_rated");
  const movie = results[0];

  if (results === undefined) {
    console.log("Datos erroneos o no encontrados:" + results);
    return;
  }

  topMovieInfo.classList.remove("loading-info");
  topMovieImg.setAttribute("src", "movieDb/style/placeholder.jpg");
  if (movie.poster_path !== null) {
    topMovieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path
    );
  }
  topMovieImg.setAttribute("data-movie-id", movie.id);
  topMovieTitle.textContent = movie.title;
  topMovieTitle.setAttribute("data-movie-id", movie.id);
  topMovieInfop.textContent = movie.overview;
  topMovieInfop.setAttribute("data-movie-id", movie.id);
}

function getMovieBySearch(query) {
  return async function () {
    const {
      data: { results, total_pages },
    } = await api(endpoints.search.endpoint, {
      params: { query, page: moviePage },
    });

    console.log(results);
    if (results === undefined) {
      console.log("Datos erroneos o no encontrados:" + results);
      return;
    }
    createMovieList(results, "media", false);
  };
}

async function getMoviesPreview(direction) {
  const {
    data: { results },
  } = await api(direction.endpoint);

  if (results === undefined) {
    console.log("Datos erroneos o no encontrados:" + results);
    return;
  }

  createMovieList(results, direction.container, true);
}

function getGenreMovies(id, title) {
  return async function () {
    const {
      data: { results, total_pages },
    } = await api(endpoints.discover.endpoint, {
      params: { with_genres: id, page: moviePage },
    });
    if (results === undefined) {
      return console.log("Datos erroneos o no encontrados:" + results);
    }
    mediaTitle.classList.remove("loading-info");
    mediaTitle.textContent = title;
    totalPages = total_pages;
    createMovieList(results, "media", false);
  };
}

function getCategorieMovies(endpoint, title) {
  return async function () {
    const {
      data: { results, total_pages },
    } = await api(endpoint, {
      params: { page: moviePage },
    });

    if (results === undefined) {
      console.log("Datos erroneos o no encontrados:" + results);
      return;
    }
    mediaTitle.textContent = title;
    mediaTitle.classList.remove("loading-info");
    totalPages = total_pages;
    createMovieList(results, "media", false);
  };
}

async function getMovieById(id) {
  const { data: movie } = await api(endpoints.movie.endpoint + id);
  movieDetailsInfo.classList.remove("loading-info");
  movieDetailsTitle.textContent = movie.title;
  movieDetailsImg.setAttribute("src", "movieDb/style/placeholder.jpg");
  if (movie.poster_path !== null) {
    movieDetailsImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path
    );
  }
  movieDetailsInfoP.textContent = movie.overview;
  [movieYear, movieMonth, movieDay] = movie.release_date.split("-");
  movieReleaseDate.textContent = `Fecha de lanzamiento : ${movieDay} - ${movieMonth} - ${movieYear}`;
  movieScore.textContent = "Puntuación : " + movie.vote_average;

  createGenres(movie.genres, movieGenres);
  getRecommendedMovies(id);
}

async function getRecommendedMovies(id) {
  const {
    data: { results },
  } = await api(endpoints.movie.endpoint + id + "/recommendations");

  createMovieList(results, "recommendedMovies", true);
}

function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem("likedMovies"));
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }

  return movies;
}

function likeMovies(movie) {
  const likedMovies = likedMoviesList();
  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
    console.log("Quitando de favoritos");
  } else {
    likedMovies[movie.id] = movie;
    console.log("Agregando a favoritos");
  }
  console.log(likedMovies);
  localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
}

function getLikedMovies() {
  const likedMovies = Object.values(likedMoviesList());
  console.log(likedMovies);
  favoritesArtContainer.innerHTML = "";
  createMovieList(likedMovies, "favorites", false);
}

//Llamadas
function getAllPreviews() {
  getMoviesPreview(endpoints.popular);
  getMoviesPreview(endpoints.trending);
  getMoviesPreview(endpoints.upcoming);
  getTopRatedMoviePreview();
}
