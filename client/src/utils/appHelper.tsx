import { HOST_URL } from '../components/Constants';
import axios from 'axios';
export const token = sessionStorage.getItem('token')
export const headers = {
  "Accept": "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
  "Authorization": "Bearer " + token
};
export const getCurrentDateString = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const date = `${year}年-${month}月-${day}日`;
  return date;
}

export const getCurrentDateTimeString = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hour = String(currentDate.getHours()).padStart(2, '0');
  const min = String(currentDate.getMinutes()).padStart(2, '0');
  const time = `${year}年-${month}月-${day}日 ${hour}:${min}`;
  return time;
}

export const getDateTimeString = (str:string) => {
  const strDate = str.split(' ');
  const date = getDateString(str);
  const time = strDate[1].split(':');
  const hour = time[0];
  const min = time[1];
  const dateTime = `${date} ${hour}:${min}`;
  return dateTime;
}

export const getDateString = (str:string) => {
  const strDateTime = str.split('T');
  const strDate = strDateTime[0].split('-');
  const year = strDate[0];
  const month = strDate[1];
  const day = strDate[2];
  const date = `${year}年 ${month}月 ${day}日`;
  return date;
}

export const getProvideDate = (createdDate: string, month: number) => {
  const date = new Date(createdDate).getTime() + month * 30 * 24 * 3600 * 1000;
  const newDate = new Date(date);
  const res = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
  return res;
};

export const reqPost = async (url:any, payload:any) => {
  const token = sessionStorage.getItem('token')
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + token
  };

  const query = `${HOST_URL}/${url}`
  const res = await axios.post(query, payload, {headers})
  if(res.status !== 200){
    return null
  }
  return res.data.result
}

export const NumberFormatExample = (str:number) => {
  
  let formattedNumber = "";

  if (str >= 1000000) {
    formattedNumber = (str / 1000000).toFixed(1) + "M";
  } else if (str >= 1000) {
    formattedNumber = (str / 1000).toFixed(1) + "k";
  } else {
    formattedNumber = str.toString();
  }
  return formattedNumber;
}

export const showSentence = (str:string) => {
  const sentence = str.split('@@@');
  const element = sentence.map((item, index) => (
      <p>
        {item}
      </p>
  ));
  return element;
}

export const convertSize = (size:number) => {
  let capacity;
  if( size >= 1024 * 1024 * 1024){
    capacity = (size / 1024 / 1024 / 1024).toFixed(2) + 'GB';
  }
  else if( size >= 1024 * 1024 || size < 1024 * 1024 * 1024 ){
    capacity = (size / 1024 / 1024).toFixed(2) + 'MB';
  }
  else if( size >= 1024 || size < 1024 * 1024 ){
    capacity = (size / 1024 ).toFixed(2) + 'KB';
  }
  else {
    capacity = size + 'Byte';
  }
  return capacity;
}