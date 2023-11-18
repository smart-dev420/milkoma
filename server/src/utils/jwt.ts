import jwt from 'jsonwebtoken';
const secret_key = process.env.SECRET_KEY;
export const generateBlueBadgeToken = (wallet:string, duration:string) => {
  let secret_key_tmp = secret_key + "blue";
  const secretKey = secret_key_tmp?? 'blue';
  const payload = {
    wallet:wallet
  }
  const option = {
    expiresIn:duration
  }
  const token = jwt.sign(payload, secretKey, option);

  return token
}

export const validateBlueBadgeToken = (token : string) => {
  let bValidate = false;
  let secret_key_tmp = secret_key + "blue";
  const secretKey = secret_key_tmp?? 'blue';
  const decodedtoken = jwt.verify(token, secretKey) as { exp: number };
  const expirationTime = new Date(decodedtoken.exp * 1000);
  if (expirationTime > new Date()) {
    bValidate = true;
  }
  return bValidate;
}

export const generateRedBadgeToken = (wallet:string, duration:string) => {
  let secret_key_tmp = secret_key + "red";
  const secretKey = secret_key_tmp?? 'red';
  const payload = {
    wallet:wallet
  }
  const option = {
    expiresIn:duration
  }
  const token = jwt.sign(payload, secretKey, option);

  return token
}

export const validateRedBadgeToken = (token : string) => {
  let bValidate = false;
  let secret_key_tmp = secret_key + "red";
  const secretKey = secret_key_tmp?? 'red';
  const decodedtoken = jwt.verify(token, secretKey) as { exp: number };
  const expirationTime = new Date(decodedtoken.exp * 1000);
  if (expirationTime > new Date()) {
    bValidate = true;
  }
  return bValidate;
}