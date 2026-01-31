import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech)
    private readonly techRepository: Repository<Tech>,
  ) {}

  findAll() {
    return this.techRepository.find();
  }
}
