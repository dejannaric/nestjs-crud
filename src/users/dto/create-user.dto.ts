import {IsAlphanumeric, MinLength, Validate} from "class-validator";
import {IsUsernameUnique} from "../validators/username.unique.validator";

export class CreateUserDto {
  @IsAlphanumeric()
  @MinLength(5, { message: 'Username must have at least 5 characters.' })
  @Validate(IsUsernameUnique)
  username!: string
}