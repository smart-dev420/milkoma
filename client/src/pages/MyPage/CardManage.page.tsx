import { Box, Button, CardMedia, Checkbox, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Slider, Stack, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { btnBackground, btnBackgroundHover, fontBold, scrollTop, staticFiles } from "../../components/Constants";
import { setPage } from "../../slices/page";
import { useEffect, useState } from "react";
import { checkToken, headers, showSentence } from "../../utils/appHelper";
import * as yup from "yup";
import {Form, Formik} from "formik";
import axios from 'axios';
import { API } from "../../axios";
import { toast } from "react-toastify";

/** Add Card */
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

export const CardManage = () => {
    scrollTop();
    const [open, setOpen] = useState<boolean>(false);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<boolean>(false);
    const loginStatus = useSelector((state:any) => state.auth.isLoggedIn);
    const [ cardData, setCardData ] = useState({
        type: 'Master Card®︎',
        cardNumber: '2454123412345473',
        username: 'KAZU WATANABE',
    });
    const [ history, setHistory ] = useState<any>(null);
    const getPayHistory = async () => {
        await checkToken();
        const res = await axios.post(`${API}/api/getPaymentHistory`, {}, headers());
        setHistory(res.data);
        console.log(res.data);
    }

    useEffect(()=>{
        if(loginStatus) getPayHistory()
    }, []);
    const firstNumber = cardData.cardNumber.substring(0, 4);
    const lastNumber = cardData.cardNumber.substring(cardData.cardNumber.length - 4);
    const handleClose = () => {
        setOpen(false);
        setIsHovered(false);
    };
    const handleHoverEnter = () => {
        setIsHovered(true);
    }
    const handleHoverLeave = () => {
        setIsHovered(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseCard = () => {
        setDeleteDialog(false);
        setIsHovered(false);
    };
    const handleOpenCard = () => {
        setDeleteDialog(true);
    };

    const [ checked, setChecked ] = useState<boolean>(false);
    const handleChecked = () => {
        setChecked(!checked);
        console.log(checked);
    }
    // const onSubmit = async (data:FormData) => {
    //     const formData = new FormData();
    //     formData.append('cardNumber', data.cardNumber);
    //     formData.append('username', data.username);
    //     formData.append('month', data.month);
    //     formData.append('year', data.year);
    //     formData.append('cvc', data.cvc);
    //     const query = `${API}/`;
    //     toast.success("ok");
    //     // try {
            
    //     // } catch (error:any) {
    //     //     const result = error.response.data.msg;
    //     //     toast.error(result);
    //     // }
    // };

    // const validateCardNumber = (value:any) => {
    //     if(isNaN(value) || value.length > 16){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // }

    const [ moreView, setMoreView ] = useState(5);

    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" sx={{paddingX:'26px', width:'100%'}}>
                {/* <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography sx={{color:'#511523', fontSize:'22px', fontWeight:fontBold}}>登録しているクレジットカード</Typography>
                <Button sx={{
                    backgroundColor:btnBackground, 
                    borderRadius:'36px', 
                    width:'196px', color:'red',
                    height:'35px',
                    "&:hover": {
                        backgroundColor: btnBackgroundHover
                    },
                    }}
                    onClick={handleClickOpen}>
                    <Typography sx={{color:'#ffffff', fontSize:'14px', fontWeight:fontBold }}>      
                        カードを追加
                    </Typography>
                </Button>
                </Box> */}
                {/* <Box display='flex' flexDirection='row' sx={{marginTop:'72px', columnGap:'40px', rowGap:'20px'}} flexWrap='wrap'>
                    <BankCard type={1} firstNumber={2454} lastNumber={5473} />
                    <BankCard type={0} firstNumber={2454} lastNumber={5473} />
                    <BankCard type={0} firstNumber={2454} lastNumber={5473} />
                </Box>
                <Typography sx={{fontSize:'22px', color:'#511523', fontWeight:fontBold, marginTop:'86px', marginBottom:'32px'}}>カード詳細</Typography> */}

            {/** Card Data */}    
                {/* <Box display='flex' flexDirection='row' sx={{columnGap:'35px'}}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{
                        paddingY: '33px',
                        paddingX: '44px',
                        borderRadius: '30px',
                        width: '457px',
                        height: '290px',
                        cursor:'pointer',
                        backgroundColor: '#E38A86',
                        }}
                    >
                        <CardMedia
                        component="img"
                        image={staticFiles.images.bankLogo2}
                        sx={{ width: '69px', height: '40px', zIndex: 5 }}
                        />
                        <Box display="flex" flexDirection="row" sx={{ marginTop: '93px', color:'#FFFFFF' }}>
                        <Typography sx={{ fontSize: '22px', fontWeight: fontBold, marginRight: '10px' }}>
                            {cardData.cardNumber.substring(0,4)}
                        </Typography>
                        <Typography sx={{ fontSize: '22px', fontWeight: fontBold, marginX: '10px' }}>
                            ****
                        </Typography>
                        <Typography sx={{ fontSize: '22px', fontWeight: fontBold, marginX: '10px' }}>
                            ****
                        </Typography>
                        <Typography sx={{ fontSize: '22px', fontWeight: fontBold, marginLeft: '10px' }}>
                            {cardData.cardNumber.substring(cardData.cardNumber.length - 4)}
                        </Typography>
                        </Box>
                        <Typography sx={{fontSize:'14px', color:'#FFF', fontWeight:fontBold, marginTop:'2px'}}>カード名義 : {cardData.username}</Typography>
                        <Typography sx={{ fontSize: '20px', color: '#FFFFFF', fontWeight: fontBold, marginTop: '6px' }}>
                        メインのカード
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='center'>
                        <Typography sx={{fontSize:'18px', color:'#511523', fontWeight:'800', marginBottom:'11px'}}>{cardData.type}</Typography>
                        <Typography sx={{fontSize:'14px', color:'#511523', fontWeight:fontBold, marginBottom:'81px'}}>メインのカードとして設定中</Typography>
                        <Box display='flex' flexDirection='row' sx={{columnGap:'30px'}}>
                            <Button
                                sx={{
                                    backgroundColor:btnBackground, 
                                    borderRadius:'36px', 
                                    width:'230px', color:'red',
                                    height:'41px',
                                    "&:hover": {
                                        backgroundColor: btnBackgroundHover
                                    },
                                    }}
                                    onClick={handleOpenCard}>
                                    <Typography sx={{color:'#ffffff', fontSize:'15px', fontWeight:fontBold }}>      
                                        編集
                                    </Typography>
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor:'#FFF', 
                                    borderRadius:'36px', 
                                    width:'230px', color:'red',
                                    border:'2px solid #BA324D',
                                    height:'41px',
                                    "&:hover": {
                                        backgroundColor: '#FCF4F4'
                                    },
                                    }}>
                                    <Typography sx={{color:'#B9324D', fontSize:'15px', fontWeight:fontBold }}>      
                                        カード削除
                                    </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box> */}
            
            {/** Download list */}
                <Typography sx={{fontSize:'22px', color:'#511523', fontWeight:fontBold, marginTop:'20px', marginBottom:'32px'}}>お支払い履歴</Typography>
                <Box display='flex' flexDirection='column' sx={{rowGap:'15px'}}>
                    {history && history.map((item: any, index: number) => (
                        index < moreView?(<FileDownload data={item} />):null
                    ))}
                </Box>
                <Box display = "flex" alignItems="center" justifyContent='center' sx={{width:'100%'}}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" 
                        sx={{
                            backgroundColor:btnBackground, 
                            width:'72px', 
                            minHeight:'72px', 
                            borderRadius:'50%', 
                            cursor:'pointer', 
                            marginTop:'60px',
                            marginBottom:'10px',
                            boxShadow:'0px 0px 20px 5px #ee7d902c',
                            "&:hover": {
                                backgroundColor: btnBackgroundHover
                            },
                        }}
                        onClick={() => {
                            setMoreView(moreView + 5);
                        }}
                        >
                        <img src={staticFiles.images.more} width={10} className="py-[2px]"/>
                        <p className="text-[9px] py-[2px] text-[#FFFFFF] font-bold" style={{fontWeight:fontBold}}>もっと見る</p>
                    </Box>
                </Box>
        {/** Add Card Dialog*/}                                    
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            >
            <DialogTitle sx={{ m: 0, paddingTop: '50px', paddingLeft:'50px', fontSize: '22px', color:'#454545', fontWeight:fontBold }} id="customized-dialog-title">
                クレジットカード追加
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 30,
                    top: 55,
                    color: (theme) => theme.palette.grey[500],
                    width: '35px',
                    height: '35px',
                }}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path id="Vector" d="M13.038,9l4.544-4.545a1.432,1.432,0,0,0,0-2.02L15.56.416a1.434,1.434,0,0,0-2.019,0L9,4.96,4.453.416a1.434,1.434,0,0,0-2.019,0L.417,2.435a1.432,1.432,0,0,0,0,2.02L4.96,9,.417,13.546a1.432,1.432,0,0,0,0,2.019l2.019,2.018a1.431,1.431,0,0,0,2.019,0L9,13.04l4.544,4.543a1.435,1.435,0,0,0,2.022,0l2.019-2.018a1.432,1.432,0,0,0,0-2.019Z" 
                    fill={`${isHovered?'#B9324D':'#a5a5a5'}`}/>
                </svg>

            </IconButton>
            <Formik
                validateOnChange={true}
                initialValues={{
                    cardNumber: '',
                    username:'',
                    month:'',
                    year:'',
                    cvc:'',
                }}
                validationSchema={validationSchema}
                onSubmit={(data:FormData, actions) => {
                    actions.setSubmitting(true);
                    // onSubmit(data);
                    actions.setSubmitting(false);
                    // setCardNumberValue('');
                }}
            >
            {({values, touched, errors, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off' className='flex flex-col justify-center items-center w-full'>
            <DialogContent sx={{paddingX: '50px', paddingTop:'50px', marginTop:'-50px', width:'802px'}}>
                <Typography gutterBottom sx={{fontSize: "16px", color:'#454545'}} >
                    クレジットカードを登録します。
                </Typography>
                <CardMedia 
                    component='img'
                    image={staticFiles.images.addCard}
                    sx={{width:'419px', height:'241px', marginX:'auto', marginTop:'35px'}}
                />
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{marginTop:'35px', marginBottom:'14px'}}>
                    <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold}}>カード番号</Typography>
                    {/* <Typography sx={{color:'#FF4A55', fontSize:'12px', fontWeight:fontBold, display:validateCardNumber(values.cardNumber)?'none':''}}>カード番号が正しく入力されていません</Typography> */}
                </Box>  

                {/** Card Number */}
                <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                    <TextField
                          id = "cardNumber"
                          name='cardNumber'
                          type={"text"}
                          placeholder="カード番号を入力"
                          value={values.cardNumber}
                          className="bg-[#FCF9F8] rounded-lg w-[90%]"
                          error={
                              errors.cardNumber && touched.cardNumber
                                  ? true
                                  : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF'}}
                          inputProps={{
                            maxLength: 16, // Set maximum length to 16 characters
                          }}
                          InputProps={{
                              endAdornment: (
                              <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={() => setFieldValue('cardNumber', '')}>
                                  {/* {values.cardNumber != ''?(<></>):()} */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <path id="Vector" d="M13.038,9l4.544-4.545a1.432,1.432,0,0,0,0-2.02L15.56.416a1.434,1.434,0,0,0-2.019,0L9,4.96,4.453.416a1.434,1.434,0,0,0-2.019,0L.417,2.435a1.432,1.432,0,0,0,0,2.02L4.96,9,.417,13.546a1.432,1.432,0,0,0,0,2.019l2.019,2.018a1.431,1.431,0,0,0,2.019,0L9,13.04l4.544,4.543a1.435,1.435,0,0,0,2.022,0l2.019-2.018a1.432,1.432,0,0,0,0-2.019Z" 
                                    fill='#B9324D'/>
                                </svg>  
                              </InputAdornment>
                              ),
                          }}
                          />
                </Box>
                <Box display='flex' flexDirection='row' alignItems='center' sx={{marginTop:'16px', columnGap:'15px'}}>
                    <Typography sx={{fontSize:'14px', color:'#858997', whiteSpace:'nowrap', width:'180px'}}>利用できるブランド : </Typography>
                    <CardMedia component='img' image={staticFiles.images.cardLogo1} sx={{width:'53px',height:'16px'}}/>
                    <CardMedia component='img' image={staticFiles.images.cardLogo2} sx={{width:'26px',height:'16px'}}/>
                    <CardMedia component='img' image={staticFiles.images.cardLogo3} sx={{width:'22px',height:'16px'}}/>
                    <CardMedia component='img' image={staticFiles.images.cardLogo4} sx={{width:'29px',height:'16px'}}/>
                    <CardMedia component='img' image={staticFiles.images.cardLogo5} sx={{width:'25px',height:'16px'}}/>
                </Box>

                {/** User Name */}
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{marginTop:'30px', marginBottom:'14px'}}>
                    <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold}}>カード名義</Typography>
                </Box>  
                <Box display='flex' flexDirection='column' justifyContent='space-between' 
                    sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                    <TextField
                          id = "username"
                          name='username'
                          type={"text"}
                          placeholder="名義を入力"
                          value={values.username}
                          className="bg-[#FCF9F8] rounded-lg w-[90%]"
                          error={
                              errors.username && touched.username
                                  ? true
                                  : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          value={values.month}
                          className="bg-[#FCF9F8] rounded-lg w-[90%]"
                          error={
                              errors.month && touched.month
                                  ? true
                                  : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          value={values.year}
                          className="bg-[#FCF9F8] rounded-lg w-[90%]"
                          error={
                              errors.year && touched.year
                                  ? true
                                  : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          value={values.cvc}
                          className="bg-[#FCF9F8] rounded-lg w-[90%]"
                          error={
                              errors.cvc && touched.cvc
                                  ? true
                                  : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 4, 
                          }}
                          sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF'}}
                          />
                          </Box>
                </Box>

                {/** Agree */}
                <label className="flex flex-row items-center cursor-pointer" style={{marginTop:'36px', marginLeft:'-10px'}}>
                    <Checkbox
                        color="primary"
                        className="checkbox"
                        inputProps={{ 'aria-label': 'checkbox' }}
                        onChange={handleChecked}
                    />
                    <span className="text-[#001219] text-[16px] mr-[40px]">メインのカードに設定する</span>
                </label>
                <Typography sx={{fontSize:'14px', color:'#554744', marginTop:'52px'}}>カードを追加すると、<span style={{color:'#EE7D90'}}>プライバシーポリシー</span>や<span style={{color:'#EE7D90'}}>利用規約</span>に同意したこととします。</Typography>

            </DialogContent>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' sx={{marginBottom:'50px',}}>
                <Button
                    type={checked?'submit':'button'}
                sx={{
                    backgroundColor:btnBackground, 
                    borderRadius:'14px', 
                    width:'446px', color:'red',
                    height:'60px',
                    "&:hover": {
                        backgroundColor: btnBackgroundHover
                    },
                    }}>
                    <Typography sx={{color:'#ffffff', fontSize:'16px' }}>      
                        追加する
                    </Typography>
                </Button>
            </Box>    
             </Form>
             )}
         </Formik>
        </Dialog>
        {/** Delete Card Dialog */}
        <Dialog
            onClose={handleCloseCard}
            aria-labelledby="customized-dialog-title"
            open={deleteDialog}
            >
            <DialogTitle sx={{ m: 0, paddingTop: '57px', paddingLeft:'50px', fontSize: '22px', fontWeight:fontBold }} id="customized-dialog-title" className="text-[#511523]">
                クレジットカードの削除
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseCard}
                sx={{
                    position: 'absolute',
                    right: 30,
                    top: 55,
                    color: (theme) => theme.palette.grey[500],
                    fontSize: '29px'
                }}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path id="Vector" d="M13.038,9l4.544-4.545a1.432,1.432,0,0,0,0-2.02L15.56.416a1.434,1.434,0,0,0-2.019,0L9,4.96,4.453.416a1.434,1.434,0,0,0-2.019,0L.417,2.435a1.432,1.432,0,0,0,0,2.02L4.96,9,.417,13.546a1.432,1.432,0,0,0,0,2.019l2.019,2.018a1.431,1.431,0,0,0,2.019,0L9,13.04l4.544,4.543a1.435,1.435,0,0,0,2.022,0l2.019-2.018a1.432,1.432,0,0,0,0-2.019Z" 
                    fill={`${isHovered?'#B9324D':'#a5a5a5'}`}/>
                </svg>
            {/* <CloseIcon sx={{ color: isHovered ? '#B9324D' : '#A5A5A5', fontSize: '30px'}}/> */}
            </IconButton>
            <DialogContent sx={{paddingX: '50px', paddingBottom:'63px', marginTop:'-25px', width:'802px'}}>
            <Typography sx={{fontSize: "16px", marginBottom: "40px"}} >
                クレジットカードを削除します。よろしいですか？<br />
                ※削除した場合は再登録が必要になります。
            </Typography>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <BankCard type={1} firstNumber={parseInt(firstNumber)} lastNumber={parseInt(lastNumber)} />
            </Box>
            </DialogContent>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly'>
                <Button sx={{
                    backgroundColor:'#FFFFFF', 
                    borderRadius:'14px', 
                    width:'265px', border:'2px solid #DF8391',
                    height:'60px',
                    marginBottom:'63px',
                    "&:hover": {
                        backgroundColor: '#FCF4F4'
                    },
                    }}
                    onClick={handleCloseCard}
                    >
                    <Typography sx={{color:'#DF8391', fontSize:'16px', fontWeight:fontBold }}>      
                        キャンセル
                    </Typography>
                </Button>
                <Button 
                    type="submit"
                    sx={{
                        backgroundColor:btnBackground, 
                        borderRadius:'14px', 
                        width:'265px', color:'red',
                        height:'60px',
                        marginBottom:'63px',
                        "&:hover": {
                            backgroundColor: btnBackgroundHover
                        },
                        }}
                    >
                    <Typography sx={{color:'#ffffff', fontSize:'16px', fontWeight:fontBold }}>      
                        確認
                    </Typography>
                </Button>
            </Box> 
        </Dialog>           
            </Stack>
        </Container>
    )
}

