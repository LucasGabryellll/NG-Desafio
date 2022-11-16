import { Request, Response } from "express";
import { accountRepository } from '../repositories/accountRepository';
import { transactionRepository } from '../repositories/transactionRepository';
import { userRepository } from "../repositories/userRepository";

export const get_Transactions = async (req: Request, res: Response) => {
  const transactions = await transactionRepository.find();

  return res.json(transactions);
};

export const accomplish_transaction = async (req: Request, res: Response) => {
  const { value, username } = req.body;

  const accountDebited = req.user;
  const balanceAccountDebited = req.user.account?.balance ?? 0;

  const valueDebited = balanceAccountDebited - value;

  if (accountDebited.username == username) {
    return res.status(400).json({ message: "Não é possível realizar uma transferência para sua própria conta!" });
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