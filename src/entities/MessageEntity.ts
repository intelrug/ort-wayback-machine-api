import {
  BaseEntity, Column, Entity, If, Index, LessThan, MoreThan, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chat')
export default class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index('time-idx')
  time: number;

  @Column({
    name: 'userid',
  })
  userId: number;

  @Column({
    name: 'nick',
  })
  username: string;

  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'text',
  })
  raw: string;

  @Column({
    name: 'img_parsed',
    type: 'tinyint',
  })
  imgParsed: number;

  public static async getMany(
    time: number = 0, reverse: boolean = false, limit: number = 100,
  ): Promise<MessageEntity[]> {
    return MessageEntity.find({
      where: {
        time: If(time, time === 0 || !reverse ? MoreThan(time) : LessThan(time)),
      },
      take: limit,
      order: {
        time: reverse ? 'DESC' : 'ASC',
      },
    });
  }
}
