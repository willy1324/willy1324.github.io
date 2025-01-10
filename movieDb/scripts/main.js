axiosApi = axios.create({ baseURL: "https://api.themoviedb.org/3/" });

async function getTrendingMoviesPreview() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + MOVIE_DB_KEY
  );
  const data = await response.json();
  const movies = data.results;

  movies.forEach((movie) => {});
}
