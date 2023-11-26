import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, InputAdornment, TextField, Typography } from "@mui/material"
import { staticFiles } from "../../components/Constants"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { toast } from "react-toastify";
import * as yup from "yup";
import {Form, Formik} from "formik";
import axios from 'axios';
import { API } from '../../axios';
import { SpaceY } from '../../components/SpaceY';

type FormData = {
    otp: string;
  };
  
const validationSchema = yup.object().shape({
    otp: yup
        .string()
        .required('OTP番号は必須です'),
});

export const OtpSent = () => {
    const navigate = useNavigate();
    // const email = useParams();
    const email = useSelector((state:any) => state.auth.email);
    const onSentOTP = async (data:FormData) => {
        const formData = new FormData();
        formData.append('otp', data.otp);
        const query = `${API}/auth/otp/${email}`;
        try {
            const res = await axios.post(query, formData);
            if(res.status === 200){
                toast.success("Verified!");
                navigate(`/resetpswd`);
              }else{
                console.log(res.status);
            }
        } catch (error:any) {
            const result = error.response.data.msg;
            toast.error(result);
        }
    }
    return(
        <div className="px-[20%] py-[20%] flex flex-row justify-center items-center h-screen" style={{whiteSpace:'nowrap'}}>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-screen p-[50px]" style={{position:'absolute', top:0, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className="flex flex-col justify-center items-center p-[50px] rounded-[20px] min-w-[500px] bg-[#c9c9c9ad]" style={{border:'2px solid #ffffff4d'}}>
                <img src={staticFiles.icons.ic_logo} className="w-[250px]" />
                <label className="text-[30px] text-[#000] py-[20px]" style={{fontWeight:800}}>OTP検証</label>
                <img src={staticFiles.images.profile} className="w-[120px] border-[4px] rounded-[1000px] mb-[30px]"/>
                <Formik
                        validateOnChange={true}
                        initialValues={{
                            otp: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data:FormData, actions) => {
                            actions.setSubmitting(true);
                            onSentOTP(data);
                            actions.setSubmitting(false);
                        }}
                    >
                      {({values, touched, errors, handleBlur, handleChange, isSubmitting}) => (
                        <Form style={{textAlign: 'left'}} noValidate autoComplete='off' className='flex flex-col justify-center items-center w-full'>
                        <TextField
                          id = "otp"
                          name = "otp"
                          type="text"
                          variant='standard'
                          value={values.otp}
                          placeholder="コード"
                          className="bg-[#FCF9F8] rounded-lg w-[80%]"
                          sx={{ height:"46px", padding:"10px"}}
                          error={
                              errors.otp && touched.otp
                                  ? true
                                  : false
                          }
                          helperText={
                            errors.otp && touched.otp
                            ? errors.otp
                            : ''
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                              endAdornment: (
                              <InputAdornment position="end">
                                  <VpnKeyIcon />
                              </InputAdornment>
                              ),}}/>
                        <SpaceY />
                        <Button type="submit" variant="contained" endIcon={<SendIcon sx={{marginBottom:'7px'}} />} sx={{height:50, fontSize:20, width:'80%'}}>
                            検証する
                        </Button>
                        </Form>
                      )}
                    </Formik>
                    <Container maxWidth="sm" className="mt-[15px]">
                        <Stack direction="row" spacing={2} className = "justify-center items-center">
                            <Button className='w-full' variant="text" onClick={() => {navigate('/forgot')}}>メールを再送信する</Button>
                            <Button className='w-full' variant="text" onClick={() => {navigate('/login')}}>ここでログイン</Button>
                        </Stack>
                    </Container> 
            </div>
        </div>
    )
}