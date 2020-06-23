import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { EmotionService } from './emotion.service';

@Controller('emotion')
export class EmotionController {
  constructor(
    private readonly emotionService: EmotionService
  ) {}

  @Get()
  getEmotions(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    if(!startDate || !endDate) {
      throw new HttpException('You must specify a start and end date', HttpStatus.BAD_REQUEST);
    }

    this.emotionService.findBetweenDate(
      new Date(startDate),
      new Date(endDate),
    ).catch((error) => {
      console.error(error);
      throw new HttpException('Database connection error', HttpStatus.INTERNAL_SERVER_ERROR);
    }).
    then((emotions) => {
      //TODO parse emotions data

      return {
        emotions: emotions
      }
    });
  }
}
