import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Task} from "./entities/task.entity";
import {User} from "../users/entities/user.entity";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepo.findOneBy({
      id: createTaskDto.user
    })
    const task = new Task()
    task.status = createTaskDto.status,
    task.title = createTaskDto.title,
    task.description = createTaskDto.description,
    task.user = user
    return await this.taskRepo.save(task)

  }

  async findAll() {
    return await this.taskRepo.find()
  }

  async findOne(id: number) {
    return await this.taskRepo.findOne({
      where: {
        id: id
      },
      relations: ['user']
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const partialEntity: QueryDeepPartialEntity<Task> = {
      ...(updateTaskDto.status && { status: updateTaskDto.status }),
      ...(updateTaskDto.description && { description: updateTaskDto.description }),
      ...(updateTaskDto.title && { title: updateTaskDto.title }),
      ...(updateTaskDto.user && { user: {id: updateTaskDto.user} }),
    }
    return await this.taskRepo.update({id: id}, partialEntity);
  }

  async remove(id: number) {
    return await this.taskRepo.delete(id);
  }
}
