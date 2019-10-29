import { KJSRouter } from 'koa-joi-swagger-ts';
import { BaseContext } from 'koa';
import { BaseController } from './controllers/BaseController';
import { BaseAPIResponseSchema } from './controllers/schemas/BaseAPIResponseSchema';
import { APIInfoResponseSchema } from './controllers/schemas/APIInfoResponseSchema';
import { RecordController } from './controllers/RecordController';
import { TransferObjectUtils } from './utils/transferObject.utils';
import { MessageController } from './controllers/MessageController';

const SERVER_HOST = process.env.HOST ? process.env.HOST : 'localhost';

const controllerDecorator = async (
  controller: Function,
  ctx: BaseContext,
  next: Function,
  summary: string,
): Promise<void> => {
  ctx.body = null;
  ctx.status = 400;
  ctx.message = `Error while executing '${summary}'`;
  try {
    await controller(ctx);
  } catch (e) {
    console.log(e, `Error while executing '${summary}'`);
    ctx.status = 500;
  }
  if (!ctx.body && ctx.status === 200) {
    ctx.status = 204;
  }
  ctx.body = TransferObjectUtils.createResponseObject(ctx.status, ctx.message, ctx.body);
};

export const loadRoutes = () => {
  const router = new KJSRouter({
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'ORT Wayback Machine API',
    },
    host: `${SERVER_HOST}`,
    basePath: '/api/v1',
    schemes: ['http'],
    paths: {},
    definitions: {},
  });

  router.loadDefinition(APIInfoResponseSchema);
  router.loadDefinition(BaseAPIResponseSchema);

  router.loadController(BaseController);
  router.loadController(RecordController, controllerDecorator);
  router.loadController(MessageController, controllerDecorator);

  router.setSwaggerFile('swagger.json');
  router.loadSwaggerUI('/api/docs');

  return router.getRouter();
};
