import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import {Repository} from 'typeorm'
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUsernameUnique implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async validate(suggestedUsername: string): Promise<boolean> {
    const usernameExist = await this.userRepo.exists({
      where: {
        username: suggestedUsername
      }
    })
    return !usernameExist
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property
    return `${field} missing or already exists!`
  }
}