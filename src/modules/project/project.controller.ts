import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectTechDto } from '../project-tech/dto/update-project-tech.dto';
import { ProjectTechService } from '../project-tech/project-tech.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectTechService: ProjectTechService,
) {}

  // 공개
  @Get()
  getProjects() {
    return this.projectService.findAll();
  }

  @Get(':id')
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectService.findOne(id);
  }

  // 관리자만
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  createProject(
    @Body() dto: CreateProjectDto,
    @Req() req,
  ) {
    console.log('req.user:', req.user);

    return this.projectService.create(dto, req.user.user_id);
  }

  // 🔐 관리자만 수정
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id/techs')
  async updateProjectTechs(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectTechDto,
  ) {
  await this.projectTechService.removeByProject(id);
  return this.projectTechService.addTechsToProject(id, dto.techIds);
}


  // 🔐 관리자만 삭제
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deleteProject(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectService.remove(id);
  }
}
