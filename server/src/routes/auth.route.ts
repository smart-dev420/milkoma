import { Router } from "express";
import { verifyBodyRequest } from "../middlewares/verifyRequest";
import auth from "../controller/auth.controller";

const authRoute = Router();

authRoute.post("/register", verifyBodyRequest, auth.register);
authRoute.post("/login", verifyBodyRequest, auth.login);
authRoute.post("/forgot-password/", auth.forgotPassword);
authRoute.post("/reset-password/:email", auth.resetPassword);
authRoute.post("/otp/:email", auth.optValidation);

export default authRoute;
