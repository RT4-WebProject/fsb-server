import { BaseModel } from './base.entity';
import { Entity, Column, Double } from 'typeorm';

@Entity({ name: 'campaign' })
export class Campaign extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column()
  launchedBy: number;
  @Column({ type: 'varchar', length: 255 })
  country: string;
  @Column({ type: 'boolean', default: false })
  activeNow: boolean;
  @Column({ type: 'varchar', length: 255 })
  link: string;
  @Column({ type: 'varchar', length: 255 })
  image: string;
  @Column({ type: 'float' })
  goal: number;
}
