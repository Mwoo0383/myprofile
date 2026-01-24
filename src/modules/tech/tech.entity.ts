import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectTech } from '../project-tech/project-tech.entity';

@Entity('tech')
export class Tech {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  tech_id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => ProjectTech, (pt) => pt.tech)
  projectTechs: ProjectTech[];
}
