"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const env_config_1 = require("./config/env.config");
const db_config_1 = __importDefault(require("./config/db.config"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const feedback_routes_1 = __importDefault(require("./routes/feedback.routes"));
const leaderboardController_1 = require("./utils/leaderboardController");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
app.use(express_1.default.json());
(0, db_config_1.default)();
app.use('/admin', admin_routes_1.default);
app.use('/admin/feedback', feedback_routes_1.default);
(0, leaderboardController_1.setupSocketServer)(io);
server.listen(env_config_1.PORT, () => {
    console.log(`Server (HTTP and WebSocket) is running on port ${env_config_1.PORT}`);
});
