import { Controller, Get, Post, Body, UsePipes, Put, HttpStatus, Delete, Param, Response } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { JoiValidationPipe } from '../shared/pipes/validation.pipe';
import { createTaskSchema, updateTaskSchema, deleteTaskSchema } from './conf/tasks.validations';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findById(@Param() params, @Response() res) {
    const task: Task = await this.taskService.find(params.id);
    if (task){
      return res.status(HttpStatus.OK).json({task});
    }else{
      return res.status(HttpStatus.NOT_FOUND).json({message: 'Not found'});
    }
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createTaskSchema))
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Put()
  @UsePipes(new JoiValidationPipe(updateTaskSchema))
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(updateTaskDto);
  }

  @Delete()
  @UsePipes(new JoiValidationPipe(deleteTaskSchema))
  delete(@Body() deleteTaskDto: DeleteTaskDto) {
    return this.taskService.deleteTask(deleteTaskDto);
  }
}
