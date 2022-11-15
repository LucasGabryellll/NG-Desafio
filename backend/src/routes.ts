import { Router, Request, Response } from "express";

import { getUsers } from "./controller/AdminController";

import { createUser, getProfile } from './controller/UserController';

import { loginUser } from './controller/LoginController';
import { authMiddleware } from "./middlewares/authMiddlewares";

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

/**
 * Login
 */
routes.post('/login', loginUser);

export default routes;