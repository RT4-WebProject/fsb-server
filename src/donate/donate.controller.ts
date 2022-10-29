import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DonateService } from './donate.service';
import { AgencyDto } from './dto/agency.dto';
import { CampaignDto } from './dto/campaign.dto';
import { TransactionDto } from './dto/transaction.dto';


@Controller('api')
export class DonateController {
    constructor(private readonly donateService: DonateService) {}

    @Get('agency/:id')
    async getAgency(@Param('id') id: string) {
        return this.donateService.getAgency(id);
    }

    @Get('campaign/:id')
    async getCampaign(@Param('id') id: string) {
        return this.donateService.getCampaign(id);
    }

    @Get('transaction/:id')
    async getTransaction(@Param('id') id: string) {
        return this.donateService.getTransaction(id);
    }

    @Get('transactions')
    async getTransactions() {
        return this.donateService.getTransactions();
    }

    @Get('campaigns')
    async getCampaigns() {
        return this.donateService.getCampaigns();
    }

    @Get('agencies')
    async getAgencies() {
        return this.donateService.getAgencies();
    }

    @Get('agency/:id/campaigns')
    async getAgencyCampaigns(@Param('id') id: string) {
        return this.donateService.getAgencyCampaigns(id);
    }

    @Get('campaign/:id/transactions')
    async getCampaignTransactions(@Param('id') id: string) {
        return this.donateService.getCampaignTransactions(id);
    }

    @Post('agency')
    async createAgency(@Body() agency: AgencyDto) {
        return this.donateService.createAgency(agency);
    }

    @Post('campaign')
    async createCampaign(@Body() campaign: CampaignDto) {
        return this.donateService.createCampaign(campaign);
    }

    @Post('transaction')
    async createTransaction(@Body() transaction: TransactionDto) {
        return this.donateService.createTransaction(transaction);
    }

    @Get('campaigns/:country')
    async getCampaignsByCountry(@Param('country') country: string) {
        return this.donateService.getCampaignsByCountry(country);
    }

}
