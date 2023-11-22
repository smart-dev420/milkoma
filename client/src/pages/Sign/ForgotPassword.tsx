import React from 'react';
import { useDispatch } from "react-redux";
import { Box, Container, InputAdornment, TextField, Typography } from "@mui/material"
import { staticFiles } from "../../components/Constants"
import { useNavigate } from "react-router-dom"
import { Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import { toast } from "react-toastify";
import * as yup from "yup";
import {Form, Formik} from "formik";
import axios from 'axios';
import { API } from '../../axios';
import { setUserEmail } from '../../slices/auth';

type FormData = {
    email: string;
  };
  
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('有効な電子メールを入力してください')
        .required('電子メールは必須です'),
});

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSentEmail = async (data:FormData) => {
        const formData = new FormData();
        formData.append('email', data.email);
        const query = `${API}/auth/forgot-password`;
        try {
            const res = await axios.post(query, formData);
            if(res.status === 200){
                toast.success("送信済み!");
                // navigate(`/otp/${data.email}`);
                dispatch(setUserEmail({email:data.email}));
                navigate('/otp');
              }else{
                console.log(res.status);
            }
        } catch (error:any) {
            const result = error.response.data.msg;
            toast.error(result);
        }
    }
    return(
        <div className="px-[2vw] py-[2vw] flex flex-row justify-center items-center h-screen" style={{whiteSpace:'nowrap'}}>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-screen p-[50px]" style={{position:'absolute', top:0, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className="flex flex-col justify-center items-center p-[50px] rounded-[20px] min-w-[500px] bg-[#c9c9c9ad]" style={{border:'2px solid #ffffff4d'}}>
                <img src={staticFiles.icons.ic_logo} className="w-[250px]" />
                <label className="text-[30px] text-[#000] py-[20px]" style={{fontWeight:800}}>メールを送信</label>
                <img src={staticFiles.images.profile} className="w-[120px] border-[4px] rounded-[1000px] mb-[30px]"/>
                <Formik
                        validateOnChange={true}
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data:FormData, actions) => {
                            actions.setSubmitting(true);
                            onSentEmail(data);
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
                          variant='standard'
                          placeholder="メールアドレス"
                          className="bg-[#FCF9F8] rounded-lg w-[80%]"
                          sx={{marginBottom:"30px", height:"46px", padding:"10px"}}
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
                        
                        <Button type="submit" variant="contained" endIcon={<SendIcon sx={{marginBottom:'7px'}} />} sx={{height:50, fontSize:20, width:'80%'}}>
                            コードを送信する
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