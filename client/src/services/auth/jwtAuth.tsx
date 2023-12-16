import jwtAxios from "axios";

const APP_ENV = process.env.REACT_APP_ENV;

let W_SOCKET_SERVER;
let W_HOST_URL;

if (APP_ENV === 'prod'){
    W_SOCKET_SERVER                   = process.env.REACT_APP_SOCKET_SERVER_PROD;
    W_HOST_URL                        = process.env.REACT_APP_API_URL_PROD;
  } else if (APP_ENV === 'dev'){
    W_SOCKET_SERVER                   = process.env.REACT_APP_SOCKET_SERVER_DEV;
    W_HOST_URL                        = process.env.REACT_APP_API_URL_DEV;
  }

const jwtAuthAxios = jwtAxios.create({
    baseURL: W_HOST_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

jwtAuthAxios.interceptors.response.use(
    res => res,
    err => {
        if(err.response && err.response.data.type === "token-invalid") {
            //todo logout the user
        }
        return Promise.reject(err);
    }
);

export const setAuthToken = (token:string) => {
    if(token) {
        jwtAuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('token', token);
    } else {
        delete jwtAuthAxios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    return localStorage.getItem("token");
};

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default jwtAuthAxios;