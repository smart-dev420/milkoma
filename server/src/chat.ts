import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "./utils/logger";
import MessageModel from "./models/message.model";
import { validateToken } from "./controller/contract.controller";
import { getEmailFromToken } from "./services/account.service";
import ContractModel from "./models/contract.model";
import AccountModel from "./models/account.model";
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
        // Assuming 'onlineUsers' contains user data and you want to check if the user exists
        const onlineCheck = onlineUsers.find(user => user.roomId === roomId && user.email === input.email);
        let checked = false;
        if (onlineCheck) checked = true;
        console.log('response - ', input)
        const messageToUpdate = {
            contractId: roomId,
            $push: {
                message: {
                    email: input.email,
                    sender: input.sender,
                    receiver: input.receiver,
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

const removeData: RequestHandler = async (req, res) => {

  const filename = req.body.filename;
  const contractId = req.body.contractId;
  try {
    // Construct the full path to the file
    const filePathToRemove = `${chatPath}/${filename}`;

    // Check if the file exists before attempting to remove it
    if (fs.existsSync(filePathToRemove)) {
      const result = await MessageModel.updateOne(
        { contractId: contractId },
        { $pull: { 'message': { uploadData: filename } } }
      );
      fs.unlinkSync(filePathToRemove);
      return res.status(200).send({ msg: "ファイルの削除に成功しました" });
    } else {
      return res.status(404).send({ msg: "指定されたファイルは存在しません" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "ファイルの削除に失敗しました" });
  }
};
  

const getMessages: RequestHandler = async (req, res) => {
    try{
        const id = req.params.id;
        const role = req.params.role;
        console.log('role - ', role)
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

const notReceivedMessage: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const token = validateToken(req, res);
  const email = getEmailFromToken(token);
  let result: any = [];
  try{
    const message = await MessageModel.findOne({ contractId: id }, 'message');
    const user = await AccountModel.findOne({email: email});
    if (message && Array.isArray(message.message) && user) {
      result = message.message.filter((item) => item.checked === false && item.receiver === user.role);
    }
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
}

const getAllNotReceivedMessages: RequestHandler = async (req, res) => {
  try{
    const token = validateToken(req, res);
    const email = getEmailFromToken(token);
    const user = await AccountModel.findOne({email: email});
    let contracts = await ContractModel.find({clientEmail: email}, '_id');
    const allContracts = await ContractModel.find();
    let data: any = [];
    if(user?.role === 'admin'){
      contracts = allContracts;
    }
    
    for (const contract of contracts) {
      try {
        const messages = await MessageModel.findOne({ contractId: contract._id });
        if (messages && Array.isArray(messages.message)) {
          const filteredMessages = messages.message.filter(data => data.checked === false && data.receiver === user?.role);
          if(filteredMessages.length > 0) {
            const info = filteredMessages.reverse();
            if(user?.role === 'admin'){
              const filterClient = info.filter(data => data.sender === 'client');
              const filterCreator = info.filter(data => data.sender === 'creator');
              if(filterClient.length > 0){
                data.push({
                  contractId: contract._id,
                  message: filterClient[0].message,
                  sender: filterClient[0].sender,
                  receiver: filterClient[0].receiver,
                  date: filterClient[0].date
                });
              }
              if(filterCreator.length > 0){
                data.push({
                  contractId: contract._id,
                  message: filterCreator[0].message,
                  sender: filterCreator[0].sender,
                  receiver: filterCreator[0].receiver,
                  date: filterCreator[0].date
                });
              }
            } else {
              const newData = {
                contractId: contract._id,
                message: info[0].message,
                sender: info[0].sender,
                receiver: info[0].receiver,
                date: info[0].date
              };
              data.push(newData);
            }
          }
        }
      } catch (error) {
        // Handle errors during the MongoDB operation
        console.error(error);
      }
    }
    return res.status(200).send(data);
  } catch(err){
    console.error(err);
  }
}

const updateMessages: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const sender = req.params.sender;
  const token = validateToken(req, res);
  const email = getEmailFromToken(token);
  const user = await AccountModel.findOne({email: email});
  try {
    if(user?.role === 'admin'){
      await MessageModel.updateOne(
        { contractId: id },
        { $set: { 'message.$[elem].checked': true } },
        { arrayFilters: [{ 'elem.receiver': { $eq: user?.role }, 'elem.sender': { $eq: sender} }] }
      );
    } else {
      await MessageModel.updateOne(
        { contractId: id },
        { $set: { 'message.$[elem].checked': true } },
        { arrayFilters: [{ 'elem.receiver': { $eq: user?.role } }] }
      );
    }
    // const info: any = await MessageModel.findOne({ contractId: id });
    // if (info && Array.isArray(info.message)) {
    //   for (const item of info.message) {
    //     if (item.email !== email) {
    //       // Assuming you want to update some field, e.g., 'checked' to true
    //       item.checked = true;
  
    //       // Update the document in the database
    //       await MessageModel.updateOne(
    //         { contractId: id, 'message.email': !email },
    //         { $set: { 'message.$': item } }
    //       );
    //     }
    //   }
    // }
  } catch (error) {
    console.error(error);
  }
  
}

module.exports = { 
    addOnlineUser,
    getUsers,
    deleteUser, 
    addChat,
    uploadData,
    getData,
    getMessages,
    notReceivedMessage,
    getAllNotReceivedMessages,
    updateMessages,
    removeData
}