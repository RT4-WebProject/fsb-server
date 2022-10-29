import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}
  // ...
  public getTypeOrmConfig(entities: any[]): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.env.POSTGRES_HOST,
      port: parseInt(this.env.POSTGRES_PORT, 10),
      username: this.env.POSTGRES_USER,
      password: this.env.POSTGRES_PASSWORD,
      database: this.env.POSTGRES_DB,
      entities,
      synchronize: true,
      connectTimeoutMS: 3000,
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
