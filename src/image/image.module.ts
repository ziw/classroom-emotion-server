import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Emotion, EmotionSchema } from 'src/schema/emotion.schema';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Emotion.name,
        schema: EmotionSchema,
      }
    ])
  ]
})
export class ImageModule {}
