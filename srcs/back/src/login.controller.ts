import { Body, Controller, Param, Post, Inject } from '@nestjs/common';
import { LoginService } from './login.service';

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
  getToken(@Param("code") code: string): string
  {
    let token = this.login_service.convertCode(code);
    return JSON.stringify({token: token});
  }
}
