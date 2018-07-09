import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Timestamp } from 'rxjs';

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number;

  @Column('text') comment: string;

  @Column() subject: string;

  @Column({
    nullable: true,
  })
  date: Date;

  @ManyToOne(type => User, user => user.tasks)
  user: User;
}
