import { User } from '../entities/User';
import { Account } from '../entities/Account';

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>
    }

    export interface Request {
      account: Partial<Account>
    }
  }
}