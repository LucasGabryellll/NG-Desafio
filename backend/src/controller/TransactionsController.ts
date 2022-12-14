import { Request, Response } from "express";
import { accountRepository } from '../repositories/accountRepository';
import { transactionRepository } from '../repositories/transactionRepository';
import { userRepository } from "../repositories/userRepository";

import bcrypt from 'bcrypt';

export const get_Transactions = async (req: Request, res: Response) => {
  const user = req.user;

  // Retorna as transações Enviadas "Cash-out"
  const cash_out = await transactionRepository.find({
    where: {
      accountOrigin: {
        id: user.account?.id
      }
    }
  });

  // Retorna as transações Recebidas "Cash-in"
  const cash_in = await transactionRepository.find({
    where: {
      accountDestiny: {
        id: user.account?.id
      }
    }
  });

  return res.json([
    {
      "user": {
        "id": user.id,
        "username": user.username,
        "cash_out": cash_out,
        "cash_in": cash_in
      }
    }
  ]);
};

export const details_transaction = async (req: Request, res: Response) => {

}

export const accomplish_transaction = async (req: Request, res: Response) => {
  const { value, username, password } = req.body;

  const accountDebited = req.user;
  const balanceAccountDebited = req.user.account?.balance ?? 0;

  const valueDebited = balanceAccountDebited - value;

  if (accountDebited.username == username) {
    return res.status(400).json({ message: "Não é possível realizar uma transferência para sua própria conta!" });
  }

  if (value <= 0) {
    return res.status(400).json({ message: "O valor mínimo de transferência é de R$ 1,00" });
  }

  // Retorna a conta do usuario que vai realizar o Cash-out.
  const userAccountDebited = await accountRepository.findOne({
    where: {
      id: req.user.account?.id
    }
  });

  // Busca o usuario que tera o Cash-in.
  const userCrebited = await userRepository.findOne({
    where: {
      username: username
    }
  });

  const userExist = await userRepository.findOneBy({ username: req.user.username });
  const { ...t } = userExist;
  const verifyPassword = await bcrypt.compare(password, t?.password);

  if (!verifyPassword) {
    return res.status(400).json({ message: "Senha incorreta, verifique sua senha tente novamente"});
  }

  if (userCrebited != null) {
    if (value > balanceAccountDebited) {
      return res.status(400).json({ message: `Só é possível realizar uma transferencia de no máximo: R$ ${balanceAccountDebited}` })
    }

    // Retorna a conta do usuario que terá o Cash-in.
    const userAccountCrebited = await accountRepository.findOne({
      where: {
        id: userCrebited.account.id
      }
    });

    try {
      await accountRepository.update(userAccountDebited?.id ?? '', {
        balance: valueDebited
      });

      await accountRepository.update(userAccountCrebited?.id ?? '', {
        balance: userAccountCrebited?.balance + value
      });

      await transactionRepository.save({
        value: value,
        accountOrigin: accountDebited.account,
        accountDestiny: userCrebited.account
      });

    } catch (error) {
      return res.status(400).json({ message: "Erro ao realizar transferencia" });
    }

    return res.json({ message: `A Transferencia para ${username}, foi realizada com sucesso`, valueDebited: value, balanceUpdate: valueDebited });
  }

  return res.status(404).json({ message: "Erro na transferência, Conta de destino não encontrada!" });
}