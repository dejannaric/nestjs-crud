import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsAlphanumeric()
  @MinLength(5, { message: 'Username must have at least 5 characters.' })
  @IsNotEmpty()
  username: string;
}
