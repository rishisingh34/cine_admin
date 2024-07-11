"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketServer = void 0;
const leaderboardService_1 = __importDefault(require("../utils/leaderboardService"));
const setupSocketServer = (io) => {
    io.on('connection', (socket) => {
        // console.log('A user connected');
        socket.on('disconnect', () => {
            // console.log('User disconnected');
        });
    });
    const emitLeaderboardData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const leaderboard = yield (0, leaderboardService_1.default)();
            io.emit('leaderboard', leaderboard);
        }
        catch (error) {
            // console.error('Error calculating leaderboard:', error);
        }
    });
    setInterval(emitLeaderboardData, 15000);
};
exports.setupSocketServer = setupSocketServer;
