import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export const getUsers = async (req: Request, res: Response) => {
  
  try {
    const users = await userRepository.find();
    return res.json(users);

  } catch (error) {
    return res.status(404).json({ error: "Error", message: "Users not Found!" });
  }

}