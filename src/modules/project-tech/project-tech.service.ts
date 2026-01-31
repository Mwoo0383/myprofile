import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTech } from './project-tech.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectTechService {
  constructor(
    @InjectRepository(ProjectTech)
    private readonly projectTechRepository: Repository<ProjectTech>,
  ) {}

  async addTechsToProject(projectId: number, techIds: number[]) {
    const rows = techIds.map((techId) =>
      this.projectTechRepository.create({
        project: { project_id: projectId },
        tech: { tech_id: techId },
      }),
    );

    return this.projectTechRepository.save(rows);
  }

  async removeByProject(projectId: number) {
    return this.projectTechRepository.delete({
      project: { project_id: projectId },
    });
  }
}
