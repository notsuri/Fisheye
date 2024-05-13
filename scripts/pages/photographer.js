import { MediaFactory } from "../factory/MediaFactory.js";
// import { Ligthbox } from "../utils/lightbox.js";

let lightbox = null;

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
  lightbox = new Ligthbox();
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
  medias.forEach((media, index) => {
    const card = cardMedia(media);
    totalLike = totalLike + media.likes;

    card.addEventListener("click", (e) => {
      e.preventDefault();
      lightbox.show(medias, index);
    });
    galery.appendChild(card);
  });
  const allLike = like.querySelector(".all_likes");
  allLike.textContent = totalLike;
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
  const likeClick = document.createElement("button");
  likeClick.innerHTML = '<i class="fa-solid fa-heart"></i>';
  likeClick.className = "like_click";
  likeMedia.appendChild(likeClick);

  article.appendChild(mediaContainer);
  article.appendChild(cardBody);
  return article;
}
init();

// Ligthbox
export class Ligthbox {
  constructor(selector = "#lightbox") {
    this.target = document.querySelector(selector);
    this.figure = this.target.querySelector(".figure");
    this.medias = [];
    this.current = -1;

    this.target.querySelector(".close").addEventListener("click", (e) => {
      console.log("close");
      e.preventDefault();
      this.close();
    });
    this.target.querySelector(".previous").addEventListener("click", (e) => {
      e.preventDefault();
      this.previous();
    });
    this.target.querySelector(".next").addEventListener("click", (e) => {
      e.preventDefault();
      this.next();
    });
  }

  show(medias, index) {
    this.medias = medias;
    this.update(index);
    this.target.showModal();
  }
  close() {
    this.target.close();
  }

  next() {
    this.update(this.current + 1);
  }

  previous() {
    this.update(this.current - 1);
  }

  update(index) {
    if (index < 0) {
      index = 0;
    } else if (index >= this.medias.length) {
      index = this.medias.length - 1;
    }
    this.current = index;
    const media = this.medias[this.current];
    this.figure.innerHTML = "";
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = media.title;
    figcaption.tabIndex = "3";
    figcaption.className = "alt";
    this.figure.appendChild(new MediaFactory(media, false));
    this.figure.appendChild(figcaption);
  }
}
