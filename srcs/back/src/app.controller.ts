import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("logged_in")
  async isLoggedIn(): Promise<any> 
  {
    return JSON.stringify({logged_in: "true"});
  }
}