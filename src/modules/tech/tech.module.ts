import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from './tech.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tech]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class TechModule {}
