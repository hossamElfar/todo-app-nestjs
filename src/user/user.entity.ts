import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column({unique: true}) email: string;

  @Column() password: string;

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];
}
