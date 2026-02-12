import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectResponseDto } from './dto/project-response.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectTech } from '../project-tech/project-tech.entity';
import { Tech } from '../tech/tech.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>,

  @InjectRepository(ProjectTech)
  private readonly projectTechRepository: Repository<ProjectTech>,

  @InjectRepository(Tech)
  private readonly techRepository: Repository<Tech>,
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
    const { techIds, ...projectData } = dto;
    const project = this.projectRepository.create({
      ...projectData,
      user: { user_id: userId },
    });

    await this.projectRepository.save(project);

    // 🔥 tech 연결
    if (techIds && techIds.length > 0) {
      const techs = await this.techRepository.findByIds(techIds);

      const projectTechs = techs.map((tech) =>
        this.projectTechRepository.create({
          project,
          tech,
        }),
      );
      await this.projectTechRepository.save(projectTechs);
    }
    return this.findOne(project.project_id);
  }

  async update(projectId: number, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { project_id: projectId },
      relations: ['projectTechs'],
    });
  
    if (!project) {
      throw new NotFoundException('수정할 프로젝트가 없습니다.');
    }
  
    const { techIds, ...updateData } = dto;
  
    Object.assign(project, updateData);
    await this.projectRepository.save(project);
  
    // 🔥 tech 교체 로직
    if (techIds) {
      // 기존 연결 삭제
      await this.projectTechRepository.delete({
        project: { project_id: projectId },
      });
  
      // 새로 생성
      const techs = await this.techRepository.findByIds(techIds);
  
      const newProjectTechs = techs.map((tech) =>
        this.projectTechRepository.create({
          project,
          tech,
        }),
      );
  
      await this.projectTechRepository.save(newProjectTechs);
    }
  
    return this.findOne(projectId);
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
      techs: project.projectTechs.map((pt) => ({
        tech_id: pt.tech.tech_id,
        name: pt.tech.name,
        slug: pt.tech.slug,
      })),
    };
  }
}
