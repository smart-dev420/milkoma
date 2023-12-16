import React from 'react';
import { useDispatch } from "react-redux";
import { Box, Container, InputAdornment, TextField, Typography } from "@mui/material"
import { staticFiles } from "../../components/Constants"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import PersonIcon from '@mui/icons-material/Person';
import { Button, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import { toast } from "react-toastify";
import * as yup from "yup";
import {Form, Formik} from "formik";
import axios from 'axios';
import { API, poster } from '../../axios';
import { signin } from '../../slices/auth';
import { SpaceY } from '../../components/SpaceY';

type FormData = {
    email: string;
    password: string;
  };
  
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('有効な電子メールを入力してください')
        .required('電子メールは必須です'),
    password: yup
        .string()
        .required('パスワードが必要'),
});

export const Login = () => {
    const [ showState, setShowState ] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSignIn = async (data:FormData) => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      const query = `${API}/auth/login`;
      try {
          const res = await axios.post(query, formData);
          if(res.status === 200){
              console.log('return' , res.data)
              const token = res.data.token;
              const email = res.data.email;
              const verify = res.data.emailverify;
              toast.success("成功!");
              const id = res.data._id;
              localStorage.setItem('token', token);
              const user = JSON.stringify({ email, id })
              dispatch(signin({email, id}))
              localStorage.setItem('user', user);
              navigate('/');
            }else{
              console.log(res)
              // context.alertError(res.data.err)
          }
      } catch (error:any) {
          const result = error.response.data.msg;
          toast.error(result);
      }
  };

     return(
        <div className="px-[20%] py-[20%] flex flex-row justify-center items-center h-screen" style={{whiteSpace:'nowrap'}}>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-full p-[50px]" style={{position:'absolute', top:0, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className="flex flex-col justify-center items-center p-[50px] rounded-[20px] min-w-[500px] bg-[#c9c9c9ad]" style={{border:'2px solid #ffffff4d'}}>
                <img src={staticFiles.icons.ic_logo} className="w-[250px]" />
                <label className="text-[28px] text-[#000] py-[20px]" style={{fontWeight:800}}>ユーザーログイン</label>
                <img src={staticFiles.images.profile} className="w-[120px] border-[4px] rounded-[1000px] mb-[30px]"/>
                <Formik
                        validateOnChange={true}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data:FormData, actions) => {
                            actions.setSubmitting(true);
                            onSignIn(data);
                            actions.setSubmitting(false);
                        }}
                    >
                      {({values, touched, errors, handleBlur, handleChange, isSubmitting}) => (
                        <Form style={{textAlign: 'left'}} noValidate autoComplete='off' className='flex flex-col justify-center items-center w-full'>
                        <TextField
                          id = "email"
                          name = "email"
                          type="text"
                          value={values.email}
                          placeholder="メールアドレス"
                          variant="standard" 
                          className="bg-[#FCF9F8] rounded-lg w-[80%]"
                          sx={{ height:"46px", padding:"10px"}}
                          error={
                              errors.email && touched.email
                                  ? true
                                  : false
                          }
                          helperText={
                            errors.email && touched.email
                            ? errors.email
                            : ''
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                              endAdornment: (
                              <InputAdornment position="end">
                                  <EmailIcon />
                              </InputAdornment>
                              ),}}/>
                              <SpaceY/>
                        <TextField
                          id = "password"
                          name='password'
                          type={showState?"password":"text"}
                          placeholder="パスワード"
                          variant="standard" 
                          value = {values.password}
                          className="bg-[#FCF9F8] rounded-lg w-[80%]"
                          helperText={
                            errors.password && touched.password
                                ? errors.password
                                : ''
                          }
                          error={
                              errors.password && touched.password
                                  ? true
                                  : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{padding:"10px", height:"46px", marginBottom: '40px', whiteSpace:'normal'}}
                          InputProps={{
                              endAdornment: (
                              <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={()=>{setShowState(!showState)}}>
                                  {
                                      showState ? <VisibilityOffIcon /> : <VisibilityIcon />
                                  }
                              </InputAdornment>
                              ),
                          }}
                          />

                        <Button type="submit" variant="contained" endIcon={<LoginIcon sx={{marginBottom:'7px'}} />} sx={{height:50, fontSize:18, width:'80%'}}>
                            ログイン
                        </Button>
                        </Form>
                      )}
                  </Formik>
                        
                    <Container maxWidth="sm" className="mt-[20px]">
                    <Stack direction="row" spacing={2} className = "justify-center items-center">
                        <Typography color="textSecondary" sx={{marginTop:'10px', fontSize:14}}>まだ会員ではないお客様</Typography>
                        <Button variant="text" onClick={() => {navigate('/signup')}}>新規会員登録はこちら</Button>
                    </Stack>
                    </Container>
                    <Container maxWidth="sm" className="mt-[5px]">
                    <Stack direction="row" spacing={2} className = "justify-center items-center">
                        <Typography color="textSecondary" sx={{marginTop:'10px', fontSize:14}}>パスワードを忘れたお客様</Typography>
                        <Button variant="text" onClick={() => {navigate('/forgot')}}>パスワードの再設定はこちら</Button>
                    </Stack>
                    </Container>
            </div>
        </div>
    )
}

