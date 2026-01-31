import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTechService } from './project-tech.service';

describe('ProjectTechService', () => {
  let service: ProjectTechService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTechService],
    }).compile();

    service = module.get<ProjectTechService>(ProjectTechService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
