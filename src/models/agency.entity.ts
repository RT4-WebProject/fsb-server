import { Entity, Column } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'agency' })
export class Agency extends User {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  website: string;

  @Column({ type: 'varchar', length: 255 })
  social: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'boolean', default: false })
  approved: boolean;

  @Column({ type: 'varchar', length: 255 })
  countries: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;
}
