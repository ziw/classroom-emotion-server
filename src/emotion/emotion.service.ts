import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Emotion } from 'src/schema/emotion.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmotionService {
  constructor(
    @InjectModel(Emotion.name) private emotionModel: Model<Emotion>
  ){}

  async findBetweenDate(startDate: Date, endDate: Date): Promise<Emotion[]> {
    return this.emotionModel.find({
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      }
    }).exec();
  }
}
