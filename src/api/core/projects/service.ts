import { prisma } from '@api/utils';
import { ICreateProjectRequestType } from '@api/core/projects/types';

class ProjectService {
  async getProjects() {
    return prisma.projects.findMany({ orderBy: { updatedAt: 'desc' } });
  }

  async deleteProject(id: number) {
    return prisma.projects.delete({ where: { id } });
  }

  async createProject(ctx: { body: ICreateProjectRequestType }) {
    const { name, path, description, color } = ctx.body;

    return prisma.projects.create({
      data: {
        name,
        path,
        description: description || '',
        ...(color ? { color } : {}),
      },
    });
  }
}

export const projectService = new ProjectService();
