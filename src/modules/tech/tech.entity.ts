import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectTech } from '../project-tech/project-tech.entity';

@Entity('tech')
export class Tech {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  tech_id: number;  // DB 내부용

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;     // UI 표시용

  @Column({ unique: true })
  slug: string;     // API 식별용

  @OneToMany(() => ProjectTech, (pt) => pt.tech)
  projectTechs: ProjectTech[];
}
