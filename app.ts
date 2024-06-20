import express,{ Express } from "express";
import {PORT} from './config/env.config';
import connectDb from './config/db.config';
const app: Express = express();

app.use(express.json());
connectDb();

app.listen(PORT, ():void=> {
  console.log(`Server is running on port ${PORT}`);
});