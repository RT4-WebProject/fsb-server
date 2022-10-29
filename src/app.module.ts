import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { Agency } from './models/agency.entity';
import { Campaign } from './models/campaign.entity';
import { Transaction } from './models/transaction.entity';
import { DonateModule } from './donate/donate.module';
import { DonateController } from './donate/donate.controller';
import { DonateService } from './donate/donate.service';
import { User } from './models/user.entity';

console.log(
  configService.getTypeOrmConfig([User, Agency, Campaign, Transaction]),
);

@Module({
  imports: [
    TypeOrmModule.forRoot(
      configService.getTypeOrmConfig([User, Agency, Campaign, Transaction]),
    ),
    DonateModule,
    User,
    Agency,
    Campaign,
    Transaction,
    TypeOrmModule.forFeature([User, Agency, Campaign, Transaction]),
  ],
  controllers: [DonateController],
  providers: [DonateService],
})
export class AppModule {}
