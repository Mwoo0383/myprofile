import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTech } from './project-tech.entity';
import { ProjectModule } from '../project/project.module';
import { TechModule } from '../tech/tech.module';
import { ProjectTechService } from './project-tech.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectTech]),
    forwardRef(() => ProjectModule),
    TechModule,
  ],
  exports: [
    ProjectTechService,
  ],
  providers: [ProjectTechService],
})
export class ProjectTechModule {}
