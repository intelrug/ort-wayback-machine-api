import { BaseContext } from 'koa';
import {
  controller,
  description,
  get,
  response,
  summary,
  tag,
} from 'koa-joi-swagger-ts';
import * as Joi from 'joi';
import { BaseController } from './BaseController';
import { BaseAPIResponseSchema } from './schemas/BaseAPIResponseSchema';
import RecordEntity from '../entities/RecordEntity';
import { RecordSchema } from './schemas/RecordSchema';

@controller('/records')
export abstract class RecordController extends BaseController {
  @get('/')
  @response(200, Joi.array().items(RecordSchema))
  @response(400, { $ref: BaseAPIResponseSchema })
  @response(500, { $ref: BaseAPIResponseSchema })
  @tag('Record')
  @description('Returns list of all records')
  @summary('Get all records')
  public async getMany(ctx: BaseContext): Promise<void> {
    const serviceResult = await RecordEntity.find();
    if (serviceResult) {
      ctx.status = 200;
      ctx.body = serviceResult;
    }
  }
}
