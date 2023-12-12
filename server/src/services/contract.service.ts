import Contract from "../interfaces/contract.interface";
import ContractModel from "../models/contract.model";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import { get } from "lodash";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export function allContract(input: string){
    const res = ContractModel.find({clientEmail: input});
    return res;
}