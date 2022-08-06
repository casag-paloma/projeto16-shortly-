import { Router } from 'express';
import { shortenUrl } from '../controllers/urlsController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const urlsRouter = Router();
urlsRouter.post('/urls/shorten',userMiddleware, shortenUrl);
urlsRouter.get('/urls/:id', ()=> console.log('get urls:id'));
urlsRouter.get('/urls/open/:shortUrl', ()=> console.log('get link to shortenlink '));
urlsRouter.delete('/urls/:id', ()=> console.log('delete urls:id'));

export default urlsRouter;