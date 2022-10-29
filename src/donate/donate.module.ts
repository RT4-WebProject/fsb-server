import { Module } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.entity';
import { Agency } from 'src/models/agency.entity';
import { Campaign } from 'src/models/campaign.entity';
import { User } from 'src/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Agency, Campaign, User])],
  providers: [DonateService],
  controllers: [DonateController],
})
export class DonateModule {}
