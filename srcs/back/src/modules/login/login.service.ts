import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService 
{

  private jwtService: JwtService;

  async convertCode(code: string): Promise<any>
  {
    let request = await fetch("https://api.intra.42.fr/oauth/token", 
		{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: "http://localhost:8080"
      })
		});
    let rep = await request.json();
    return rep;
  }

  async getUser(token: string): Promise<any>
  {
    let request = await fetch("https://api.intra.42.fr/v2/me", 
		{
      method: "GET",
      headers: 
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
		});
    return await request.json();
  }  

  async getCredential(user: any)
  {
    const payload = {username: user.login};
    return {jwt_token: this.jwtService.signAsync(payload)};
  }
}
