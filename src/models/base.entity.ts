import { PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from 'typeorm';

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ readonly: true })
  createdAt: Date;
}
