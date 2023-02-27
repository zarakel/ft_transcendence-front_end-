import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  username: string;

  @PrimaryColumn()
  login: string;

  @Column()
  profile_pic: string;

  @Column({default: 500})
  mmr: number; 
}