// FACTORY
import { Image } from "../model/Image.js";
import { Video } from "../model/Video.js";
export class MediaFactory {
  constructor(data) {
    if (data.image) {
      return new Image(data);
    } else if (data.video) {
      return new Video(data);
    } else {
      throw new Error("Format de media non pris en charge");
    }
  }
}