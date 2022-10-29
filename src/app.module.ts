import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { Agency } from './models/agency.entity';
import { Campaign } from './models/campaign.entity';
import { Transaction } from './models/transaction.entity';
import { DonateModule } from './donate/donate.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [DonateModule, TypeOrmModule.forRoot(configService.getTypeOrmConfig()), TypeOrmModule.forFeature([Agency, Campaign, Transaction]), CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
