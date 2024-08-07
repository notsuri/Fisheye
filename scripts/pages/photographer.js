import { MediaFactory } from "../factory/MediaFactory.js";
import { Ligthbox } from "../components/lightbox.js";

let lightbox = null;

async function getPhotographerById(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers.find((photographer) => photographer.id == id);
}

async function getMediasByPhotographerId(id) {
  const response = await fetch("./data/photographers.json");
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

  const filters = document.querySelector(".photograph_filter select");
  filters.addEventListener("change", () => {
    switch (filters.value) {
      case "likes":
        sortMedia(medias, "likes");
        break;
      case "titles":
        sortMedia(medias, "titles");
        break;
      case "dates":
        sortMedia(medias, "dates");
        break;
    }
  });
  lightbox = new Ligthbox();
  displayData(photographer, medias);
}

function displayData(photographer, medias) {
  const head = document.querySelector(".photograph_header");
  const like = document.querySelector(".photograph_like");
  const modal = document.querySelector(".overlay_modal");

  const namePhotograph = head.querySelector(".photograph_title");
  namePhotograph.textContent = photographer.name;

  const titlePhotograph = modal.querySelector(".title_photograph");
  titlePhotograph.textContent = photographer.name;

  const cityPhotograph = head.querySelector(".photograph_city");
  cityPhotograph.textContent = photographer.city + ", " + photographer.country;

  const tagPhotograph = head.querySelector(".photograph_tagline");
  tagPhotograph.textContent = photographer.tagline;

  const imgPhotograph = head.querySelector(".photograph_img");
  imgPhotograph.src = `./assets/photographers/portrait/${photographer.portrait}`;
  imgPhotograph.alt = "Photo de Profil";
  const totalLike = displayGallery(medias, photographer);
  const allLike = like.querySelector(".all_likes");
  allLike.textContent = totalLike;
  const priceDay = like.querySelector(".price_day");
  priceDay.textContent = photographer.price;
}
function cardMedia(media) {
  const { id, photographerId, title, image, likes, date, price, video } = media;

  const article = document.createElement("article");
  article.className = "card_media";

  const mediaContainer = new MediaFactory(media);

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
  const likeClick = document.createElement("span");
  likeClick.innerHTML = '<i class="fa-solid fa-heart"></i>';
  likeClick.className = "like-click-" + media.id;
  likeMedia.appendChild(likeClick);

  article.appendChild(mediaContainer);
  article.appendChild(cardBody);
  return article;
}
init();

//TRIER

function sortBy(medias, by) {
  switch (by) {
    case "likes":
      medias.sort((m1, m2) => {
        return m2.likes - m1.likes;
      });
      break;
    case "titles":
      medias.sort((media1, media2) => {
        if (media1.title > media2.title) {
          return +1;
        } else if (media1.title < media2.title) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "dates":
      medias.sort((media1, media2) => {
        return (
          new Date(media2.date).getTime() - new Date(media1.date).getTime()
        );
      });
      break;
  }
}
//Afficher les cards grace a une boucle
function displayGallery(medias) {
  let totalLike = 0;
  const gallery = document.querySelector(".photograph_medias");

  medias.forEach((media, index) => {
    const card = cardMedia(media);
    totalLike = totalLike + media.likes;

    if (card.querySelector("img")) {
      card.querySelector("img").addEventListener("click", (e) => {
        e.preventDefault();
        lightbox.show(medias, index);
      });
    } else {
      card.querySelector("video").addEventListener("click", (e) => {
        e.preventDefault();
        lightbox.show(medias, index);
      });
    }
    card.querySelector(".title_media").addEventListener("click", (e) => {
      e.preventDefault();
      lightbox.show(medias, index);
    });
    gallery.appendChild(card);
    checkLike(media, medias);
  });

  return totalLike;
}

function sortMedia(medias, by) {
  sortBy(medias, by);
  document.querySelector(".photograph_medias").innerHTML = "";
  displayGallery(medias);
}

//aime ou pas
function checkLike(media, medias) {
  const clickLike = document.querySelector(".like-click-" + media.id);
  clickLike.addEventListener("click", () => {
    const index = medias.findIndex((m) => media.id === m.id);
    if (medias[index].liked) {
      medias[index].likes--;
      medias[index].liked = false;
    } else {
      medias[index].likes++;
      medias[index].liked = true;
    }
    document.querySelector(".photograph_medias").innerHTML = "";
    displayGallery(medias);
  });
}
