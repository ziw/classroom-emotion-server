import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { Emotion, EmotionSchema } from 'src/schema/emotion.schema';

@Module({
  controllers: [EmotionController],
  providers: [EmotionService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Emotion.name,
        schema: EmotionSchema,
      }
    ])
  ]
})
export class EmotionModule {}
