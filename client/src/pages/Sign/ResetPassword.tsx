import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, InputAdornment, TextField, Typography } from "@mui/material"
import { staticFiles } from "../../components/Constants"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';
import { toast } from "react-toastify";
import * as yup from "yup";
import {Form, Formik} from "formik";
import axios from 'axios';
import { API } from '../../axios';
import { SpaceY } from '../../components/SpaceY';

type FormData = {
    password: string;
    confirmPassword: string;
  };
  
const validationSchema = yup.object().shape({
    password: yup
        .string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
            '有効なパスワードを入力して下さい。 大文字 1 つ、小文字 1 つ、特殊文字 1 つ、スペースなし'
        )
        .required('パスワードが必要'),
    confirmPassword: yup.string()
    .required('必須')
    .test(
        '',
        'パスワードは一致する必要があります',
        function (value) {
            return this.parent.password === value
        }
    ),
});

export const ResetPassword = () => {
    const [ showState1, setShowState1 ] = useState(true);
    const [ showState2, setShowState2 ] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useSelector((state:any) => state.auth.email);

    const onChangePassword = async (data:FormData) => {
    const formData = new FormData();
    formData.append('password', data.password);
    const query = `${API}/auth/reset-password/${email}`;
    const verified = sessionStorage.getItem('opt');
    if(verified !== 'ok'){
        toast.error("エラー");
        return;
    }
    try {
        const res = await axios.post(query, formData);
        if(res.status === 200){
            toast.success("パスワードの変更が成功しました!");
            sessionStorage.removeItem('opt');
            navigate(`/login`);
          }else{
            console.log(res.status);
        }
    } catch (error:any) {
        const result = error.response.data.msg;
        toast.error(result);
    }  
  };

     return(
        <div className="px-[20%] py-[20%] flex flex-row justify-center items-center h-screen" style={{whiteSpace:'nowrap'}}>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-screen p-[50px]" style={{position:'absolute', top:0, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className="flex flex-col justify-center items-center p-[50px] rounded-[20px] min-w-[500px] bg-[#c9c9c9ad]" style={{border:'2px solid #ffffff4d'}}>
                <img src={staticFiles.icons.ic_logo} className="w-[250px]" />
                <label className="text-[28px] text-[#000] py-[20px]" style={{fontWeight:800}}>パスワードの変更</label>
                <img src={staticFiles.images.profile} className="w-[120px] border-[4px] rounded-[1000px] mb-[30px]"/>
                <Formik
                        validateOnChange={true}
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data:FormData, actions) => {
                            actions.setSubmitting(true);
                            onChangePassword(data);
                            actions.setSubmitting(false);
                        }}
                    >
                      {({values, touched, errors, handleBlur, handleChange, isSubmitting}) => (
                        <Form style={{textAlign: 'left'}} noValidate autoComplete='off' className='flex flex-col justify-center items-center w-full'>
                        <TextField
                          id = "password"
                          name='password'
                          type={showState1?"password":"text"}
                          placeholder="パスワード"
                          variant='standard'
                          value = {values.password}
                          className="bg-[#FCF9F8] rounded-lg w-[80%]"
                          error={
                              errors.password && touched.password
                                  ? true
                                  : false
                          }
                          helperText={
                            errors.password && touched.password
                            ? errors.password
                            : ''
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{padding:"10px", height:"46px", whiteSpace:'normal', marginBottom:"35px"}}
                          InputProps={{
                              endAdornment: (
                              <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={()=>{setShowState1(!showState1)}}>
                                  {
                                      showState1 ? <VisibilityOffIcon /> : <VisibilityIcon />
                                  }
                              </InputAdornment>
                              ),
                          }}
                          />
                          <TextField
                          id = "confirmPassword"
                          name='confirmPassword'
                          type={showState2?"password":"text"}
                          placeholder="パスワードの確認"
                          variant='standard'
                          value = {values.confirmPassword}
                          className="bg-[#FCF9F8] rounded-lg w-[80%]"
                          error={
                              errors.confirmPassword && touched.confirmPassword
                                  ? true
                                  : false
                          }
                          helperText={
                            errors.confirmPassword && touched.confirmPassword
                            ? errors.confirmPassword
                            : ''
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{padding:"10px", height:"46px", marginBottom:"30px"}}
                          InputProps={{
                              endAdornment: (
                              <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={()=>{setShowState2(!showState2)}}>
                                  {
                                      showState2 ? <VisibilityOffIcon /> : <VisibilityIcon />
                                  }
                              </InputAdornment>
                              ),
                          }}
                          />
                        
                        <Button type="submit" variant="contained" endIcon={<SendIcon sx={{marginBottom:'7px'}} />} sx={{height:50, fontSize:18, width:'80%'}}>
                            変化する
                        </Button>
                        </Form>
                      )}
                    </Formik>
                    <Container maxWidth="sm" className="mt-[15px]">
                        <Stack direction="row" spacing={2} className = "justify-center items-center">
                            <Button className='w-full' variant="text" onClick={() => {navigate('/login')}}>ここでログイン</Button>
                        </Stack>
                    </Container> 
            </div>
        </div>
    )
}

