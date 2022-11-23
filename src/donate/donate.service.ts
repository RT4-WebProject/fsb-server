import {
  Inject,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  hashPassword,
  comparePassword,
  verifyToken,
  generateToken,
} from 'src/common/auth.utils';
import { User } from 'src/models/user.entity';
import { register } from 'src/payment/blockchain';
import { processTransaction } from 'src/payment/config';
import { Repository, Like, Double, Not } from 'typeorm';

import { Agency } from '../models/agency.entity';
import { Campaign } from '../models/campaign.entity';
import { Transaction } from '../models/transaction.entity';
import { CreateAgencyDto } from './dto/agency.dto';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class DonateService {
  constructor(
    @InjectRepository(Agency) private agencyRepository: Repository<Agency>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAgency(id: any) {
    return this.agencyRepository.findOne({
      where: {
        id,
      },
      select: [
        'id',
        'name',
        'email',
        'approved',
        'role',
        'description',
        'countries',
        'image',
        'phone',
      ],
    });
  }

  //   async getCampaign(id: any) {
  //     return this.campaignRepository.findOne(id);
  //   }

  //   async getTransaction(id: any) {
  //     return this.transactionRepository.findOne(id);
  //   }

  //   async getTransactions() {
  //     return this.transactionRepository.find();
  //   }

  getCampaigns() {
    return this.campaignRepository.find({
      where: {},
    });
  }

  getAgencies() {
    return this.agencyRepository.find({
      where: {},
      select: [
        'id',
        'name',
        'email',
        'approved',
        'role',
        'description',
        'countries',
        'image',
        'phone',
      ],
    });
  }

  getAgencyCampaigns(id: any) {
    return this.campaignRepository.find({
      where: {
        launchedBy: id,
      },
    });
  }

  //   async getCampaignTransactions(id: any) {
  //     return this.transactionRepository.find({
  //       where: {
  //         campaignID: id,
  //       },
  //     });
  //   }

  createCampaign(by: number, _campaign: any) {
    const campaign = new Campaign();
    campaign.title = _campaign.title;
    campaign.description = _campaign.description;
    campaign.image = _campaign.image;
    campaign.goal = _campaign.goal;
    campaign.link = _campaign.link;
    campaign.country = _campaign.country;
    campaign.launchedBy = by;

    return this.campaignRepository.save(campaign);
  }

  async confirmTransaction(pk: any, amount: any) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        pk,
      },
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    transaction.amount = amount / 100;
    transaction.approved = true;

    await this.transactionRepository.save(transaction);

    const tx = await register(
      transaction.from,
      transaction.agencyID,
      amount / 100,
    );

    transaction.receiptBlockchain = tx.toString();

    await this.transactionRepository.save(transaction);

    return {
      done: true,
    };
  }

  async createTransaction(_transaction: TransactionDto) {
    const transaction = new Transaction();
    transaction.from = _transaction.from;
    transaction.fromCountry = _transaction.fromCountry;
    transaction.campaignID = _transaction.campaign;
    transaction.agencyID = _transaction.agency;
    transaction.feedback = _transaction.feedback;

    // amount: number;
    // receiptStripe: string;
    // receiptBlockchain: string;

    const { url, id } = await processTransaction(
      Number(transaction.id),
      `Donation to ${_transaction.title}`,
      `${transaction.from} donating to ${_transaction.title}`,
    );

    transaction.pk = id;
    await this.transactionRepository.save(transaction);
    return {
      url,
    };
  }

  //   async getCampaignsByCountry(country: string) {
  //     return this.campaignRepository.find({
  //       where: {
  //         countries: Like(`%${country}%`),
  //       },
  //     });
  //   }

  getAgencyTransactions(id: any) {
    console.log('id', id);

    return this.transactionRepository.find({
      where: {
        agencyID: id,
        approved: true,
      },
    });
  }

  async approveAgency(id: any) {
    const agency = await this.agencyRepository.findOne({
      where: {
        id,
      },
    });
    agency.approved = true;
    await this.agencyRepository.save(agency);
    return {
      done: true,
    };
  }

  //   async deleteAgency(id: any) {
  //     return this.agencyRepository.delete(id);
  //   }

  //   async deleteCampaign(id: any) {
  //     return this.campaignRepository.delete(id);
  //   }

  //   async launchCampaign(id: any) {
  //     const campaign = await this.campaignRepository.findOne(id);
  //     campaign.activeNow = true;
  //     return this.campaignRepository.save(campaign);
  //   }

  async getCampaignRaised(id: any) {
    const transactions = await this.transactionRepository.find({
      where: {
        agencyID: id,
        approved: true,
      },
    });
    let raised = 0;
    transactions.forEach((transaction) => {
      raised += transaction.amount;
    });
    return raised;
  }

  async getStatsCampaignRaised(id: any) {
    const transactions = await this.transactionRepository.find({
      where: {
        campaignID: id,
        approved: true,
      },
    });
    let raised = 0;
    transactions.forEach((transaction) => {
      raised += transaction.amount;
    });
    return raised;
  }

  //   async getAgencyCollected(id: any) {
  //     const transactions = await this.transactionRepository.find({
  //       where: {
  //         agencyID: id,
  //       },
  //     });
  //     let collected = 0;
  //     transactions.forEach((transaction) => {
  //       collected += transaction.amount;
  //     });
  //     return collected;
  //   }

  //   async getAgencyActiveCampaigns(id: any) {
  //     return this.campaignRepository.find({
  //       where: {
  //         launchedBy: id,
  //         activeNow: true,
  //       },
  //     });
  //   }

  getAgencyFeedbacks(id: any) {
    return this.transactionRepository.find({
      where: {
        agencyID: id,
        approved: true,
        feedback: Not(Like('')),
      },
      select: ['id', 'feedback'],
    });
  }

  async createAgency(_agency: CreateAgencyDto) {
    try {
      const agency = new Agency();
      agency.name = _agency.name;
      agency.email = _agency.email;
      agency.password = await hashPassword(_agency.password);
      agency.approved = false;
      agency.countries = _agency.countries;
      agency.description = _agency.description;
      agency.image = _agency.image;
      agency.phone = _agency.phone;
      agency.role = 'agency';

      await this.agencyRepository.save(agency);
      return {
        done: true,
      };
    } catch (e) {
      if (e.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
    }
  }

  async me(id: any) {
    console.log(id);

    if (!id) {
      throw new ForbiddenException('Not Authorized');
    }
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'email', 'role'],
    });
    if (!user) {
      const agency = await this.agencyRepository.findOne({
        where: {
          id,
        },
        select: [
          'id',
          'name',
          'email',
          'approved',
          'role',
          'image',
          'description',
          'countries',
        ],
      });
      if (!agency) {
        throw new ForbiddenException();
      }

      return agency;
    }
    return user;
  }

  private async userLogin(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      throw new ForbiddenException('Invalid password');
    }

    return user;
  }

  private async agencyLogin(email: string, password: string) {
    const user = await this.agencyRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    if (!user.approved) {
      throw new ForbiddenException('Agency not approved');
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      throw new ForbiddenException('Invalid password');
    }

    return user;
  }

  async login(email: string, password: string) {
    let user = await this.userLogin(email, password);
    if (!user) {
      user = await this.agencyLogin(email, password);
    }

    if (!user) {
      throw new ForbiddenException('Invalid email');
    }

    const token = await generateToken(user);

    return {
      token,
      role: user.role,
    };
  }

  //   async createUser() {
  //     console.log(await Agency.delete({}));
  //     const user = new User();
  //     user.email = 'admin@gmail.com';
  //     user.password = await hashPassword('admin');
  //     user.role = 'admin';
  //     await this.userRepository.save(user);
  //     return;
  //   }
}