const BankCard: React.FC<{ type: number; firstNumber: number; lastNumber: number }> = ({
    type,
    firstNumber,
    lastNumber,
  }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
            paddingY: '22px',
            paddingX: '30px',
            borderRadius: '30px',
            width: '316px',
            height: '200px',
            cursor:'pointer',
            backgroundColor: type === 0?'#F9E5D1':'#E38A86',
            }}
        >
            <CardMedia
            component="img"
            image={type===0?staticFiles.images.bankLogo1:staticFiles.images.bankLogo2}
            sx={{ width: '48px', height: '28px', zIndex: 5 }}
            />
            <Box display="flex" flexDirection="row" sx={{ marginTop: '65px', color:type === 1? '#FFFFFF':'#E38A86' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: fontBold, marginRight: '10px' }}>
                {firstNumber}
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: fontBold, marginX: '10px' }}>
                ****
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: fontBold, marginX: '10px' }}>
                ****
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: fontBold, marginLeft: '10px' }}>
                {lastNumber}
            </Typography>
            </Box>
            <Typography sx={{ fontSize: '16px', color: type === 1?'#FFFFFF':'#E38A86', fontWeight: fontBold, marginTop: '11px' }}>
            {type === 1 ? 'メインのカード' : 'サブのカード'}
            </Typography>
        </Box>
    );
  };

