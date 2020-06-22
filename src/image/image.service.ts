import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { analyzeImageEmotion } from '../utils/restUtils';
import { Emotion } from 'src/schema/emotion.schema';
import { CreateEmotionDto } from 'src/schema/emotion.dto';

@Injectable()
export class ImageService {

  constructor(
    @InjectModel(Emotion.name) private emotionModel: Model<Emotion>
  ){}

  /**
   * TODO
   * Temporary implementation to verify that the server received the image
   * This service should implement logic to handle forwarding the image
   * to emotion analysis service
   */
  private lastRecordedImage: string;
  private lastRecordedEmotion: string;

  recordImage(dataUrl: string) {
    analyzeImageEmotion(dataUrl).then((result: any) => {
      this.lastRecordedEmotion = JSON.stringify(result);
      this.lastRecordedImage = dataUrl;

      const newEmotion: CreateEmotionDto = {
        faceDetected: result.faceDetected,
        happiness: result.emotion.happiness,
        anger: result.emotion.anger,
        timestamp: new Date(),
        studentName: `student-${~~(Math.random()*3)}` //TODO parse name from request
      };
      this.createEmotionModel(newEmotion);
    });
  }

  getLastRecordedImage() {
    return this.lastRecordedImage;
  }

  getlastRecordedEmotion() {
    return this.lastRecordedEmotion;
  }

  private async createEmotionModel(emotionDto: CreateEmotionDto) {
    const newEmotion = new this.emotionModel(emotionDto);
    return newEmotion.save();
  }
}
