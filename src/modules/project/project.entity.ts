import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  import { ProjectTech } from '../project-tech/project-tech.entity';
import { ProjectResponseDto } from './dto/project-response.dto';
  
  @Entity('project')
  export class Project {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    project_id: number;
  
    @Column({ type: 'varchar', length: 255 })
    title: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'datetime', nullable: true })
    startDate: Date;
  
    @Column({ type: 'datetime', nullable: true })
    endDate: Date;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    githubUrl: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    thumbnailUrl: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    deployUrl: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @OneToMany(() => ProjectTech, (pt) => pt.project)
    projectTechs: ProjectTech[];
  }
  