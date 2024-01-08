import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "./utils/logger";
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

const addChat: RequestHandler = async (input: any) => {
    try{
        console.log('data - ', input);
        const onlinCheck = onlineUsers.find(user => user.email === input.email);
        let checked = false;
        if(onlinCheck) checked = true;

    } catch(error){
        console.error(error);
    }
}

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
    getData
}