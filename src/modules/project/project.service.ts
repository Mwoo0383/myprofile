import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectResponseDto } from './dto/project-response.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.find();

    return projects.map((p) => ({
      project_id: p.project_id,
      title: p.title,
      description: p.description,
      githubUrl: p.githubUrl,
      deployUrl: p.deployUrl,
    }));
  }

  async create(dto: CreateProjectDto, userId: number) {
    const project = this.projectRepository.create({
      ...dto,
      user: { user_id: userId },
    });

    await this.projectRepository.save(project);
    return project;
  }
}
