import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  
  @Entity('profile')
  export class Profile {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    profile_id: number;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    github: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    blog: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    myImg: string;
  
    @Column({ type: 'text', nullable: true })
    bio: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    phone: string;
  
    @OneToOne(() => User, (user) => user.profiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  }
  