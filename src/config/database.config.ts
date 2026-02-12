// src/config/database.config.ts
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    url: configService.get<string>('DATABASE_URL'),

    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
};
