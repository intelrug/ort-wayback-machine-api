import { BaseContext } from 'koa';
import {
  controller,
  description,
  ENUM_PARAM_IN,
  get,
  parameter,
  response,
  summary,
  tag,
} from 'koa-joi-swagger-ts';
import * as Joi from 'joi';
import { BaseController } from './BaseController';
import { BaseAPIResponseSchema } from './schemas/BaseAPIResponseSchema';
import MessageEntity from '../entities/MessageEntity';
import { MessageSchema } from './schemas/MessageSchema';

@controller('/messages')
export abstract class MessageController extends BaseController {
  @get('/')
  @parameter('time', Joi.number().integer().positive(), ENUM_PARAM_IN.query)
  @parameter('reverse', Joi.boolean(), ENUM_PARAM_IN.query)
  @parameter('limit', Joi.number().integer().positive(), ENUM_PARAM_IN.query)
  @response(200, Joi.array().items(MessageSchema))
  @response(400, { $ref: BaseAPIResponseSchema })
  @response(500, { $ref: BaseAPIResponseSchema })
  @tag('Message')
  @description('Returns list of messages')
  @summary('Get messages')
  public async getMany(ctx: BaseContext): Promise<void> {
    const time: number = ctx.query.time ? +ctx.query.time : 0;
    const reverse: boolean = ctx.query.reverse !== 'false';
    const limit: number = ctx.query.limit ? +ctx.query.limit : 100;
    const serviceResult = await MessageEntity.getMany(time, reverse, limit);
    if (serviceResult) {
      ctx.status = 200;
      ctx.body = serviceResult;
    }
  }
}
