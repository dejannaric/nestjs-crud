import { StatusType } from '../entities/task.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsValidUser } from '../validators/user.exists.validator';

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  description?: string;

  @IsNotEmpty()
  @IsEnum(StatusType)
  status!: StatusType;

  @IsNotEmpty()
  @Validate(IsValidUser)
  user!: number;
}
