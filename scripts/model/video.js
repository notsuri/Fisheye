// Créer la vidéo
export class Video {
  constructor(data) {
    const video = document.createElement("video");
    video.src = `/ssets/photographers/media/${data.photographerId}/${data.video}`;
    video.className = "img_media video";
    video.controls = true;
    video.muted = true;
    video.autoplay = true;
    return video;
  }
}
