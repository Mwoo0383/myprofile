import { Controller, Get } from '@nestjs/common';
import { TechService } from './tech.service';

@Controller('techs')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  getTechs() {
    return this.techService.findAll();
  }
}
