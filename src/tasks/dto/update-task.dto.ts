import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { StatusType } from '../entities/task.entity';
import { IsValidUser } from '../validators/user.exists.validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  description?: string;

  @IsOptional()
  @IsEnum(StatusType)
  status?: StatusType;

  @IsOptional()
  @Validate(IsValidUser)
  user?: number;
}
