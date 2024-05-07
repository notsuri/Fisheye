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

  const priceDay = like.querySelector(".price_day");
  priceDay.textContent = photographer.price;

  let totalLike = 0;
  medias.forEach((media) => {
    const card = cardMedia(media);
    totalLike = totalLike + media.likes;
    galery.appendChild(card);
  });
  const allLike = like.querySelector(".all_likes");
  allLike.textContent = totalLike;
}

function cardMedia(media) {
  const { id, photographerId, title, image, likes, date, price, video } = media;
  // const icon = '<i class="fa-solid fa-heart"></i>';

  const picture = `assets/photographers/media/${photographerId}/${image}`;

  const article = document.createElement("article");
  article.className = "card_media";

  //Photo
  const img = document.createElement("img");
  img.src = picture;
  img.alt = title;
  img.className = "img_media";

  //Nom

  // like
  const cardBody = document.createElement("div");
  cardBody.className = "card_body";
  const titleMedia = document.createElement("h2");
  titleMedia.textContent = title;
  titleMedia.className = "title_media";
  cardBody.appendChild(titleMedia);
  const likeMedia = document.createElement("div");
  likeMedia.className = "like_media";
  cardBody.appendChild(likeMedia);
  const likePicture = document.createElement("span");
  likePicture.textContent = likes;
  likePicture.className = "like_picture";
  likeMedia.appendChild(likePicture);
  const likeClick = document.createElement("button");
  likeClick.innerHTML = '<i class="fa-solid fa-heart"></i>';
  likeClick.className = "like_click";
  likeMedia.appendChild(likeClick);

  article.appendChild(img);
  article.appendChild(cardBody);
  return article;
}
init();
