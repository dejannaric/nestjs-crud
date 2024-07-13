import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {IsValidUser} from "./validators/user.exists.validator";
import {Task} from "./entities/task.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TasksController],
  providers: [TasksService, IsValidUser],
})
export class TasksModule {}
