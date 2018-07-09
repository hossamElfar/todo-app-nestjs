import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async find(id: number): Promise<Task> {
    return await this.taskRepository.findOneById(id);
  }

  async createTask(createTaskDto: CreateTaskDto){
    const task: Task = new Task();
    task.comment = createTaskDto.comment;
    task.subject = createTaskDto.subject;
    return await this.taskRepository.save(task);
  }

  async updateTask(updateTaskDto: UpdateTaskDto){
    return await this.taskRepository.updateById(updateTaskDto.id, updateTaskDto);
  }

  async deleteTask(deleteTaskDto: DeleteTaskDto){
    return await this.taskRepository.deleteById(deleteTaskDto.id);
  }
}
