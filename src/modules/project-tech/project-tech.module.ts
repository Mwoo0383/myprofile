import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTech } from './project-tech.entity';
import { ProjectModule } from '../project/project.module';
import { TechModule } from '../tech/tech.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectTech]),
    forwardRef(() => ProjectModule),
    TechModule,
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class ProjectTechModule {}
