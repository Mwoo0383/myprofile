import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTech } from './project-tech.entity';
import { In, Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';
import { Project } from '../project/project.entity';
import { Tech } from '../tech/tech.entity';

@Injectable()
export class ProjectTechService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async updateProjectTechs(
    projectId: number,
    techSlugs: string[],
  ) {
    return this.dataSource.transaction(async (manager) => {

      // 1️⃣ 프로젝트 존재 확인
      const project = await manager.findOne(Project, {
        where: { project_id: projectId },
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      // 2️⃣ slug로 tech 조회
      const techs = await manager.find(Tech, {
        where: {
          slug: In(techSlugs),
        },
      });

      if (techs.length !== techSlugs.length) {
        throw new BadRequestException('Invalid tech slug included');
      }

      // 3️⃣ 기존 연결 삭제
      await manager.delete(ProjectTech, {
        project: { project_id: projectId },
      });

      // 4️⃣ 새 연결 생성
      const rows = techs.map((tech) =>
        manager.create(ProjectTech, {
          project,
          tech,
        }),
      );

      await manager.save(ProjectTech, rows);

      return { message: 'Project tech stack updated' };
    });
  }
}
