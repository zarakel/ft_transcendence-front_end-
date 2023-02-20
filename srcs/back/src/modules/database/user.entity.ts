import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  login: string;

  @Column()
  profile_pic: string;

  @Column({default: 500})
  mmr: number; 
}