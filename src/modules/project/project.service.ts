import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectResponseDto } from './dto/project-response.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  // 전체 조회
  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.find({
      relations: ['projectTechs', 'projectTechs.tech'],
      order: { createdAt: 'DESC' },
    });
  
    return projects.map((project) =>
      this.toResponseDto(project),
    );
  }
  

  // 단일 조회
  async findOne(id: number): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.findOne({
      where: { project_id: id },
      relations: ['projectTechs', 'projectTechs.tech'],
    });
  
    if (!project) {
      throw new NotFoundException('Project not found');
    }
  
    return this.toResponseDto(project);
  }

  // 생성
  async create(dto: CreateProjectDto, userId: number) {
    const project = this.projectRepository.create({
      ...dto,
      user: { user_id: userId },
    });

    await this.projectRepository.save(project);
    return project;
  }

  // 수정
  async update(
    projectId: number,
    dto: UpdateProjectDto,
  ) {
    const project = await this.projectRepository.findOne({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException('수정할 프로젝트가 없습니다.');
    }

    Object.assign(project, dto);
    return this.projectRepository.save(project);
  }

  // 삭제
  async remove(projectId: number) {
    const project = await this.projectRepository.findOne({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException('삭제할 프로젝트가 없습니다.');
    }

    await this.projectRepository.remove(project);
    return { message: 'Project deleted successfully' };
  }

  private toResponseDto(project: Project): ProjectResponseDto {
    return {
      id: project.project_id,
      title: project.title,
      description: project.description,
      githubUrl: project.githubUrl,
      deployUrl: project.deployUrl,
      startDate: project.startDate,
      endDate: project.endDate,
      techs: project.projectTechs.map(
        (pt) => pt.tech.name,
      ),
    };
  }
}
