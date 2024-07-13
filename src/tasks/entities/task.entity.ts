import {Column, Entity, ManyToOne} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {GeneralFields} from "../../database/general.fields";

export enum StatusType {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done"
}

@Entity()
export class Task extends GeneralFields {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: StatusType,
  })
  status: StatusType;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User
}