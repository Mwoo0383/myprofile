import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TechService } from './tech.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';

@Controller('techs')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  findAll() {
    return this.techService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() dto: CreateTechDto) {
    return this.techService.create(dto);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('slug') slug: string,
    @Body() dto: UpdateTechDto,
  ) {
    return this.techService.update(slug, dto);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('slug') slug: string) {
    return this.techService.remove(slug);
  }
}
