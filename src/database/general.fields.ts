import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export abstract class GeneralFields {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({name: 'created_timestamp'})
  createdTimestamp: Date;

  @UpdateDateColumn({name: 'updated_timestamp' })
  updatedTimestamp: Date;
}