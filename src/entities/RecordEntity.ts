import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('records')
export default class RecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @Column({
    type: 'datetime',
  })
  private date: string;

  @Column()
  private src: string;
}
