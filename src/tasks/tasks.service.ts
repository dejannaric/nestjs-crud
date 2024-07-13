import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Task} from "./entities/task.entity";
import {User} from "../users/entities/user.entity";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {RequestPaginationFilter} from "../pagination/RequestPaginationFilter";
import {PageService} from "../pagination/PageService";
import {TasksFilter} from "./tasks.controller";

@Injectable()
export class TasksService extends PageService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super();
  }

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

  async findAll(filter: RequestPaginationFilter & TasksFilter) {
    const { ...params } = filter;

    return await this.paginate(
      this.taskRepo,
      filter,
      this.createWhereQuery(params),
    );
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

  private createWhereQuery(params: TasksFilter) {
    const where: any = {};

    if (params.status) {
      where.status = params.status;
    }
    if (params.title) {
      where.title = params.title;
    }
    if (params.description) {
      where.description = params.description;
    }
    return where;
  }
}
