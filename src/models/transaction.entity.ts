import { BaseModel } from './base.entity';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { Campaign } from './campaign.entity';
import { Agency } from './agency.entity';

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

  @JoinTable()
  @ManyToOne(() => Campaign, campaign => campaign.id, { cascade: true, eager: true })
  campaignID: Campaign;

  @JoinTable()
  @ManyToOne(()=>Agency, agency => agency.id, { cascade: true, eager: true })
  agencyID: Agency;

  @Column({ type: 'varchar', length: 255 })
  feedback: string;

  @Column({ type: 'varchar', length: 255 })
  pk: string;

  @Column({ default: false })
  approved: boolean;
}
