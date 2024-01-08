import { Router } from "express";
import { 
  existIDRequest, 
} from "../middlewares/verifyRequest";
import { 
  verifyToken,
  verifyAdmin
} from "../middlewares/auth.jwt"
import auth from "../controller/auth.controller";
import contract from "../controller/contract.controller";
import provide from "../controller/upload.controller";
import message from "../controller/message.controller";
const { 
  uploadData,
  getData
} = require('../chat')

const apiRoute = Router();

/************************************************************/
/**************************   GET   *************************/
/************************************************************/

apiRoute.get("/avatar/:id",                                       auth.getAvatar);
apiRoute.get("/chat_avatar/:id",                                  auth.getAvatarByEmail);
apiRoute.get("/chat/:file",                                       getData)

/************************************************************/
/**************************   POST  *************************/
/************************************************************/

apiRoute.post("/getUserInfo",               existIDRequest,       verifyToken,      auth.getUserInfo);
apiRoute.post("/getUserProfile",            verifyToken,          auth.getUserProfile);
apiRoute.post("/follower",                  verifyToken,          auth.followUser);
apiRoute.post("/heart",                     verifyToken,          auth.heartUser);
apiRoute.post("/getCreatorInfo",                                  auth.getCreatorInfo);
apiRoute.post("/getSearchCreatorInfo/:id",                        auth.getSearchCreatorInfo);
apiRoute.post("/getCreatorProfile/:id",     verifyToken,          auth.getCreatorProfile);
apiRoute.post("/getAdmin",                  verifyToken,          auth.getAdmin);
apiRoute.post("/getAllUsersInfo",           verifyToken,          auth.getAllUsersInfo);
apiRoute.post("/userVerify/:id",            verifyToken,          auth.userVerify);
apiRoute.post("/userDelete/:id",            verifyToken,          auth.userDelete); 
apiRoute.get("/verifyDownload/:filename",   verifyToken,          auth.verifyDownload);
apiRoute.post("/getRole",                   verifyToken,          auth.getRole);

/******* Contract */
apiRoute.post("/insertContract",            verifyToken,          contract.insertContract);
apiRoute.post("/getCreatorData/:id",        verifyToken,          contract.getCreatorData);
apiRoute.post("/stripe_payment/:id",        verifyToken,          contract.stripe_payment);
apiRoute.post("/contractConfirm/:id",       verifyToken,          contract.contractConfirm);
apiRoute.post("/contractCancel/:id",        verifyToken,          contract.contractCancel);
apiRoute.post("/addCreator/:id",            verifyToken,          contract.addCreator);
apiRoute.post("/contractPayment/:id",       verifyToken,          contract.contractPayment);
apiRoute.post("/getClientSecret",           verifyToken,          contract.getClientSecret);

/******* Get contract data */
apiRoute.post("/getAllContract/:email",     verifyToken,          contract.getAllContract);
apiRoute.post("/getContractInfo/:id",       verifyToken,          contract.getContractInfo);
apiRoute.post("/setContract/:id",           verifyToken,          contract.setContract);
apiRoute.post("/nextStep/:id",              verifyToken,          contract.nextStep);
apiRoute.post("/getAllContracts",           verifyToken,          contract.getAllContracts);
apiRoute.post("/paymentSave/:id",           verifyToken,          contract.paymentSave);
apiRoute.post("/getPaymentHistory",         verifyToken,          contract.getPaymentHistory);

/******** Provide File */
apiRoute.post("/upload_provide",            verifyToken,          provide.uploadProvideFile);
apiRoute.post("/getProvideFiles/:id",       verifyToken,          provide.getProvideFiles);
apiRoute.get("/provideDownload/:filename",  verifyToken,          provide.provideDownload);
apiRoute.post("/upload_product",            verifyToken,          provide.uploadProductFile);
apiRoute.post("/getProductFiles/:id",       verifyToken,          provide.getProductFiles);
apiRoute.get("/productDownload/:filename",  verifyToken,          provide.productDownload);

apiRoute.get("/receivedDownload/:filename",      verifyToken,     provide.receivedDownload);

/******** Socket */
apiRoute.post("/message",                   verifyToken,          message.saveMessage);
apiRoute.post("/uploadData",                verifyToken,          uploadData);
export default apiRoute;
