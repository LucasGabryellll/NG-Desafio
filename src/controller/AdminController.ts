import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();

  try {
    return res.json(users);

  } catch (error) {
    return res.status(404).json({ error: "Error", message: "Users not Found!" });
  }

}