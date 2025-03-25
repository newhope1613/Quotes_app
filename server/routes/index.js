import { Router } from 'express';
import quoteRoute from './quoteRoute.js';
import userRouter from './userRoute.js';

const routes = Router();

routes.use('/quote', quoteRoute);
routes.use('/user', userRouter);

export default routes;
