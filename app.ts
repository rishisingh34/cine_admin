import express,{ Express } from "express";
import cookieParser from 'cookie-parser';
import {PORT} from './config/env.config';
import connectDb from './config/db.config';
import adminRoutes from './routes/admin.routes'
import feedbackRoutes from './routes/feedback.routes' 
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
connectDb();

app.use("/admin" ,adminRoutes); 
app.use("/admin/feedback" ,feedbackRoutes);

app.listen(PORT, ():void=> {
  console.log(`Server is running on port ${PORT}`);
});