import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(router);
const PORT = process.env.PORT || 5009;

app.listen(5000, ()=> console.log('Server on'));