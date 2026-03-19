import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { projectController } from './core';
import { transformResponse } from './common';

const app = new Elysia({ prefix: '/api' })
  .use(cors())
  .onAfterHandle(transformResponse)
  .onError(({ error }) => {
    console.error(error);
    const msg = 'message' in error ? error.message : 'Unknown error';
    return {
      status: 400,
      data: null,
      meta: { message: msg },
    };
  })
  .use(projectController)
  .listen(48327);

console.log(`
   ███████╗██╗  ██╗   ██╗███████╗██╗ █████╗ 
   ██╔════╝██║  ╚██╗ ██╔╝██╔════╝██║██╔══██╗
   █████╗  ██║   ╚████╔╝ ███████╗██║███████║
   ██╔══╝  ██║    ╚██╔╝  ╚════██║██║██╔══██║
   ███████╗███████╗██║   ███████║██║██║  ██║
   ╚══════╝╚══════╝╚═╝   ╚══════╝╚═╝╚═╝  ╚═╝

      ⚡ Elysia Server Ready on ${app.server?.port} ✔
`);
