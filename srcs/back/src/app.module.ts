import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
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
