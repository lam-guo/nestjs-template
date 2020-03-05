import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Type } from 'class-transformer';
import { IsOptional, IsDefined, IsString, IsNumber } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Article {
  @ObjectIdColumn()
  id: ObjectID;

  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ nullable: false, length: 32 })
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedTime: Date;

  @Type(() => User)
  @Column(type => User)
  creator: User;

  @Type(() => User)
  @Column(type => User)
  updator: User;
}
