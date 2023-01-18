import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  RawBodyRequest,
  Req,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Authentify } from 'src/decorators/authentify';
import { DonateService } from './donate.service';
import { CreateAgencyDto, LoginDto } from './dto/agency.dto';
import { CampaignDto } from './dto/campaign.dto';
import { TransactionDto } from './dto/transaction.dto';

@Controller('api')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Post('webhook')
  webhook(@Req() req: RawBodyRequest<Request>) {
    const data = (req.body as any).data.object;
    console.log(data);

    console.log(data.payment_status);

    if (data.payment_status === 'paid') {
      const amount = data.amount_total;
      const pk = data.payment_link;
      return this.donateService.confirmTransaction(pk, amount);
    }
    return {
      ok: false,
    };
  }

  @Get('me')
  me(@Authentify() user) {
    return this.donateService.me(user ? user.id : null);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.donateService.login(data.email, data.password);
  }

  @Post('agency')
  createAgency(@Body() agency: CreateAgencyDto) {
    return this.donateService.createAgency(agency);
  }

  @Put('agency/approve/:id')
  approveAgency(@Param('id') id: string, @Authentify() user) {
    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException();
    }
    return this.donateService.approveAgency(id);
  }

  @Get('agency/:id')
  getAgency(@Param('id') id: string) {
     return this.donateService.getAgency(id);
  }

  //   @Get('campaign/:id')
  //   async getCampaign(@Param('id') id: string) {
  //     return this.donateService.getCampaign(id);
  //   }

  //   @Get('transaction/:id')
  //   async getTransaction(@Param('id') id: string) {
  //     return this.donateService.getTransaction(id);
  //   }

  //   @Get('transactions')
  //   async getTransactions() {
  //     return this.donateService.getTransactions();
  //   }

  @Get('campaigns')
  getCampaigns() {
    return this.donateService.getCampaigns();
  }

  @Get('agency')
  getAgencies() {
    return this.donateService.getAgencies();
  }

  @Get('campaign')
  getAgencyCampaigns(@Authentify() user) {
    if (!user || user.role !== 'agency') {
      throw new UnauthorizedException();
    }
    return this.donateService.getAgencyCampaigns(user.id);
  }

  @Get('agency/campaign/:id')
  getAgencyCampaignsById(@Param('id') id: string) {
    return this.donateService.getAgencyCampaigns(id);
  }

  //   @Get('campaign/:id/transactions')
  //   async getCampaignTransactions(@Param('id') id: string) {
  //     return this.donateService.getCampaignTransactions(id);
  //   }

  @Post('campaign')
  createCampaign(@Body() campaign: CampaignDto, @Authentify() user) {
    if (!user || user.role !== 'agency') {
      throw new UnauthorizedException();
    }

    return this.donateService.createCampaign(user.id, campaign);
  }

  @Post('tx')
  createTransaction(@Body() transaction: TransactionDto) {
    return this.donateService.createTransaction(transaction);
  }

  // @Get('campaigns/:country')
  // getCampaignsByCountry(@Param('country') country: string) {
  //   return this.donateService.getCampaigns(country);
  // }

  @Get('campaigns/all')
  getCampaignsByCountry() {
    return this.donateService.getCampaigns();
  }

  @Get('agency/tx/all')
  getAgencyTransactions(@Authentify() user) {
    if (!user || user.role !== 'agency') {
      throw new UnauthorizedException();
    }

    return this.donateService.getAgencyTransactions(user.id);
  }

  //   @Delete('delete/agency/:id')
  //   async deleteAgency(@Param('id') id: string) {
  //     return this.donateService.deleteAgency(id);
  //   }

  //   @Delete('delete/campaign/:id')
  //   async deleteCampaign(@Param('id') id: string) {
  //     return this.donateService.deleteCampaign(id);
  //   }

  //   @Put('launch/campaign/:id')
  //   async launchCampaign(@Param('id') id: string) {
  //     return this.donateService.launchCampaign(id);
  //   }

  //   @Get('agency/:id/collected')
  //   async getAgencyCollected(@Param('id') id: string) {
  //     return this.donateService.getAgencyCollected(id);
  //   }

  @Get('campaign/tx/raised')
  getCampaignRaised(@Authentify() user) {
    if (!user || user.role !== 'agency') {
      throw new UnauthorizedException();
    }
    return this.donateService.getCampaignRaised(user.id);
  }

  @Get('campaign/tx/raised/:campaign')
  getStatsCampaignRaised(@Authentify() user, @Param('campaign') campaign) {
    if (!user || user.role !== 'agency') {
      throw new UnauthorizedException();
    }
    return this.donateService.getStatsCampaignRaised(campaign);
  }

  //   @Get('agency/:id/activeCampaigns')
  //   async getAgencyActiveCampaigns(@Param('id') id: string) {
  //     return this.donateService.getAgencyActiveCampaigns(id);
  //   }

  // @Get('agency/tx/feedbacks')
  // getAgencyFeedbacks(@Authentify() user) {
  //   if (!user || user.role !== 'agency') {
  //     throw new UnauthorizedException();
  //   }
  //   return this.donateService.getAgencyFeedbacks(user.id);
  // }
}
