import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Project } from '../project/project.entity';
  import { Tech } from '../tech/tech.entity';
  
  @Entity('project_tech')
  export class ProjectTech {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    prjTec_id: number;
  
    @ManyToOne(() => Project, (project) => project.projectTechs, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: Project;
  
    @ManyToOne(() => Tech, (tech) => tech.projectTechs, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'tech_id' })
    tech: Tech;
  }
  