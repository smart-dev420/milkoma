import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signin, setInfoBatch } from '../slices/auth'
import axios, { AxiosError } from 'axios'
import { API } from '../axios'
import { headers } from '../utils/appHelper'
// import * as jwt from 'jsonwebtoken';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { StatusCodes } from 'http-status-codes';

const AuthContainer = () => {
  const token = localStorage.getItem('token')!;
  const dispatch = useDispatch();
  const user_data = localStorage?.getItem('user');
  const user = user_data ? JSON.parse(user_data) : null;
  if(user !== null && token !== null) {
    const decodedToken: JwtPayload = jwtDecode(token);
    if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
      dispatch(signin(user));
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.pathname = '/login'  
    }
  } else {
    if(token){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.pathname = '/login'
    }
  }
  // if(user !== null){
    // console.log("user - ", user)
    
    // axios.post(`${API}/api/getUserInfo?id=${user.id}`, {}, headers())
    // .then(res => {
    //   dispatch(setInfoBatch(
    //     {
    //       username : res.data.username,
    //       isLoggedIn : true,
    //       admin: res.data.admin,
    //       region: res.data.region,
    //     }
    //   ))
    // })
    // .catch(err => {
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('user')
    //   window.location.pathname = '/login'
    // })
  // }else{
  //   if(token){
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('user')
  //     window.location.pathname = '/login'
  //   }
  // }

  return (
    <>
      {token ? 
      (
        <></>
      ) : 
      (
        <Navigate to='/login' />
      )}
    </>
  )
}

export default AuthContainer
