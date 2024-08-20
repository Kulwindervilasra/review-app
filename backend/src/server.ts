import 'dotenv/config'
import http from 'http';
import { Server } from 'socket.io';
import app from './app';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }

});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
const port = process.env.PORT || 6000

server.listen(port, () => {
    console.log('Server is running on port', port);
});
export { io, server };
