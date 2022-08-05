import { Router } from 'express';
import { createUser, loginUser } from '../controllers/authController.js';

const authRouter = Router();
authRouter.post('/signup', createUser);
authRouter.post('/signin', loginUser);

export default authRouter;