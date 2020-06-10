import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {

  /**
   * TODO
   * Temporary implementation to verify that the server received the image
   * This service should implement logic to handle forwarding the image
   * to emotion analysis service
   */
  private lastRecordedImage: string;

  recordImage(dataUrl: string) {
    this.lastRecordedImage = dataUrl;
  }

  getLastRecordedImage() {
    return this.lastRecordedImage;
  }
}
