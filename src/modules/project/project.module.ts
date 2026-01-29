import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { UserModule } from '../user/user.module';
import { ProjectTechModule } from '../project-tech/project-tech.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UserModule,
    forwardRef(() => ProjectTechModule),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class ProjectModule {}
