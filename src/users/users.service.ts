import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schema/users.schema';
import { CreateUsersDto } from 'src/schema/users.dto';

@Injectable()
export class UsersService{
    constructor(@InjectModel('User') private readonly userModel: Model<Users> ){}
    private static users: Users[]=[ ]
    async findAll(): Promise<Users[]>{
        //return UsersService.users
        return await this.userModel.find({})
    }
}
