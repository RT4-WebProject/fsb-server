import { BaseModel } from "./base.entity";
import { Entity, Column } from "typeorm";

@Entity({name: 'agency'})
export class Agency extends BaseModel {
    @Column({type: 'varchar', length: 255})
    name: string;
    @Column({type: 'varchar', length: 255})
    website: string;
    @Column({type: 'varchar', length: 255})
    social: string;
    @Column({type: 'varchar', length: 20})
    phone: string;
    @Column({type: 'varchar', length: 255})
    email: string;
    @Column({type: 'varchar', length: 255})
    image: string;
    @Column({type: 'boolean', default: false})
    approved: boolean;
    @Column({type: 'varchar', length: 255})
    countries: string;
}
