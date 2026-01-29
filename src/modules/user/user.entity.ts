import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    OneToOne,
  } from 'typeorm';
  import { Role } from '../../common/enums/role.enum';
  import { Project } from '../project/project.entity';
  import { Profile } from '../profile/profile.entity';
  
  @Entity('user')
  export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    user_id: number;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255 })
    password: string;
  
    @Column({ type: 'varchar', length: 20 })
    role: Role;
  
    @CreateDateColumn()
    createdAt: Date;
  
    /* relations */
    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
  
    @OneToOne(() => Profile, (profile) => profile.user)
    profiles: Profile[];
  }
  