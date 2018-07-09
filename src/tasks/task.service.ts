import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { User } from '../user/user.entity';
import * as schedule from '../shared/services/schedule.service';
import * as mailService from '../shared/services/mail.service';
import { MailRequest } from '../shared/services/mail.request';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(id: number): Promise<Task[]> {
    const user: User = await this.userRepository.findOne({id});
    return await this.taskRepository.find({user});
  }

  async find(id: number): Promise<Task> {
    return await this.taskRepository.findOneById(id);
  }

  async createTask(createTaskDto: CreateTaskDto, id: number){
    const user: User = await this.userRepository.findOne({id});
    const task: Task = new Task();
    task.comment = createTaskDto.comment;
    task.subject = createTaskDto.subject;
    if (createTaskDto.date){
      task.date = new Date(createTaskDto.date * 1000);
      const notificationDate = task.date;
      notificationDate.setHours(notificationDate.getHours() - 1);
      schedule.addJob(notificationDate, () => {
        mailService.sendMail(new MailRequest(user.email, task.subject, task.comment));
      });
    }
    task.user = user;
    return await this.taskRepository.save(task);
  }

  async updateTask(updateTaskDto: UpdateTaskDto, id: number){
    const user: User = await this.userRepository.findOne({id});
    return await this.taskRepository.update({id: updateTaskDto.id, user}, updateTaskDto);
  }

  async deleteTask(deleteTaskDto: DeleteTaskDto, id: number){
    const user: User = await this.userRepository.findOne({id});
    return await this.taskRepository.delete({id: deleteTaskDto.id, user});
  }
}
