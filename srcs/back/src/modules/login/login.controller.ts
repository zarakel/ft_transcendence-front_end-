import { Body, Controller, Param, Post, Inject } from '@nestjs/common';
import { LoginService } from './login.service';
import { databaseService } from '../database/database.service';
import { User } from '../database/user.entity';

@Controller('login')
export class LoginController {

  	@Inject(LoginService)
  	private login_service: LoginService;

	@Post('code')
	getCode(@Body() body: any): string 
	{
		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
		url.searchParams.append("client_id", process.env["CLIENT_ID"]);
		url.searchParams.append("redirect_uri", body.redirect_uri);
		url.searchParams.append("response_type", "code");

		return JSON.stringify({url: url.toString()});
	}

  /*
      Object.entries(rep).forEach(([key, value]) => {
      console.log(`coucou : ${key}  -->  ${value}`);
    });
  */

	@Post('token/:code')
	async getToken(@Param("code") code: string): Promise<any>
	{
		let token = await this.login_service.convertCode(code);
		let user = await this.login_service.getUser(token.access_token);

		let ds = databaseService.getDataSource();
		let exist = ds.manager.findBy(User, {login: user.login});

		if (exist)
			return (JSON.stringify({...user, "new":"0"}));
		else
		{
			databaseService.insertUser(user);
			return (JSON.stringify({...user, "new":"1"})); 
		}
	}
}
