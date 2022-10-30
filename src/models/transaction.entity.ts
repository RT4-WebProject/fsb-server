import { BaseModel } from './base.entity';
import { Entity, Column, Double } from 'typeorm';

@Entity({ name: 'transaction' })
export class Transaction extends BaseModel {
  @Column({ type: 'varchar', length: 255, nullable: true })
  from: string;

  @Column({ type: 'float', nullable: true })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  receiptStripe: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  receiptBlockchain: string;

  @Column({ type: 'varchar', length: 255 })
  fromCountry: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  campaignID: string;

  @Column({ type: 'varchar', length: 255 })
  agencyID: string;

  @Column({ type: 'varchar', length: 255 })
  feedback: string;

  @Column({ type: 'varchar', length: 255 })
  pk: string;

  @Column({ default: false })
  approved: boolean;
}
