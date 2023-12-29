import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import express, { Application, Request, Response } from 'express';
import cors from "cors";
import config from "./config/config";
import setupRoute from "./routes";
import { StatusCodes } from "http-status-codes";
import connectDB from "./utils/connect";
import logger from "./utils/logger";
import { Server as SocketIOServer, Socket } from 'socket.io';
import { createServer as createHTTPServer } from 'http';

const bodyParser = require('body-parser');

// import {
//   followUser,
//   connectedUser,
//   disconnectedUser,
//   getUserIdbySockeId,
//   getAllOnlineUsers
// } from "./services/profile.service";
const fileUpload = require('express-fileupload');
require('events').EventEmitter.defaultMaxListeners = 15;

const options = {
  inflate: true,
  limit: '100mb',
  type: 'application/octet-stream'
};

const app: Application = express();
app.use(cors({
  origin: '*',
  methods: ['GET','POST']
}));
app.use(fileUpload())
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.raw(options));

// Routes
app.get('/', (req: Request, res: Response) => {
  console.log('Received request: ', req.url);
  res.status(StatusCodes.OK).send('API Running');
});

// Setup routes
setupRoute(app);

var http = createHTTPServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

http.listen(config.server.port, async () => {
  logger.info(
    `Server started at http://${config.server.hostname}:${config.server.port}`
    );
    console.log(`server started ${config.server.port}`)
    await connectDB();
  });
  
io.listen(config.server.socketPort, () => {
    logger.info(
      `Socket server started at http://${config.server.hostname}:${config.server.socketPort}`
    );
    console.log(`Socket server started ${config.server.socketPort}`)
})

  io.on('connection', (socket: Socket) => {
    console.log(`Socket ${socket.id} connected`);
    
    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on('sendMessage', ({ room, message }: { room: string; message: string }) => {
      io.to(room).emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
export default http;
