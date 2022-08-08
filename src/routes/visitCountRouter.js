import {Router} from 'express';
import { getRanking, getUserMe } from '../controllers/visitCountController.js';

import { userMiddleware } from '../middlewares/userMiddleware.js';

const visitCountRouter = Router();
visitCountRouter.get('/users/me', userMiddleware, getUserMe); 
visitCountRouter.get('/ranking', getRanking);

export default visitCountRouter;