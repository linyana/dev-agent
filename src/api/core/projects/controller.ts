import Elysia from 'elysia';
import { projectService } from './service';
import { CreateProjectSchema } from '@api/core/projects/types';

export const projectController = new Elysia({ prefix: '/projects' })
  .get('/', projectService.getProjects)
  .post('/', (ctx) => projectService.createProject(ctx), CreateProjectSchema)
  .delete('/:id', (ctx) => projectService.deleteProject(Number(ctx.params.id)));
