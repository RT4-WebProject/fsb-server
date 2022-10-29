import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Double } from 'typeorm';

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

    async approveAgency(id: any) {
        const agency = await this.agencyRepository.findOne(id);
        agency.approved = true;
        return this.agencyRepository.save(agency);
    }

    async deleteAgency(id: any) {
        return this.agencyRepository.delete(id);
    }

    async deleteCampaign(id: any) {
        return this.campaignRepository.delete(id);
    }

    async launchCampaign(id: any) {
        const campaign = await this.campaignRepository.findOne(id);
        campaign.activeNow = true;
        return this.campaignRepository.save(campaign);
    }

    async getCampaignRaised(id: any) {
        const transactions = await this.transactionRepository.find({
            where: {
                campaignID: id
            }
        });
        let raised = 0;
        transactions.forEach(transaction => {
            raised += transaction.amount;
        });
        return raised;
    }

    async getAgencyCollected(id: any) {
        const transactions = await this.transactionRepository.find({
            where: {
                agencyID: id
            }
        });
        let collected = 0;
        transactions.forEach(transaction => {
            collected += transaction.amount;
        });
        return collected;
    }

    async getAgencyActiveCampaigns(id: any) {
        return this.campaignRepository.find({
            where: {
                launchedBy: id,
                activeNow: true
            }
        });
    }

}
