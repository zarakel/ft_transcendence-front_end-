import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { LoginController } from './modules/login/login.controller';
import { LoginService } from './modules/login/login.service';
import { databaseService } from './modules/database/database.service';

@Module({
  imports: [
    AppGateway,
    TypeOrmModule.forRoot({...databaseService.getConfig(),
      synchronize: true
    }),
  ],
  controllers: [AppController, HomeController, LoginController],
  providers: [AppService, HomeService, LoginService],
})
export class AppModule {}
