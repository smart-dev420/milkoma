import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const SECRET = "adfdgjudsgidisghdis";
const REFRESH_SECRET = "adfdgjudsgidisghdis";
const admins = process.env.ADMINS || ""
const adminArray = admins.split(',')

const authConfig = {
  accessTokenSecret: process.env.SECRET || SECRET,
  refreshTokenSecret: process.env.REFRESH_SECRET || REFRESH_SECRET,
  salt: 10,
  accessTokenTtl: 5 * 1000,
  refreshTokenTtl: 365 * 24 * 60 * 1000,
  admins : adminArray,
};

export default authConfig;
