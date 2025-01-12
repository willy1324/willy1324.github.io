api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: MOVIE_DB_KEY,
    language: "es",
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

function createMovieList(movieData, movieContainer) {
  const moviesArtContainer = document.querySelector(`#${movieContainer} .movies-art-container`);
  moviesArtContainer.innerHTML = "";

  movieData.forEach((movie) => {
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-preview");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);
    movieImg.setAttribute("data-movie-id", movie.id);
    moviesArtContainer.appendChild(movieImg);
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

  topMovieImg.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path
  );
  topMovieImg.setAttribute("data-movie-id", movie.id);
  topMovieTitle.textContent = movie.title;
  topMovieTitle.setAttribute("data-movie-id", movie.id);
  topMovieInfop.textContent = movie.overview;
  topMovieInfop.setAttribute("data-movie-id", movie.id);
}

async function getMovieBySearch(query) {
  const {
    data: { results },
  } = await api(endpoints.search.endpoint, {
    params: { query },
  });

  if (results === undefined) {
    console.log("Datos erroneos o no encontrados:" + results);
    return;
  }

  createMovieList(results, "media");
}

async function getMoviesPreview(direction) {
  const {
    data: { results },
  } = await api(direction.endpoint);

  if (results === undefined) {
    console.log("Datos erroneos o no encontrados:" + results);
    return;
  }

  createMovieList(results, direction.container);
}

async function getGenreMovies(id, title) {
  const {
    data: { results },
  } = await api(endpoints.discover.endpoint, {
    params: { with_genres: id },
  });

  if (results === undefined) {
    console.log("Datos erroneos o no encontrados:" + results);
    return;
  }
  mediaTitle.textContent = title;
  createMovieList(results, "media");
}

async function getCategorieMovies(endpoint, title) {
  const {
    data: { results },
  } = await api(endpoint);

  if (results === undefined) {
    console.log("Datos erroneos o no encontrados:" + results);
    return;
  }
  mediaTitle.textContent = title;
  createMovieList(results, "media");
}

async function getMovieById(id) {
  const { data: movie } = await api(endpoints.movie.endpoint + id);
  movieDetailsTitle.textContent = movie.title;
  movieDetailsImg.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path
  );
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

  createMovieList(results, "recommendedMovies");
}

//Llamadas
function getAllPreviews() {
  getMoviesPreview(endpoints.popular);
  getMoviesPreview(endpoints.trending);
  getMoviesPreview(endpoints.upcoming);
  getTopRatedMoviePreview();
}
