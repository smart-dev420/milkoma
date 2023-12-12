import { Router } from "express";
import { verifyBodyRequest } from "../middlewares/verifyRequest";
import auth from "../controller/auth.controller";
import { verifyToken } from "../middlewares/auth.jwt";

const authRoute = Router();

authRoute.post("/register",                 verifyBodyRequest,             auth.register);
authRoute.post("/login",                    verifyBodyRequest,             auth.login);
authRoute.post("/forgot-password/",                                        auth.forgotPassword);
authRoute.post("/reset-password/:email",                                   auth.resetPassword);
authRoute.post("/otp/:email",                                              auth.optValidation);
authRoute.post("/updateProfile",                                           auth.updateProfile);
authRoute.post("/uploadVerify/:id",         verifyToken,                   auth.uploadVerify);
authRoute.post("/changePassword/:email",    verifyToken,                   auth.changePassword);
authRoute.post("/changeSNS",                verifyToken,                   auth.changeSNS);
authRoute.post("/changeSkills",             verifyToken,                   auth.changeSkills);
authRoute.post("/verify/:email",            verifyToken,                   auth.verifyData);
export default authRoute;
