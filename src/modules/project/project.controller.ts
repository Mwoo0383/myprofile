import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // 공개
  @Get()
  getProjects() {
    return this.projectService.findAll();
  }

  // 관리자만
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  createProject(
    @Body() dto: CreateProjectDto,
    @Req() req,
  ) {
    return this.projectService.create(dto, req.user.user_id);
  }
}
