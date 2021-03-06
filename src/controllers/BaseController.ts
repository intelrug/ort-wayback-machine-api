import { BaseContext } from 'koa';
import {
  controller, description, get, response, summary, tag,
} from 'koa-joi-swagger-ts';
import { APIInfoResponseSchema } from './schemas/APIInfoResponseSchema';

@controller('/api/v1')
export abstract class BaseController {
  @get('/')
  @response(200, { $ref: APIInfoResponseSchema })
  @tag('GET')
  @description('Returns text info about version of API')
  @summary('Show API index page')
  public async index(ctx: BaseContext): Promise<void> {
    console.log('GET /api/v1/');
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {
        appVersion: '1.0.0',
        build: '1001',
        apiVersion: 1,
        reqHeaders: ctx.headers,
        apiDoc: '/api/v1/swagger.json',
      },
    };
  }
}
