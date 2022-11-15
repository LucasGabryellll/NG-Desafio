import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Account } from './Account';

@Entity('Transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'float',
    unique: false
  })
  value: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Account, (account) => account.transactionsOrigin)
  @JoinColumn({ name: "debitedAccountId" })
  accountOrigin: Account

  @ManyToOne(() => Account, (account) => account.transactionsDestiny)
  @JoinColumn({ name: "creditedAccountId" })
  accountDestiny: Account
}