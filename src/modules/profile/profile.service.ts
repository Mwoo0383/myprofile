import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getProfile(): Promise<ProfileResponseDto> {
    const profiles = await this.profileRepository.find({
      relations: ['user'],
    });
  
    if (profiles.length === 0) {
      throw new NotFoundException('Profile not found');
    }
    const profile = profiles[0];
  
    return {
      name : profile.name,
      bio : profile.bio,
      phone : profile.phone,
      email : profile.user.email,
    }
  }
}