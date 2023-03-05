import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './home.controller';
import { UserController } from './modules/database/user.controller';
import { HomeService } from './home.service';
import { LoginModule } from './modules/login/login.module';
import { databaseService } from './modules/database/database.service';

@Module({
  imports: [
    AppGateway,
    LoginModule,
    TypeOrmModule.forRoot({...databaseService.getConfig(),
      synchronize: true
    }),
  ],
  controllers: [AppController, HomeController, UserController],
  providers: [AppService, HomeService],
})
export class AppModule {}
