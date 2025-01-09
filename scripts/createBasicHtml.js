const head = document.querySelector("head");
const body = document.querySelector("body");
let header = document.querySelector("header");
let footer = document.querySelector("footer");
let titles = document.querySelector(".titles");

function createHead() {
  const linkFontsgApis = document.createElement("link");
  linkFontsgApis.href = "https://fonts.googleapis.com";
  linkFontsgApis.rel = "preconnect";

  const linkFontsgStatic = document.createElement("link");
  linkFontsgStatic.href = "https://fonts.gstatic.com";
  linkFontsgStatic.rel = "preconnect";
  linkFontsgStatic.crossOrigin = "";

  const linkFontsgFamily = document.createElement("link");
  linkFontsgFamily.rel = "stylesheet";
  linkFontsgFamily.href =
    "https://fonts.googleapis.com/css2?family=Audiowide&family=Dancing+Script:wght@400..700&family=Jersey+15&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";

  const styleSheet = document.createElement("link");
  styleSheet.rel = "stylesheet";
  styleSheet.href = "./style/style.css";

  head.append(linkFontsgApis, linkFontsgStatic, linkFontsgFamily, styleSheet);
}

function createBody() {
  if (header === null) {
    header = document.createElement("header");
    body.append(header);
  }

  if (titles === null) {
    titles = document.createElement("div");
    titles.classList.add("titles");
    header.append(titles);
  }

  webTitleLink = document.createElement("a");
  webTitleLink.href = "./index.html";

  webTitle = document.createElement("img");
  webTitle.src = "../style/img/webTitle.png";
  webTitle.alt = "web title";
  webTitle.classList.add("web-title");
  webTitleLink.append(webTitle);
  titles.prepend(webTitleLink);

  if (footer === null) {
    footer = document.createElement("footer");
    body.append(footer);
  }

  rights = document.createElement("p");
  rights.textContent =
    "© 2025 Abyssal Projects - Todos los derechos reservados";
  footer.append(rights);
}

createHead();
createBody();
