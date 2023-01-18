import { BaseModel } from './base.entity';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { Agency } from './agency.entity';

@Entity({ name: 'campaign' })
export class Campaign extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @JoinTable()
  @ManyToOne(()=>Agency, agency => agency.id, { cascade: true, eager: true })
  launchedBy: Agency;

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
