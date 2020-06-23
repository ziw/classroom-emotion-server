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

  parseEmotionData(emotions: Emotion[] = []) {
    const users = {};
    const uniqueEmotions: Emotion[] = [];
    for(let i = emotions.length - 1; i>=0; i--) {
      if(!users[emotions[i].studentName]) {
        users[emotions[i].studentName] = true;
        uniqueEmotions.push(emotions[i]);
      }
    }
    const totalScore = uniqueEmotions.reduce((prev, curr) => curr.happiness + prev, 0);
    const numActiveStudents = uniqueEmotions.filter(emotion => emotion.faceDetected).length;
    const numEngagedStudents = uniqueEmotions.filter(emotion => emotion.happiness > 0.5).length;
    const averageScore = Math.round((totalScore / uniqueEmotions.length + Number.EPSILON) * 100);

    return {
      averageScore,
      uniqueEmotions,
      numActiveStudents,
      numEngagedStudents,
      timeStamp: emotions[emotions.length -1].timestamp,
      students: Object.keys(users),
    };
  }

  groupEmotionData(emotions: Emotion[] = [], intervalSeconds = 10) {
    const emotionSegments: Emotion[][] =[];
    let segment: Emotion[] = [];

    const inSegment = (e: Emotion) => {
      if(!segment.length) {
        return true;
      }
      const firstDateInSegment = new Date(segment[0].timestamp).getTime();
      const currentDate = new Date(e.timestamp);
      const seconds = intervalSeconds * 1000;
      return (new Date(firstDateInSegment + seconds)) >= currentDate;
    }

    emotions.forEach(e => {
      if(inSegment(e)) {
        segment.push(e);
      }else {
        emotionSegments.push(segment.slice());
        segment = [];
      }
    });

    return emotionSegments.map(seg => this.parseEmotionData(seg));
  }
}
