import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {StatusType} from "./entities/task.entity";
import {RequestPaginationFilter} from "../pagination/RequestPaginationFilter";

export interface TasksFilter {
  title: string;
  description: string;
  status: StatusType;
}
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({transform: true}))
  async findAll(@Query() filter: RequestPaginationFilter & TasksFilter) {
    return await this.tasksService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tasksService.remove(id);
  }
}
