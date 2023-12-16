import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import express from "express";
import cors from "cors";
import config from "./config/config";
import setupRoute from "./routes";
import { StatusCodes } from "http-status-codes";
import connectDB from "./utils/connect";
import logger from "./utils/logger";

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
  limit: '100kb',
  type: 'application/octet-stream'
};

const app = express();
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
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("API Running");
});

// Setup routes
setupRoute(app);

var http = require('http').createServer(app);
// var io = require('socket.io')(http, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });
// io.listen(config.server.socketPort)

http.listen(config.server.port, async () => {
  logger.info(
    `Server started at http://${config.server.hostname}:${config.server.port}`
  );
console.log(`server started ${config.server.port}`)
  await connectDB();
});

export default http;
