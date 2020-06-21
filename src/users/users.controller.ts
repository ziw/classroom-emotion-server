import { Controller, Get, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { create } from 'domain';
import { Users, UsersSchema } from 'src/schema/users.schema';
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from '@nestjs/mongoose';

@Crud({
    model:UsersSchema
})


@Controller('users')
export class UsersController {
    constructor(private readonly usersservice: UsersService
       ) {}
   

    @Get('getall')
    //@UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<Users[]>{
        return await this.usersservice.findAll()
    }
@Get('add')
addDate(@Query()query){
    console.log(query)
    return'Sucessfully Login'
}
}
