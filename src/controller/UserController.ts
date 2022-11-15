import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { accountRepository } from "../repositories/accountRepository";

import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const number = /[0-9]/;
  const caracterUpper = /[A-Z]/

  const checkNumberInPassword = number.test(password);
  const checkCaracterUpperInPassword = caracterUpper.test(password);

  if (!username) {
    return res.status(400).json({ message: "O campo Usuário é Obrigatório" });
  }

  if (!password) {
    return res.status(400).json({ message: "O campo Password é Obrigatório" });
  }

  try {
    if (username.length >= 3) {
      if (password.length >= 8) {
        if (checkNumberInPassword) {
          if (checkCaracterUpperInPassword) {
            const userExist = await userRepository.findOneBy({ username: username.toLowerCase().trim() });

            if (userExist) {
              return res.status(400).json({ message: 'Já existe um usuario com esse Username, tente outro!' });
            }

            const newAccount = accountRepository.create({ balance: 100 });

            const account = await accountRepository.save(newAccount);

            const hashPassword = await bcrypt.hash(password, 10);

            const userSave = await userRepository.save({
              username: username.toLowerCase().trim(),
              password: hashPassword,
              account
            });

            const { password: _, ...user } = userSave;

            return res.status(201).json({ message: "Usuario criado com sucesso", user: user });
          }

          return res.status(400).json({ message: 'Sua senha deve ter no mínimo 1 Caracter Maiúsculo!' });
        }

        return res.status(400).json({ message: 'Sua senha deve ter no mínimo 1 Número!' });
      }

      return res.status(400).json({ message: 'Sua senha deve ser composta de no mínimo 8 Caracteres!' });

    }

    return res.status(400).json({ message: 'O campo Usuário deve conter no mínimo 3 Caracteres!' });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getProfile = async (req: Request, res: Response) => {

  return res.json(req.user);
}