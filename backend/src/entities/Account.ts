import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany
} from 'typeorm';

import { Transaction } from './Transaction';
import { User } from './User';

@Entity('Accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'float'
  })
  balance?: number

  @OneToOne(() => User, (user) => user.account, {
    cascade: true
  })
  user: User

  @OneToMany(() => Transaction, (transaction) => transaction.accountOrigin, {
    cascade: true
  })
  transactionsOrigin: Transaction[]

  @OneToMany(() => Transaction, (transaction) => transaction.accountDestiny, {
    cascade: true
  })
  transactionsDestiny: Transaction[]
}