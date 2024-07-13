import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import {Repository} from 'typeorm'
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/entities/user.entity";

@ValidatorConstraint({ name: 'userExists', async: true })
@Injectable()
export class IsValidUser implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async validate(user: number): Promise<boolean> {
    const userExist = await this.userRepo.existsBy({
        id: user
    })
    return userExist
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property
    return `User id: ${field} does not exists!`
  }
}