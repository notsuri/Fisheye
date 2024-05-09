// Créer l'image

export class Image {
  constructor(data) {
    const img = document.createElement("img");
    img.src = `assets/photographers/media/${data.photographerId}/${data.image}`;
    img.alt = `Photo de ${data.title}`;
    img.className = "img_media picture";
    return img;
  }
}
