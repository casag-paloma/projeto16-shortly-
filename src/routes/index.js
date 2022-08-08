import { Router } from 'express';
import authRouter from './authRouter.js';
import urlsRouter from './urlsRouter.js';
import visitCountRouter from './visitCountRouter.js';

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(visitCountRouter);

export default router;