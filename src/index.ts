import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import cors from 'koa2-cors';
import { loadRoutes } from './routing';

const SERVER_PORT = process.env.PORT ? process.env.PORT : 8880;

(async () => {
  await createConnection();

  const app = new Koa();

  const router = loadRoutes();

  app.use(cors());
  app.use(bodyParser());

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(SERVER_PORT);
  console.log(`Server listening on ${SERVER_PORT} port`);
})();
