import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Collection } from 'mongoose';
import * as mongoose from 'mongoose'

@Schema(
  { collection:'users', versionKey: false}
)
export class Emotion extends Document {
  @Prop()
  studentName: string;

  @Prop()
  happiness: number;

  @Prop()
  calm: number;

  @Prop()
  anger: number;

  @Prop()
  timestamp: Date;

  @Prop()
  faceDetected: boolean;
}


export const EmotionSchema = SchemaFactory.createForClass(Emotion);

