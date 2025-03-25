import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const routes = Router();

routes.post('/login', UserController.login);
routes.post('/registration', UserController.registration);
routes.post('/check', authMiddleware, UserController.checkAuth);

export default routes;
