import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { UserModule } from '../user/user.module';
import { ProjectTechModule } from '../project-tech/project-tech.module';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectTech } from '../project-tech/project-tech.entity';
import { Tech } from '../tech/tech.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectTech,
      Tech,
    ]),
    UserModule,
    forwardRef(() => ProjectTechModule),
  ],
  exports: [
    TypeOrmModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
