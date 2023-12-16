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

const apiRoute = Router();

/************************************************************/
/**************************   GET   *************************/
/************************************************************/

apiRoute.get("/avatar/:id",                                       auth.getAvatar);

/************************************************************/
/**************************   POST  *************************/
/************************************************************/

apiRoute.post("/getUserInfo",               existIDRequest,       auth.getUserInfo);
apiRoute.post("/getUserProfile",            verifyToken,          auth.getUserProfile);
apiRoute.post("/follower",                  verifyToken,          auth.followUser);
apiRoute.post("/heart",                     verifyToken,          auth.heartUser);
apiRoute.post("/getCreatorInfo",                                  auth.getCreatorInfo);
apiRoute.post("/getCreatorProfile/:id",                           auth.getCreatorProfile);



/******* Contract */
apiRoute.post("/insertContract",            verifyToken,          contract.insertContract);
apiRoute.post("/getCreatorData/:id",        verifyToken,          contract.getCreatorData);
apiRoute.post("/stripe_payment/:id",        verifyToken,          contract.stripe_payment);


/******* Get contract data */
apiRoute.post("/getAllContract/:email",     verifyToken,          contract.getAllContract);
apiRoute.post("/getContractInfo/:id",       verifyToken,          contract.getContractInfo);
apiRoute.post("/setContract/:id",           verifyToken,          contract.setContract);
apiRoute.post("/nextStep/:id",              verifyToken,          contract.nextStep);

/******** Provide File */
apiRoute.post("/upload_provide",            verifyToken,          provide.uploadProvideFile);
apiRoute.post("/getProvideFiles/:id",       verifyToken,          provide.getProvideFiles);
apiRoute.get("/provideDownload/:filename",  verifyToken,          provide.provideDownload);
export default apiRoute;
