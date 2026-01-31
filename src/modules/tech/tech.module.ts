import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { TechController } from './tech.controller';
import { TechService } from './tech.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tech]),
  ],
  exports: [
    TypeOrmModule,
  ],
  controllers: [TechController],
  providers: [TechService],
})
export class TechModule {}
