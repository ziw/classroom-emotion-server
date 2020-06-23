import { Controller, Post, UseInterceptors, Res, Req, Body, Get } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudentImage(@Body() body) {
    this.imageService.recordImage(body.imageData, body.username);
  }

  @Get('view')
  getLastRecordedImage() {
    return `
      <div>Debug view to verify IoT sensor data is received correctly. Not visible in final product.</div>
      <div>Last recorded image:</div>
      <div>Emotion: ${this.imageService.getlastRecordedEmotion()}</div>
      <img src=${this.imageService.getLastRecordedImage()} />
    `;
  }
}
