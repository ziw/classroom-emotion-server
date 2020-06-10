import { Injectable } from '@nestjs/common';
import { analyzeImageEmotion } from '../utils/restUtils';

@Injectable()
export class ImageService {

  /**
   * TODO
   * Temporary implementation to verify that the server received the image
   * This service should implement logic to handle forwarding the image
   * to emotion analysis service
   */
  private lastRecordedImage: string;
  private lastRecordedEmotion: string;

  recordImage(dataUrl: string) {
    analyzeImageEmotion(dataUrl).then(result => this.lastRecordedEmotion = result);
    this.lastRecordedImage = dataUrl;
  }

  getLastRecordedImage() {
    return this.lastRecordedImage;
  }

  getlastRecordedEmotion() {
    return this.lastRecordedEmotion;
  }
}
