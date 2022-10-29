import { BaseModel } from "./base.entity";
import { Entity, Column, Double } from "typeorm";

@Entity({name: 'transaction'})
export class Transaction extends BaseModel {
    @Column({type: 'varchar', length: 255, nullable: true})
    from: string;
    @Column({type: 'varchar', length: 255})
    to: string;
    @Column({type: 'varchar', length: 255})
    cause: string;
    @Column({type: 'float'})
    amount: number;
    @Column({type: 'varchar', length: 255})
    receiptStripe: string;
    @Column({type: 'varchar', length: 255})
    receiptBlockchain: string;
    @Column({type: 'varchar', length: 255})
    fromCountry: string;
    @Column({type: 'varchar', length: 255})
    campaignID: string;
    @Column({type: 'varchar', length: 255})
    agencyID: string;
    @Column({type: 'varchar', length: 255})
    feedback: string;
}
