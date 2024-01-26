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
const { 
  addOnlineUser,
  getUsers, 
  deleteUser,
  addChat
} = require('./chat')
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
  limit: '5gb',
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
  
  socket.on('joinRoom', ({room, user}:{room: string, user:string}) => {
    addOnlineUser(socket.id, room, user);
    io.emit('getOnlineUsers', getUsers());
    socket.join(room);
    console.log(`online users `, getUsers());
    const res = getUsers();
    io.to(room).emit('userJoined', { room, userId: res.roomId});
  });

  socket.on('sendMessage', ({ room, data }: { room: string; data: any }) => {
    console.log(`Socket ${socket.id}, ${room}, ${data.message}, ${data.sendDate}`);
    addChat(room, data);
    io.to(room).emit('message', data);
  });

  socket.on('deleteMessage', ({ room, data }: { room: string; data: any}) => {
    io.to(room).emit('message', data);
  });

  io.emit('getOnlineUsers', getUsers());

  socket.on('disconnect', () => {
    deleteUser(socket.id);
    io.emit('getOnlineUsers', getUsers());
    console.log(`Socket ${socket.id} disconnected`);
    console.log(`online users `, getUsers());
  });
});

export default http;