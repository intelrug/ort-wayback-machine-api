import * as Joi from 'joi';

export const RecordSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .positive()
    .description('Record ID')
    .example(5)
    .required(),
  name: Joi.string()
    .description('Record name')
    .example('ORT. Guest - OldBoy')
    .required(),
  date: Joi.date()
    .description('Record date')
    .example('2012-09-17 20:00:00')
    .required(),
  src: Joi.string()
    .description('Record source file')
    .example('2012-09-17.mp3'),
});
