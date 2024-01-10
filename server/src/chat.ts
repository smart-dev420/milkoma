import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "./utils/logger";
import MessageModel from "./models/message.model";
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const rootPath = path.dirname(require.main?.path);
const chatPath = path.join(rootPath, 'uploads/chats');

const onlineUsers : Array<any> = []

const addOnlineUser = (id:string, roomId:string, userEmail:string) => {
    const existingUser = onlineUsers.find(user => user.roomId === roomId && user.userEmail === userEmail)
    const user = { id, roomId, userEmail }
    if (existingUser) return { user }
    onlineUsers.push(user)
    return { user }
}

const getUsers = () => {return onlineUsers}

const deleteUser = (id: string) => {
    const index1 = onlineUsers.findIndex((user) => user.id === id );
    if (index1 !== -1) onlineUsers.splice(index1, 1)[0];
}

interface Message {
    contractId: string;
    message: MessageDataType[];
}

interface MessageDataType {
    email: string;
    date: string;
    message: string;
    uploadData: string;
    checked: boolean;
}

const addChat = async (roomId: string, input: any) => {
    try {
        console.log('data - ', input);

        // Assuming 'onlineUsers' contains user data and you want to check if the user exists
        const onlineCheck = onlineUsers.find(user => user.roomId === roomId && user.email === input.email);
        let checked = false;
        if (onlineCheck) checked = true;

        const messageToUpdate = {
            contractId: roomId,
            $push: {
                message: {
                    email: input.email,
                    date: input.date,
                    message: input.message, // Assuming 'input.message' contains the message
                    uploadData: input.uploadData, // Assuming 'input.uploadDataName' contains the uploadDataName
                    checked: checked // Assuming 'checked' determines if the message is checked
                }
            }
        };

        // Find and update the existing document in the MessageModel collection
        const doc = await MessageModel.findOneAndUpdate(
            { contractId: roomId },
            messageToUpdate,
            { new: true, upsert: true } // Set 'upsert' to 'true' to create a new document if it doesn't exist
        );

        console.log('Updated message:', doc);
    } catch (error) {
        console.error(error);
    }
};

interface FileInterface {
    name: string;
    data: Buffer;
    size: number;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;
    mv: any;
    createdDate: Date;
  }

const uploadData: RequestHandler = async (req, res) => {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }
    const contractId = req.body.contractId;
    const nowDate = req.body.date;
    const files:any = req.files;
    const file:FileInterface = files.file;
    const filename = contractId + nowDate + '_' + file.name;
    file.mv(`${chatPath}/${filename}`, async function (err:any) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "アップロード失敗" });
      }
      try {
        return res.status(200).send({ msg: "アップロードに成功しました" });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "アップロード失敗" });
      }
    });
  }

const getMessages: RequestHandler = async (req, res) => {
    try{
        const id = req.params.id;
        const info = await MessageModel.findOne({contractId: id}, 'message');
        return res.status(200).send(info);
    } catch (error) {
      console.log(error);
    }
}

const getData: RequestHandler = async (req, res) => {
    const file = req.params.file;
    const filePath = path.join(chatPath, file);
    fs.access(filePath, fs.constants.F_OK, (err:any) => {
      if (err) {
        logger.error("No data exists");
        res.status(200).send({ msg: "error"});
      } else {
        logger.info("Data exists");
        res.status(200).sendFile(filePath);
      }
    });
  }

module.exports = { 
    addOnlineUser,
    getUsers,
    deleteUser, 
    addChat,
    uploadData,
    getData,
    getMessages
}