import { Router } from 'express';
import { createUser } from '../controllers/authController.js';

const authRouter = Router();
authRouter.post('/signup', createUser);

export default authRouter;