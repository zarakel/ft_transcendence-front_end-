import { databaseService } from './database.service'
import { User } from './user.entity'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('user')
export class UserController{

    @Post('username_update')
    async getCode(@Body() body: any): Promise<string>
    {
        let ds = databaseService.getDataSource();
        let user = await ds.manager.findBy(User, {login: body.login});
        user[0].username = body.username;
        console.log(user[0].username);
        try {
           await ds.manager.save(user[0]);
            return JSON.stringify({boolean: true});
        }
        catch
        {
            return JSON.stringify({boolean: false});
        }
    }
}