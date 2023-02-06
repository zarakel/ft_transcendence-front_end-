import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { AppGateway } from './app.gateway';

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
})
export class AppModule {}
