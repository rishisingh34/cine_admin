import express, { Express } from 'express';
import http from 'http';
import { PORT } from './config/env.config';
import connectDb from './config/db.config';
import adminRoutes from './routes/admin.routes';
import feedbackRoutes from './routes/feedback.routes';
import { setupSocketServer } from './utils/leaderboardController';
import { Server } from 'socket.io';
import handlecors from './config/cors.config';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(handlecors);

connectDb();

app.use('/admin', adminRoutes);
app.use('/admin/feedback', feedbackRoutes);
setupSocketServer(io);

server.listen(PORT, (): void => {
  console.log(`Server (HTTP and WebSocket) is running on port ${PORT}`);
});