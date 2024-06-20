import express,{ Express } from "express";
import {PORT} from './config/env.config';
import connectDb from './config/db.config';
import adminRoutes from './routes/admin.routes'
const app: Express = express();

app.use(express.json());
connectDb();
app.use(adminRoutes); 

app.listen(PORT, ():void=> {
  console.log(`Server is running on port ${PORT}`);
});