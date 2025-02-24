let articleQuantity = 20;

function defaultCategories() {
  genreList.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    defaultLabel = document.createElement("label");
    defaultLabel.classList.add("genre-label");
    defaultLabel.classList.add("loading-info");
    defaultLabel.textContent = "\u2B24\u2B24\u2B24\u2B24";
    genreList.appendChild(defaultLabel);
  }
}

function topMovieDefault() {
  topMovieInfo.classList.add("loading-info");
  topMovieTitle.textContent =
    "\u2B24\u2B24\u2B24\u2B24 \u2B24\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24";

  for (let i = 0; i < articleQuantity; i++) {
    topMovieInfop.textContent += "\u2B24";
  }
}

function defaultMediaPage() {
  mediaTitle.classList.add("loading-info");
  mediaTitle.textContent = "\u2B24\u2B24\u2B24\u2B24";
}

function createDefaultArticles(quantity, previewCategory) {
  for (let i = 0; i < quantity; i++) {
    const category = previewCategory.querySelector(".movies-art-container");
    const article = document.createElement("article");
    article.classList.add("default-preview-movie");
    article.classList.add("loading-info");

    category.appendChild(article);
  }
}

function defaultMovie() {
  movieDetailsInfo.classList.add("loading-info");
  movieDetailsImg.src = "";
  movieDetailsTitle.textContent = "\u2B24\u2B24\u2B24\u2B24";
  movieDetailsInfoP.textContent = "";

  for (let i = 0; i < 40; i++) {
    movieDetailsInfoP.textContent += "\u2B24";
  }
  movieReleaseDate.textContent = "\u2B24\u2B24\u2B24\u2B24";
  movieScore.textContent = "\u2B24\u2B24";
  movieReleaseDate.textContent = "\u2B24\u2B24\u2B24\u2B24";

  movieGenres.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    defaultLabel = document.createElement("label");
    defaultLabel.classList.add("genre-label");
    defaultLabel.textContent = "\u2B24\u2B24\u2B24\u2B24";
    movieGenres.appendChild(defaultLabel);
  }
}

function resetMoviePages() {
  defaultMediaPage();
  defaultMovie();
}
