import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  deployUrl?: string;

  @IsNumber()
  techIds: number[];
}
