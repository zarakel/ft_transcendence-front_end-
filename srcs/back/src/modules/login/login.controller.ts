import { Body, Controller, Param, Post, Inject, Get } from '@nestjs/common';
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

	@Post('token/:code')
	async getToken(@Param("code") code: string): Promise<any>
	{
		let token = await this.login_service.convertCode(code);
		let ft_user = await this.login_service.getUser(token.access_token);

		let ds = databaseService.getDataSource();
		let exist = await ds.manager.findBy(User, {login: ft_user.login});

		if (exist[0])
			return (JSON.stringify({access_token: token.access_token, 
									login: exist[0].login, 
									username: exist[0].username}));
		else
		{
			await databaseService.insertUser(ft_user);
			return (JSON.stringify({new: "true", access_token: token.access_token})); 
		}
	}

	@Get('test')
	async test()
	{
		let ds = databaseService.getDataSource();
		let exist = await ds.manager.findBy(User, {login: "lmataris"});
		console.log(exist);
		if (exist[0])
			console.log("toto");
		else
			console.log("tata");

		return exist;
	}

	@Get('delete')
	async del()
	{
		let ds = databaseService.getDataSource();
		let exist = await ds.manager.findBy(User, {login: "lmataris"});
		await ds.manager.remove(User, exist);
	}
}

