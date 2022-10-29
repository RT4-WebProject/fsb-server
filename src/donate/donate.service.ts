import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Agency } from '../models/agency.entity';
import { Campaign } from '../models/campaign.entity';
import { Transaction } from '../models/transaction.entity';

@Injectable()
export class DonateService {
    @Inject('UUID') uuid;
    constructor(@InjectRepository(Agency) private agencyRepository: Repository<Agency>,
        @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>
    ) {}

    async getAgency(id: any) {
        return this.agencyRepository.findOne(id);
    }

    async getCampaign(id: any) {
        return this.campaignRepository.findOne(id);
    }

    async getTransaction(id: any) {
        return this.transactionRepository.findOne(id);
    }

    async getTransactions() {
        return this.transactionRepository.find();
    }

    async getCampaigns() {
        return this.campaignRepository.find();
    }

    async getAgencies() {
        return this.agencyRepository.find();
    }

    async getAgencyCampaigns(id: any) {
        return this.campaignRepository.find({
            where: {
                launchedBy: id
            }
        });
    }

    async getCampaignTransactions(id: any) {
        return this.transactionRepository.find({
            where: {
                campaignID: id
            }
        });
    }

    async createAgency(agency: Agency) {
        agency.id = this.uuid();
        return this.agencyRepository.save(agency);
    }

    async createCampaign(campaign: Campaign) {
        campaign.id = this.uuid();
        return this.campaignRepository.save(campaign);
    }

    async createTransaction(transaction: Transaction) {
        transaction.id = this.uuid();
        return this.transactionRepository.save(transaction);
    }

    async getCampaignsByCountry(country: string) {
        return this.campaignRepository.find({
            where: {
                countries: Like(`%${country}%`)
            }
        });
    }

    async getAgencyTransactions(id: any) {
        return this.transactionRepository.find({
            where: {
                agencyID: id
            }
        });
    }

}
