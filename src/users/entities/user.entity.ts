import {Column, Entity, OneToMany} from "typeorm";
import {GeneralFields} from "../../database/general.fields";
import {Task} from "../../tasks/entities/task.entity";

@Entity()
export class User extends GeneralFields {
  @Column({
    unique: true
  })
  username: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}