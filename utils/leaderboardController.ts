import { Server } from 'socket.io';
import calculateLeaderBoard from '../utils/leaderboardService';

export const setupSocketServer = (io: Server) => {
  io.on('connection', (socket) => {
    // console.log('A user connected');

    socket.on('disconnect', () => {
      // console.log('User disconnected');
    });
  });

  const emitLeaderboardData = async () => {
    try {      
      const leaderboard = await calculateLeaderBoard();
      io.emit('leaderboard', leaderboard);
    } catch (error) {
      // console.error('Error calculating leaderboard:', error);
    }
  };
  setInterval(emitLeaderboardData, 15000);
};