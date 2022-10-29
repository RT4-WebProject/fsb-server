import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get('agency/:id/transactons')
    async getAgencyTransactions(@Param('id') id: string) {
        return this.donateService.getAgencyTransactions(id);
    }

    @Put('approve/agency/:id')
    async approveAgency(@Param('id') id: string) {
        return this.donateService.approveAgency(id);
    }
    
    @Delete('delete/agency/:id')
    async deleteAgency(@Param('id') id: string) {
        return this.donateService.deleteAgency(id);
    }

    @Delete('delete/campaign/:id')
    async deleteCampaign(@Param('id') id: string) {
        return this.donateService.deleteCampaign(id);
    }

    @Put('launch/campaign/:id')
    async launchCampaign(@Param('id') id: string) {
        return this.donateService.launchCampaign(id);
    }

    @Get('agency/:id/collected')
    async getAgencyCollected(@Param('id') id: string) {
        return this.donateService.getAgencyCollected(id);
    }

    @Get('campaign/:id/raised')
    async getCampaignRaised(@Param('id') id: string) {
        return this.donateService.getCampaignRaised(id);
    }

    @Get('agency/:id/activeCampaigns')
    async getAgencyActiveCampaigns(@Param('id') id: string) {
        return this.donateService.getAgencyActiveCampaigns(id);
    }

    
    
}
