import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_DB_CONNECTION_URL } from './utils/constants';

@Module({
  imports: [
    ImageModule,
    MongooseModule.forRoot(MONGO_DB_CONNECTION_URL, { user: 'admin', pass: 'admin' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
