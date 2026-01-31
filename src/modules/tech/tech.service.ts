import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { Repository } from 'typeorm';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech)
    private readonly techRepository: Repository<Tech>,
  ) {}

  create(dto: CreateTechDto) {
    return this.techRepository.save(dto);
  }

  findAll() {
    return this.techRepository.find({
      order: { name: 'ASC' },
    });
  }

  findOne(slug: string) {
    return this.techRepository.findOne({
      where: { slug },
    });
  }

  async update(slug: string, dto: UpdateTechDto) {
    const tech = await this.findOne(slug);
    if (!tech) throw new NotFoundException('Tech not found');

    Object.assign(tech, dto);
    return this.techRepository.save(tech);
  }

  async remove(slug: string) {
    const tech = await this.findOne(slug);
    if (!tech) throw new NotFoundException('Tech not found');

    return this.techRepository.remove(tech);
  }
}