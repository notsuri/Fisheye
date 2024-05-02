async function getPhotographerById(id) {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  return data.photographers.find((photographer) => photographer.id == id);
}

async function getMediasByPhotographerId(id) {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  return data.media.filter((media) => id == media.photographerId);
}
async function init() {
  //Mettre le code JavaScript lié à la page photographer.html
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  const photographer = await getPhotographerById(id);
  const medias = await getMediasByPhotographerId(id);
  displayData(photographer, medias);
}
function displayData(photographer, medias) {
  const head = document.querySelector(".photograph_header");
  const like = document.querySelector(".photograph_like");
  const galery = document.querySelector(".photograph_medias");

  const namePhotograph = head.querySelector(".photograph_title");
  namePhotograph.textContent = photographer.name;

  const cityPhotograph = head.querySelector(".photograph_city");
  cityPhotograph.textContent = photographer.city + ", " + photographer.country;

  const tagPhotograph = head.querySelector(".photograph_tagline");
  tagPhotograph.textContent = photographer.tagline;

  const imgPhotograph = head.querySelector(".photograph_img");
  imgPhotograph.src = `./assets/photographers/portrait/${photographer.portrait}`;
  imgPhotograph.alt = "Photo de Profil";

  const allLike = like.querySelector(".all_likes");
  allLike.textContent = medias.likes;

  const priceDay = like.querySelector(".price_day");
  priceDay.textContent = photographer.price;

  medias.forEach((media) => {
    const card = cardMedia(media);
    galery.appendChild(card);
  });
}

function cardMedia(media) {
  const { id, photographerId, title, image, likes, date, price, video } = media;

  const picture = `assets/photographers/media/${photographerId}/${image}`;

  const article = document.createElement("article");
  article.className = "card_media";

  //Photo
  const img = document.createElement("img");
  img.src = picture;
  img.alt = title;
  img.className = "img_media";

  //Nom
  const titleMedia = document.createElement("h2");
  titleMedia.textContent = title;
  titleMedia.className = "title_media";

  // like
  const likeMedia = document.createElement("p");
  likeMedia.textContent = likes;
  likeMedia.classList = "likes_media";

  // heart
  const heartMedia = document.createElement("p");
  heartMedia.textContent = "";
  heartMedia.className = "heart_media";

  article.appendChild(img);
  article.appendChild(titleMedia);
  article.appendChild(likeMedia);
  article.appendChild(heartMedia);
  return article;
}
init();
