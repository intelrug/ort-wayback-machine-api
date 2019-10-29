import * as Joi from 'joi';

export const MessageSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .positive()
    .description('Message ID')
    .required(),
  time: Joi.number()
    .integer()
    .positive()
    .description('The time the message was sent')
    .required(),
  userId: Joi.number()
    .integer()
    .greater(-1)
    .description('Id of the message sender')
    .required(),
  username: Joi.string()
    .allow('')
    .description('Username of the message sender'),
  text: Joi.string()
    .allow('')
    .description('Message text'),
  raw: Joi.string()
    .allow('')
    .description('Message with full content'),
  imgParsed: Joi.number()
    .integer()
    .allow('0', '1'),
});
