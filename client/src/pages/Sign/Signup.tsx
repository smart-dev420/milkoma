import { Box, Container, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { staticFiles } from "../../components/Constants"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import * as yup from "yup";
import {Form, Formik} from "formik";
import axios from 'axios';
import { API } from '../../axios';
import { signin } from '../../slices/auth';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type FormData = {
    email: string;
    username: string;
    password: string;
    company: string;
    selectedOption: string;
    role: string;
    live: string;
    youtube: string;
    tiktok: string;
    instagram: string;
  };
  
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('有効な電子メールを入力してください')
        .required('電子メールは必須です'),
    username: yup.string().required('氏名を入力してください'),
    password: yup
        .string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
            '有効なパスワードを入力して下さい。 大文字 1 つ、小文字 1 つ、特殊文字 1 つ、スペースなし'
        )
        .required('パスワードが必要'),
    company: yup
        .string().required('会社名は必須です'),
});

export const SignUp = () => {

    const [ showState, setShowState ] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ checked, setChecked] = useState(0);
    const [ checked1, setChecked1 ] = useState(true);
    const [ checked2, setChecked2 ] = useState(false);

    const handleCheckedChange = (e:any) => {
        setChecked(e.target.value);
        setChecked1(!checked1);
        setChecked2(!checked2);
        console.log("checked", checked);
    };
    
    const onSignUp = async (data: FormData) => {
        const formData = new FormData();
        const query = `${API}/auth/register`;
        formData.append('email', data.email);
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('company', data.company);
        formData.append('role', data.role);
        formData.append('live', data.live??"");
        formData.append('youtube', data.youtube??"");
        formData.append('tiktok', data.tiktok??"");
        formData.append('instagram', data.instagram??"");

        try{
            let res;
            console.log("res - ", data);
            if (checked == 1) {
              if (data.live == "" || data.youtube == "" || data.tiktok == "" || data.instagram == "") {
                toast.error("すべてのSNSフィールドを挿入");
                return;
              }
            }
            res = await axios.post(query, formData);
            if (res.status === 200) {
                toast.success('サインアップが成功しました');
                navigate("/login");
              } else {
                console.log(res);
              }
            } catch (error:any) {
              const result = error.response?.data?.err;
              toast.error(result);
            }
        // if(checked == 1){
        //     console.log("res -", data)
        //     if( data.live == "" || data.youtube == "" || data.tiktok == "" || data.instagram == ""){
        //         toast.error("Insert all SNS fields");
        //     }else{
                // try {
                //     const res = await axios.post(query, formData);
                //     if(res.status === 200){
                //         toast.success('Sign Up Succeed')
                //         navigate("/login");
                //     }else{
                //         console.log(res)
                //     }
                // } catch (error:any) {
                //     const result = error.response.data.err;
                //     toast.error(result);
                // }
        //     }
        // }else{
            // try {
            //     const res = await axios.post(query, formData);
            //     if(res.status === 200){
            //         toast.success('Sign Up Succeed')
            //         navigate("/login");
            //     }else{
            //         console.log(res)
            //     }
            // } catch (error:any) {
            //     const result = error.response.data.err;
            //     toast.error(result);
            // }
        // }
    }

    return(
        <div className="px-[2vw] py-[2vh] flex flex-row justify-center items-center h-screen" style={{whiteSpace:'nowrap'}}>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-screen p-[50px]" style={{position:'absolute', top:0, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className="flex flex-col justify-center items-center p-[50px] rounded-[20px] min-w-[500px] bg-[#c9c9c9ad]" style={{border:'2px solid #ffffff4d'}}>
                <img src={staticFiles.icons.ic_logo} className="w-[250px]" />
                <label className="text-[30px] text-[#000] py-[20px]" style={{fontWeight:800}}>登録する</label>
                {/* <img src={staticFiles.images.profile} className="w-[120px] border-[4px] rounded-[1000px] mb-[30px]"/> */}
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            email: '',
                            username: '',
                            password: '',
                            company: '',
                            role:'0',
                            selectedOption: '',
                            live: '',
                            youtube: '',
                            tiktok: '',
                            instagram: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data:FormData, actions) => {
                            actions.setSubmitting(true);
                            onSignUp(data);
                            actions.setSubmitting(false);
                        }}
                    >
                      {({values, setFieldValue, touched, errors, handleBlur, handleChange, isSubmitting}) => (
                        <Form style={{textAlign: 'left'}} noValidate autoComplete='off' className='flex flex-col justify-center items-center w-full'>
                        <TextField
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        variant="standard"
                        placeholder="メールアドレス"
                        className="bg-[#FCF9F8] rounded-lg w-[80%]"
                        sx={{ height:"46px", padding:"10px", marginBottom:"30px"}}
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
                            ),
                        }}
                        />
                    <TextField
                        id="username"
                        name="username"
                        type="text"
                        variant="standard"
                        placeholder="ユーザー名"
                        value={values.username}
                        className="bg-[#FCF9F8] rounded-lg w-[80%]"
                        sx={{padding:"10px", height:"46px", marginBottom:"30px"}}
                        error={
                            errors.username && touched.username? true : false
                        }
                        helperText={
                            errors.username && touched.username
                            ? errors.username
                            : ''
                          }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <PersonIcon />
                            </InputAdornment>
                            ),
                        }}
                        />
                    <TextField
                        id="password"
                        name="password"
                        type={showState?"password":"text"}
                        variant="standard"
                        placeholder="パスワード"
                        value={values.password}
                        className="bg-[#FCF9F8] rounded-lg w-[80%]"
                        sx={{padding:"10px", height:"46px", marginBottom:"35px", whiteSpace:'normal'}}
                        error={errors.password && touched.password ? true : false}
                        helperText={
                            errors.password && touched.password
                                ? errors.password
                                : ''
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    <TextField
                        id="company"
                        name="company"
                        type="text"
                        placeholder="会社名"
                        variant="standard"
                        value={values.company}
                        className="bg-[#FCF9F8] rounded-lg w-[80%]"
                        sx={{padding:"10px", height:"46px", marginBottom:"20px"}}
                        error={
                            errors.company && touched.company? true : false
                        }
                        helperText={
                            errors.company && touched.company
                            ? errors.company
                            : ''
                          }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <BusinessIcon />
                            </InputAdornment>
                            ),
                        }}
                        />
                        <RadioGroup row
                         aria-labelledby="demo-row-radio-buttons-group-label"
                         name="role"
                         value={values.selectedOption.toString()}
                         onChange={(event) => {
                            setFieldValue('role', event.currentTarget.value)
                          }}
                         onBlur={handleBlur}
                         sx={{marginBottom:'5px'}}>
                            <FormControlLabel value='client' control={<Radio value={0} onChange={handleCheckedChange} checked={checked1}/>} label="クライアント" />
                            <FormControlLabel value='creator' control={<Radio value={1} onChange={handleCheckedChange} checked={checked2} />} label="リクエスター" />
                        </RadioGroup>

                        {checked == 1 ? 
                            <>
                            <TextField
                                id="live"
                                name="live"
                                type="text"
                                placeholder="17.Live"
                                value={values.live}
                                variant="standard"
                                className="bg-[#FCF9F8] rounded-lg flex justify-center w-[80%]"
                                sx={{marginBottom:"20px", height:"46px", paddingX:"10px"}}
                                error={
                                    errors.live && touched.live? true : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_item} />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            <TextField
                                id="youtube"
                                name="youtube"
                                type="text"
                                placeholder="Youtube"
                                variant="standard"
                                value={values.youtube}
                                className="bg-[#FCF9F8] rounded-lg flex justify-center w-[80%]"
                                sx={{marginBottom:"20px", height:"46px", paddingX:"10px"}}
                                error={
                                    errors.youtube && touched.youtube? true : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_youtube2} />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                                <TextField
                                id="tiktok"
                                name="tiktok"
                                type="text"
                                placeholder="Tiktok"
                                variant="standard"
                                value={values.tiktok}
                                className="bg-[#FCF9F8] rounded-lg flex justify-center w-[80%]"
                                sx={{marginBottom:"20px", height:"46px", paddingX:"10px"}}
                                error={
                                    errors.tiktok && touched.tiktok? true : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_tiktok} />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                                <TextField
                                id="instagram"
                                name="instagram"
                                type="text"
                                placeholder="Instagram"
                                variant="standard"
                                value={values.instagram}
                                className="bg-[#FCF9F8] rounded-lg flex justify-center w-[80%]"
                                sx={{marginBottom:"20px", height:"46px", paddingX:"10px"}}
                                error={
                                    errors.instagram && touched.instagram? true : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_instagram} />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            </>: null}

                    <Button type = "submit" variant="contained" endIcon={<SendIcon sx={{marginBottom:'5px'}} />} sx={{height:50, fontSize:20, width:'80%'}}>
                        登録する
                    </Button>    
                        </Form>
                      )}
                      </Formik>
                   
                    
                    <Container maxWidth="sm" className="mt-[10px]">
                    <Stack direction="row" spacing={2} className = "justify-center items-center">
                        <Typography color="textSecondary" sx={{marginTop:'10px', fontSize:16}}>既にご登録済みのお客様？</Typography>
                        <Button variant="text" onClick={() => {navigate('/login')}}>ログインはこちら</Button>
                    </Stack>
                    </Container>
            </div>
        </div>
    )
}