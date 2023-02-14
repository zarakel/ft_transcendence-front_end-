import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    AppGateway,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql',
      port: 5432,
      username: 'toto',
      password: 'toto',
      database: 'transcendence',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, HomeController],
  providers: [AppService, HomeService],
})
export class AppModule {}
