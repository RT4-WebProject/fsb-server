import { BaseModel } from './base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;
}
