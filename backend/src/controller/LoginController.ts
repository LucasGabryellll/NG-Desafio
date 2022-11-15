import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userExist = await userRepository.findOneBy({ username: username.toLowerCase().trim() });

  if (!userExist) {
    return res.status(404).json({ message: 'Username ou senha inválidos' });

  }

  const verifyPassword = await bcrypt.compare(password, userExist.password);

  if (!verifyPassword) {
    return res.status(400).json({ message: 'Senha incorreta!' });

  }

  const { password:_, ...userLogin } = userExist;

  const token = jwt.sign({ id: userExist.id }, process.env.JWT_PASSWORD ?? '', { expiresIn: '24h' });

  return res.json({ 
    user: userLogin,
    token: token
   });
}