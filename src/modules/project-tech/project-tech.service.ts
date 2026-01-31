import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTech } from './project-tech.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class ProjectTechService {
  constructor(
    @InjectRepository(ProjectTech)
    private readonly projectTechRepository: Repository<ProjectTech>,
    private readonly dataSource: DataSource,
  ) {}

  async updateProjectTechs(projectId: number, techIds: number[]) {
    return this.dataSource.transaction(async (manager) => {
  
      // 1️⃣ 기존 연결 삭제
      await manager.delete(ProjectTech, {
        project: { project_id: projectId },
      });
  
      // 2️⃣ 새 연결 생성
      const rows = techIds.map((techId) =>
        manager.create(ProjectTech, {
          project: { project_id: projectId },
          tech: { tech_id: techId },
        }),
      );
  
      // 3️⃣ 저장
      await manager.save(ProjectTech, rows);
  
      return { message: 'Project tech stack updated' };
    });
  }  
}
