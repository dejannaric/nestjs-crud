import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import {Repository} from 'typeorm'
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "../entities/task.entity";

@ValidatorConstraint({ name: 'userExists', async: true })
@Injectable()
export class IsValidUser implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>
  ) {}
  async validate(user: number): Promise<boolean> {

    const userExist = await this.taskRepo.exists({
      where: {
        id: user
      }
    })
    return !userExist
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property
    return `User id: ${field} does not exists!`
  }
}