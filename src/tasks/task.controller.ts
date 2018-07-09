import { Controller, Get, Post, Body, UsePipes, Put, HttpStatus, Delete, Param, Response, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { JoiValidationPipe } from '../shared/pipes/validation.pipe';
import { createTaskSchema, updateTaskSchema, deleteTaskSchema } from './conf/tasks.validations';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() request): Promise<Task[]> {
    return this.taskService.findAll(request.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findById(@Param() params, @Response() res) {
    const task: Task = await this.taskService.find(params.id);
    if (task){
      return res.status(HttpStatus.OK).json({task});
    }else{
      return res.status(HttpStatus.NOT_FOUND).json({message: 'Not found'});
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(createTaskSchema))
  create(@Body() createTaskDto: CreateTaskDto, @Request() request) {
    return this.taskService.createTask(createTaskDto, request.user.id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(updateTaskSchema))
  update(@Body() updateTaskDto: UpdateTaskDto, @Request() request) {
    return this.taskService.updateTask(updateTaskDto, request.user.id);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(deleteTaskSchema))
  delete(@Body() deleteTaskDto: DeleteTaskDto, @Request() requst) {
    return this.taskService.deleteTask(deleteTaskDto, requst.user.id);
  }
}
