import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { PageService } from '../pagination/PageService';
import { RequestPaginationFilter } from '../pagination/RequestPaginationFilter';
import { UsersFilter } from './users.controller';

@Injectable()
export class UsersService extends PageService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super();
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.insert({
      ...createUserDto,
    });
  }

  async findAll(filter: RequestPaginationFilter & UsersFilter) {
    const { ...params } = filter;

    return await this.paginate(
      this.userRepo,
      filter,
      this.createWhereQuery(params),
    );
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: {
        id: id,
      },
      relations: ['tasks'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.validateUniqueUsernameOnUpdate(id, updateUserDto.username);
    return await this.userRepo.update(
      {
        id: id,
      },
      updateUserDto,
    );
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }

  private createWhereQuery(params: UsersFilter) {
    const where: any = {};

    if (params.username) {
      where.username = params.username;
    }

    return where;
  }

  private async validateUniqueUsernameOnUpdate(id: number, username: string) {
    const usernameExist = await this.userRepo.exists({
      where: {
        username: username,
        id: Not(id),
      },
    });
    if (usernameExist) {
      throw new HttpException(
        'Username already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
