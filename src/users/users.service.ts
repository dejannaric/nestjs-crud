import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.insert({
      ...createUserDto
    });
  }

  async findAll() {
    return await this.userRepo.find()
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({
      id: id
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update({
      id: id
    },
      updateUserDto)
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
