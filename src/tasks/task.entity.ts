import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number;

  @Column('text') comment: string;

  @Column() subject: string;

  @ManyToOne(type => User, user => user.tasks)
  user: User;
}
