export class ProjectResponseDto {
  id: number;
  title: string;
  description: string;
  githubUrl?: string;
  deployUrl?: string;
  startDate?: Date;
  endDate?: Date;
  techs: {
    tech_id: number;
    name: string;
  }[];
}
