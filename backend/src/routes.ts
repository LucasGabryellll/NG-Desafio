import { Router, Request, Response } from "express";

import { getUsers } from "./controller/AdminController";

import { createUser, getProfile, getUser } from './controller/UserController';

import { loginUser } from './controller/LoginController';
import { authMiddleware } from "./middlewares/authMiddlewares";

import { getAccounts } from './controller/AccountControllers';

import { get_Transactions, accomplish_transaction } from "./controller/TransactionsController";

const routes = Router();

/**
 * Rotas para Admin
 */
routes.get('/all_users', authMiddleware, getUsers);

/**
 * Rotas para Usuarios
 */
routes.post('/create_user', createUser);
routes.get('/profile', authMiddleware, getProfile);
routes.get('/user', authMiddleware, getUser);

/**
 * Login
 */
routes.post('/login', loginUser);

/**
 * Rotas para Account
 */
routes.get('/accounts', getAccounts);

/**
 * Rotas para Transaction
 */
routes.get('/transactions', authMiddleware, get_Transactions);
routes.post('/accomplish_transaction', authMiddleware, accomplish_transaction);

export default routes;