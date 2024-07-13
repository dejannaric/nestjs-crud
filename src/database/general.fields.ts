import {  CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class GeneralFields {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn({name: 'created_timestamp'})
  createdTimestamp: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_timestamp' })
  updatedTimestamp: Date;
}