export class ProjectResponseDto {
    project_id: number;
    title: string;
    description: string | null;
    githubUrl: string | null;
    deployUrl: string | null;
}  