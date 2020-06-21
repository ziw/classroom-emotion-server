import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { features } from 'process';
import { MongooseModule } from '@nestjs/mongoose';
import { EmotionSchema } from 'src/schema/emotion.schema';
import { UsersSchema } from 'src/schema/users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
      MongooseModule.forFeature([
        {name:'User', schema: UsersSchema}
      ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
,
})
export class UsersModule {}
