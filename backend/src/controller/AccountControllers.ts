import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';

export const getAccounts = async (req: Request, res: Response) => {
  const accounts = await accountRepository.find();

  res.json(accounts);
};