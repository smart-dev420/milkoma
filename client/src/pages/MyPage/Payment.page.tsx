import { btnBackground, btnBackgroundHover, fontBold, staticFiles } from "../../components/Constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../axios";
import { getDateString, headers } from "../../utils/appHelper";
import { useDispatch } from "react-redux";
import { Box, Button, Card, CardMedia, Container, Divider, Grid, Icon, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import * as yup from "yup";
import {Form, Formik} from "formik";
import { toast } from "react-toastify";

type FormData = {
    cardNumber: string;
    username: string;
    month: string;
    year: string;
    cvc: string;
  };
  
const validationSchema = yup.object().shape({
    cardNumber: yup.string().required('エラー'),
    username: yup.string().required('エラー'),
    month: yup.string().required('エラー'),
    year: yup.string().required('エラー'),
    cvc: yup.string().required('エラー'),
});

export const Payment = () => {
    const navigate = useNavigate();
    const { cid } = useParams();
    const contractId = cid??'';
    const [ contractInfo, setContractInfo ] = useState<any>(null);
    const [ card, setCard ] = useState({
        username:'',
        cardNumber: '',
        month:'',
        year:'',
        cvc:'',
    });
    const getContractInfo = async () => {
        const res = await axios.post(`${API}/api/getContractInfo/${contractId}`, {}, {headers});
        setContractInfo(res.data);
    }
    useEffect(() => {
        getContractInfo();
    }, []);

    const validateCardNumber = (value:any) => {
        if(isNaN(value) || value.length > 16){
            return false;
        }
        else{
            return true;
        }
    }
    const onSubmit = async (data:FormData) => {
        const formData = new FormData();
        formData.append('cardNumber', data.cardNumber);
        formData.append('username', data.username);
        formData.append('month', data.month);
        formData.append('year', data.year);
        formData.append('cvc', data.cvc);
        const query = `${API}/`;
        toast.success("ok");
        // try {
            
        // } catch (error:any) {
        //     const result = error.response.data.msg;
        //     toast.error(result);
        // }
    };

    return(
    <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'68px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
        <Stack direction="column" sx={{paddingX:'18px', width:'100%'}}>
            {/** Back button and Page Title */}    
            <Box display='flex' flexDirection='row' alignItems='center'>
                <Button sx={{
                    backgroundColor:btnBackground, 
                    borderRadius:'25px', 
                    width:'147px', color:'red',
                    "&:hover": {
                        backgroundColor: btnBackgroundHover
                    },
                    }}
                    onClick={() => {navigate('/mypage/project')}}>
                    <CardMedia
                        component="img"
                        alt="Image1"
                        height="25"
                        sx={{borderRadius:'20px', width:'25px', marginRight:'10px'}}
                        image={staticFiles.icons.ic_back_white} />
                    <Typography sx={{color:'#ffffff', fontSize:'18px', fontWeight:fontBold}}>      
                        戻る
                    </Typography>
                </Button>

                <Typography flex={9} sx={{color:'#511523', fontSize:'22px', marginLeft:'23px', fontWeight:fontBold}}>お支払い</Typography>
            </Box>

            {/** Payment Data */}
            { contractInfo && (
                <Box display='flex' flexDirection='row' sx={{border:'3px solid #DF8391', borderRadius:'30px', paddingX:'33px', paddingY:'37px', width:'100%', marginTop:'25px'}}>
                    <Box display='flex' flexDirection='column' sx={{width:'30%', rowGap:'15px'}}>
                        <Typography sx={{color:'#85766D', fontSize:'12px', fontWeight:fontBold}}>案件名</Typography>
                        <Typography sx={{color:'#B9324D', fontSize:'18px', fontWeight:fontBold}}>{contractInfo.category}の案件</Typography>
                        <Typography sx={{color:'#85766D', fontSize:'11px', fontWeight:fontBold}}>依頼内容</Typography>
                        <Box display='flex' flexDirection='row'>
                        <Typography sx={{
                                border:'1px solid #CE6F82', 
                                color:'#B9324D', 
                                fontSize:'10px', 
                                paddingY:'7px', 
                                paddingX:'20px',
                                textAlign:'center',
                                borderRadius:'38px',
                                whiteSpace:'nowrap'
                                }}>
                                    {contractInfo.step2}
                            </Typography>
                            <Typography sx={{
                                border:'1px solid #CE6F82', 
                                color:'#B9324D', 
                                fontSize:'10px', 
                                paddingY:'7px', 
                                paddingX:'20px',
                                textAlign:'center',
                                borderRadius:'38px',
                                marginLeft:'15px',
                                whiteSpace:'nowrap'
                                }}>
                                    希望納期: {contractInfo.step3}ヶ月
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='column' sx={{width:'70%'}}>
                        <Typography sx={{fontSize:'12px', color:'#85766D', marginBottom:'30px', fontWeight:fontBold}}>ご請求金額</Typography>
                        <Box display='flex' flexDirection='row' alignItems='center'>
                            <Box display='flex' flexDirection='column' flex={8} >
                                <Box display='flex' flexDirection='row' sx={{marginBottom:'16px'}}>
                                    <Typography flex={9} sx={{color:'#001219', fontSize:'14px', fontWeight:fontBold}}>金額(内訳)</Typography>
                                    <Typography flex={3} sx={{color:'#001219', fontSize:'14px', fontWeight:fontBold}}>合計金額(税込)</Typography>
                                </Box>
                                <Box display='flex' flexDirection='row' alignItems='center'>
                                    <Box display='flex' flexDirection='column' flex={3}>
                                        <Typography sx={{fontSize:'10px', color:'#85766D', fontWeight:fontBold}}>インフルエンサー費用</Typography>
                                        <Typography sx={{fontSize:'18px', color:'#001219', lineHeight:'100%', marginTop:'3px', fontWeight:fontBold}}>{contractInfo.creatorPrice.toLocaleString()+'円'}</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' flex={1}>
                                        <Typography sx={{fontSize:'18px', color:'#001219', fontWeight:fontBold}}>+</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' flex={3}>
                                        <Typography sx={{fontSize:'10px', color:'#85766D', fontWeight:fontBold}}>ディレクター費用</Typography>
                                        <Typography sx={{fontSize:'18px', color:'#001219', lineHeight:'100%', marginTop:'3px', fontWeight:fontBold}}>{contractInfo.fee.toLocaleString()+'円'}</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' flex={1}>
                                        <Typography sx={{fontSize:'18px', color:'#001219', fontWeight:fontBold}}>=</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' alignItems='' flex={3} sx={{marginTop:'auto'}}>
                                        <Typography sx={{fontSize:'24px', color:'#B9324D', lineHeight:'100%', marginTop:'5px', fontWeight:fontBold}}>{(contractInfo.creatorPrice + contractInfo.fee).toLocaleString()+'円'}</Typography>
                                    </Box>
                                </Box>

                            </Box>
                            
                        </Box>
                    </Box>
                </Box>
            )}

            <Box display='flex' flexDirection='row' sx={{ columnGap: '50px' }}>
                <CardMedia 
                    component='img'
                    image={staticFiles.images.addCard}
                    sx={{ marginTop:'35px', width:'50%', objectFit:'contain'}}
                />
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{marginTop:'35px', marginBottom:'14px'}}>
                        <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold}}>カード番号</Typography>
                        <Typography sx={{color:'#FF4A55', fontSize:'12px', fontWeight:fontBold, display:validateCardNumber(card.cardNumber)?'none':''}}>カード番号が正しく入力されていません</Typography>
                    </Box>  

                    {/** Card Number */}
                    <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                        <TextField
                            id = "cardNumber"
                            name='cardNumber'
                            type={"text"}
                            placeholder="カード番号を入力"
                            value={card.cardNumber}
                            className="bg-[#FCF9F8] rounded-lg w-[90%]"
                            onChange={()=>{}}
                            sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF'}}
                            inputProps={{
                                maxLength: 16, // Set maximum length to 16 characters
                            }}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={() => setCard({ ...card, cardNumber: '' })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path id="Vector" d="M13.038,9l4.544-4.545a1.432,1.432,0,0,0,0-2.02L15.56.416a1.434,1.434,0,0,0-2.019,0L9,4.96,4.453.416a1.434,1.434,0,0,0-2.019,0L.417,2.435a1.432,1.432,0,0,0,0,2.02L4.96,9,.417,13.546a1.432,1.432,0,0,0,0,2.019l2.019,2.018a1.431,1.431,0,0,0,2.019,0L9,13.04l4.544,4.543a1.435,1.435,0,0,0,2.022,0l2.019-2.018a1.432,1.432,0,0,0,0-2.019Z" 
                                        fill='#B9324D'/>
                                    </svg>  
                                </InputAdornment>
                                ),
                            }}
                            />
                    </Box>
                    <Box display='flex' flexDirection='row' sx={{marginTop:'16px', columnGap:'15px'}}>
                        <Typography sx={{fontSize:'14px', color:'#858997', whiteSpace:'nowrap', width:'180px'}}>利用できるブランド : </Typography>
                        <CardMedia component='img' image={staticFiles.images.cardLogo1} sx={{width:'53px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo2} sx={{width:'26px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo3} sx={{width:'22px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo4} sx={{width:'29px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo5} sx={{width:'25px',height:'16px'}}/>
                    </Box>

                    {/** User Name */}
                    <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{marginTop:'30px', marginBottom:'14px'}}>
                        <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold}}>カード名義</Typography>
                    </Box>  
                    <Box display='flex' flexDirection='column' justifyContent='space-between' 
                        sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                        <TextField
                            id = "username"
                            name='username'
                            type={"text"}
                            placeholder="名義を入力"
                            value={card.username}
                            className="bg-[#FCF9F8] rounded-lg w-[90%]"
                            onChange={(e)=>{setCard({...card, username:e.target.value})}}
                            sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF'}}
                            />
                    </Box>

                    {/** Month  and Year*/}
                    <Box display='flex' flexDirection='row' sx={{columnGap:'16px', marginTop:'30px'}}>
                        <Box display='flex' flexDirection='column' sx={{width:'50%', }}>
                            <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold, marginBottom:'14px'}}>有効期限(月)</Typography>
                            <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}> 
                            <TextField
                            id = "month"
                            name='month'
                            type={"text"}
                            placeholder="MM"
                            value={card.month}
                            className="bg-[#FCF9F8] rounded-lg w-[90%]"
                            onChange={(e)=>{setCard({...card, month:e.target.value})}}
                            sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF'}}
                            inputProps={{
                                maxLength: 2, 
                            }}
                            />
                            </Box>
                        </Box>

                        <Box display='flex' flexDirection='column' sx={{width:'50%'}}>
                            <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold, marginBottom:'14px'}}>有効期限(月)</Typography>
                            <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                            <TextField
                            id = "year"
                            name='year'
                            type={"text"}
                            placeholder="YYYY"
                            value={card.year}
                            className="bg-[#FCF9F8] rounded-lg w-[90%]"
                            onChange={(e)=>{setCard({...card, year:e.target.value})}}
                            sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF'}}
                            inputProps={{
                                maxLength: 4, 
                            }}
                            />
                            </Box>
                        </Box>
                    </Box>

                    {/** CVC */}
                    <Box display='flex' flexDirection='column' sx={{marginTop:'30px'}}>
                        <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold, marginBottom:'14px', }}>CVC(セキュリティコード)</Typography>
                        <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}> 
                            <TextField
                            id = "cvc"
                            name='cvc'
                            type={"text"}
                            placeholder="CVC"
                            value={card.cvc}
                            className="bg-[#FCF9F8] rounded-lg w-[90%]"
                            onChange={(e)=>{setCard({...card, cvc :e.target.value})}}
                            inputProps={{
                                maxLength: 4, 
                            }}
                            sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF'}}
                            />
                            </Box>
                    </Box>
                    <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button sx={{
                            backgroundColor:btnBackground, 
                            borderRadius:'40px', 
                            paddingX:'50px',
                            color:'#ffffff', fontSize:'16px', fontWeight: fontBold, 
                            marginTop:'30px', 
                            "&:hover": {
                                backgroundColor: '#D48996'
                            },
                            }}>
                                決済する
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Stack>
    </Container>
    )
}