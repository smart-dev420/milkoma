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

apiRoute.get("/avatar/:id",                            auth.getAvatar);

/************************************************************/
/**************************   POST  *************************/
/************************************************************/

apiRoute.post("/getUserInfo",               existIDRequest, auth.getUserInfo);
apiRoute.post("/getUserProfile",            verifyToken, auth.getUserProfile);
// apiRoute.post("/upload_profile",            verifyToken,    existIDRequest, auth.uploadProfile);
// apiRoute.post("/get_profile",               verifyToken,    existIDRequest, auth.readProfilebyID);
apiRoute.post("/follower",                verifyToken,     auth.followUser);
apiRoute.post("/heart",                verifyToken,     auth.heartUser);



/******* Contract */
apiRoute.post("/insertContract", verifyToken, contract.insertContract);
apiRoute.post("/getCreatorInfo", verifyToken, contract.getCreatorInfo);

// apiRoute.post("/test", stripe.test);

/******** Provide File */
apiRoute.post("/upload_provide", verifyToken, provide.uploadFile);
apiRoute.post("/uploadVerify", verifyToken, provide.uploadVerifyFile);
export default apiRoute;
