import { Body, Controller, Param, Post, Inject, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
									jwt_token: this.login_service.getCredential(exist[0].login),
									login: exist[0].login, 
									username: exist[0].username,
									profile_pic: exist[0].profile_pic,
									mmr: exist[0].mmr,
									id: exist[0].id}));
		else
		{
			let res = await databaseService.insertUser(ft_user);
			return (JSON.stringify({new: "true",
									access_token: token.access_token, 
									jwt_token: this.login_service.getCredential(res.login),
									login: res.login, 
									username: res.username,
									profile_pic: res.profile_pic,
									mmr: res.mmr,
									id: res.id}));
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('test')
	async test()
	{
		let ds = databaseService.getDataSource();
		let exist = await ds.manager.findBy(User, {login: "lmataris"});
		if (exist[0])
			console.log("toto");
		else
			console.log("tata");

		return exist;
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('delete')
	async del()
	{
		let ds = databaseService.getDataSource();
		let exist = await ds.manager.findBy(User, {login: "lmataris"});
		await ds.manager.remove(User, exist);
	}
}