const FileDownload: React.FC<{ data:any }> = ({ data }) => {
    // Received Download
    const handleReceiveDownload = async (name: string) => {
        try {
            const token = localStorage?.getItem('token');
            const headers = {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer " + token
            };
        const fileName = name + '.pdf';
        console.log('fileName - ', fileName);
        const response = await axios.get(`${API}/api/receivedDownload/${fileName}`, {
            responseType: 'blob',
            headers,
            });
    
          // Create a temporary URL to download the file
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          // Handle errors
          console.error('File download error:', error);
        }
    }
    return (
        <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{height:'79px', borderRadius:'10px', border:'1px solid #EE7D90', paddingX:'15px', paddingY:'24px', columnGap:'27px'}}>
            <Typography display='flex' alignItems='center' justifyContent='center' sx={{width:'64px', height:'31px', borderRadius:'38px', backgroundColor:'#F9E5D1', color:'#B9324D', fontSize:'10px', textAlign:'center'}}>案件</Typography>
            <Box display='flex' flexDirection='column' flex={8} sx={{rowGap:'3px'}}>
                <Typography sx={{fontSize:'12px', color:'#424242', fontWeight:fontBold}}>{data.category}</Typography>
                <Typography sx={{fontSize:'10px', color:'#B9324D', fontWeight:fontBold}}>{(data.creatorPrice + data.fee).toLocaleString()} 円</Typography>
            </Box>
            <Button sx={{
                backgroundColor:'#EE7D90', 
                borderRadius:'27px', 
                width:'156px', color:'red',
                height:'31px',
                "&:hover": {
                    backgroundColor: '#E28E9C'
                },
                }}
                onClick={()=>handleReceiveDownload(data._id)}
            >
                <CardMedia
                    component="img"
                    alt="Image1"
                    height="25"
                    sx={{borderRadius:'20px', width:'19px', marginRight:'10px'}}
                    image={staticFiles.images.download} />
                <Typography sx={{color:'#ffffff', fontSize:'10px', fontWeight:fontBold }}>      
                    請求書・領収書
                </Typography>
            </Button>
        </Box>
    );
}