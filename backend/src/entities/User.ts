import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { Account } from './Account';

@Entity('Users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: '50',
    unique: true
  })
  username: string

  @Column({
    type: 'varchar',
    length: '254',
    unique: false
  })
  password: string

  @OneToOne(() => Account, (account) => account.user, {
    eager: true
  })
  @JoinColumn({ name: 'accountId' })
  account: Account
}