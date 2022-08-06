import { Router } from 'express';
import { deleteUrl, getUrl, openShortUrl, shortenUrl } from '../controllers/urlsController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const urlsRouter = Router();
urlsRouter.post('/urls/shorten',userMiddleware, shortenUrl);
urlsRouter.get('/urls/:id', getUrl);
urlsRouter.get('/urls/open/:shortUrl', openShortUrl);
urlsRouter.delete('/urls/:id', userMiddleware, deleteUrl);

export default urlsRouter;