import { Router } from "express";
import { 
  existIDRequest, 
} from "../middlewares/verifyRequest";
import { 
  verifyToken,
  verifyAdmin
} from "../middlewares/auth.jwt"
import auth from "../controller/auth.controller";

const apiRoute = Router();

/************************************************************/
/**************************   GET   *************************/
/************************************************************/
apiRoute.get("/avatar/:id", auth.getAvatar);


/************************************************************/
/**************************   POST  *************************/
/************************************************************/

apiRoute.post("/getUserInfo",               existIDRequest, auth.getUserInfo);
apiRoute.post("/upload_profile",            verifyToken,    existIDRequest, auth.uploadProfile);
apiRoute.post("/get_profile",               verifyToken,    existIDRequest, auth.readProfilebyID);


// apiRoute.post("/test", stripe.test);

export default apiRoute;
