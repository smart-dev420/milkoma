import { btnBackground, btnBackgroundHover, fontBold, staticFiles } from "../../components/Constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../axios";
import { getDateString, headers } from "../../utils/appHelper";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, CardMedia, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Icon, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { toast } from "react-toastify";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe, 
    useElements
  } from "@stripe/react-stripe-js";

export const Payment = () => {
    const navigate = useNavigate();
    const { cid } = useParams();
    const contractId = cid??'';
    const loginStatus = useSelector((state:any) => state.auth.isLoggedIn);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const getClientSecret = async () => {
      const response = await axios.post(
        `${API}/api/getClientSecret`,
        { 
            amount : parseFloat(contractInfo.creatorPrice) + parseFloat(contractInfo.fee), 
            currency: 'jpy', 
            customer: customerId }, 
        headers()
    );
    console.log('response - ', response.data.clientSecret);
    setClientSecret(response.data.clientSecret);
    }
    const [ contractInfo, setContractInfo ] = useState<any>(null);
    const [ open, setOpen ] = useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<boolean>(false);
    const [ customerId, setCustomerId ] = useState<string>();
    const [ paid, setPaid ] = useState<boolean>(false);
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
    const handleOpen = () => {
        setOpen(true);
    };

    const getContractInfo = async () => {
        const res = await axios.post(`${API}/api/getContractInfo/${contractId}`, {}, headers());
        const userInfo = await axios.post(`${API}/api/getUserProfile`, {}, headers());
        setContractInfo(res.data);
        setCustomerId(userInfo.data.customer_id);
        setPaid(false);
    }
    useEffect(() => {
        if(loginStatus) getContractInfo();
    }, [paid]);

    const handlePrePay = () => {
        if (stripe && elements && customerId) {
            getClientSecret();
            handleOpen();
        }
    }

    const handleSubmit = async () => {
        if (!stripe || !elements || !clientSecret) return;
      
        try {
          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement('cardNumber')!,
            },
          });
      
          if (result.error) {
            switch (result.error.code) {
              case 'authentication_required':
                // Handle authentication required error
                toast.error('認証が必要です');
                console.error('Authentication required:', result.error.message);
                // Perform necessary action like additional authentication
                break;
              case 'card_error':
                // Handle card error
                toast.error('カードエラー');
                console.error('Card error:', result.error.message);
                // Display appropriate message to the user
                break;
              case 'insufficient_funds':
                // Handle insufficient funds error
                toast.error('残高不足');
                console.error('Insufficient funds:', result.error.message);
                // Inform the user about insufficient funds
                break;
              // Handle other error codes or types here as needed
              default:
                console.error('Payment failed:', result.error.message);
                // Display a generic error message to the user
            }
          } else if (result.paymentIntent?.status === 'succeeded') {
            // Payment successful
            try{
                toast.success('支払いが完了しました');
                handleClose();
                await axios.post(`${API}/api/paymentSave/${contractId}`, {}, headers());
            } catch (err) {
                console.error(err);
            }
          }
        } catch (error) {
          // Handle general errors here
          console.error('Error processing payment:', error);
          // Display a generic error message to the user
        }
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
                    onClick={() => {navigate(`/mypage/detail/${contractId}`);}}>
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
                                    希望納期: {contractInfo.step3 > 0 ? contractInfo.step3 + 'ヶ月': '相談したい'}
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
                                        <Typography sx={{fontSize:'18px', color:'#001219', lineHeight:'100%', marginTop:'3px', fontWeight:fontBold}}>{contractInfo.billed?'00,000円':contractInfo.creatorPrice.toLocaleString()+'円'}</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' flex={1}>
                                        <Typography sx={{fontSize:'18px', color:'#001219', fontWeight:fontBold}}>+</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' flex={3}>
                                        <Typography sx={{fontSize:'10px', color:'#85766D', fontWeight:fontBold}}>ディレクター費用</Typography>
                                        <Typography sx={{fontSize:'18px', color:'#001219', lineHeight:'100%', marginTop:'3px', fontWeight:fontBold}}>{contractInfo.billed?'00,000円':contractInfo.fee.toLocaleString()+'円'}</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' flex={1}>
                                        <Typography sx={{fontSize:'18px', color:'#001219', fontWeight:fontBold}}>=</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' alignItems='' flex={3} sx={{marginTop:'auto'}}>
                                        <Typography sx={{fontSize:'24px', color:'#B9324D', lineHeight:'100%', marginTop:'5px', fontWeight:fontBold}}>{contractInfo.billed?'見積もり中':(contractInfo.creatorPrice + contractInfo.fee).toLocaleString()+'円'}</Typography>
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
                    </Box>  

                    {/** Card Number */}
                    <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                        <Box
                            id = "card-number-element"
                            sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF', paddingY:'20px', fontSize:'20px'}}
                            >
                        <CardNumberElement />
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='row' sx={{marginTop:'16px', columnGap:'15px'}}>
                        <Typography sx={{fontSize:'14px', color:'#858997', whiteSpace:'nowrap', width:'180px'}}>利用できるブランド : </Typography>
                        <CardMedia component='img' image={staticFiles.images.cardLogo1} sx={{width:'53px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo2} sx={{width:'26px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo3} sx={{width:'22px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo4} sx={{width:'29px',height:'16px'}}/>
                        <CardMedia component='img' image={staticFiles.images.cardLogo5} sx={{width:'25px',height:'16px'}}/>
                    </Box>

                    {/** Month  and Year*/}
                    <Box display='flex' flexDirection='row' sx={{columnGap:'16px', marginTop:'30px'}}>
                        <Box display='flex' flexDirection='column' sx={{width:'100%'}}>
                            <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold, marginBottom:'14px'}}>有効期限(年)</Typography>
                            <Box display='flex' flexDirection='column' justifyContent='space-between' 
                            sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                                <Box
                                id = "card-expiry-element"
                                sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF', paddingY:'20px', fontSize:'20px'}}
                                >
                                    <CardExpiryElement />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/** CVC */}
                    <Box display='flex' flexDirection='column' sx={{marginTop:'30px'}}>
                        <Typography sx={{color:'#454545', fontSize:'18px', fontWeight:fontBold, marginBottom:'14px', }}>CVC(セキュリティコード)</Typography>
                        <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}> 
                            <Box
                            id = "card-cvc-element"
                            sx={{ whiteSpace:'normal', width:'100%', backgroundColor:'#FFFFFF', paddingY:'20px', fontSize:'20px'}}
                            >
                                <CardCvcElement />
                            </Box>
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
                            }}
                            disabled = {contractInfo && contractInfo.billed}
                            onClick={handlePrePay}
                        >
                                決済する
                        </Button>
                    </Box>
                </Box>
            </Box>
          
            {/** Payment Checking Dialog */}                                    
            <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            >
            <DialogTitle sx={{ paddingTop: '50px', paddingLeft:'50px', fontSize: '22px', color:'#454545', fontWeight:fontBold }} id="customized-dialog-title">
                お支払い
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

                {/* <CloseIcon sx={{ color: isHovered ? '#B9324D' : '#A5A5A5', fontSize: '30px', fontWeight:'1000'}}/> */}
            </IconButton>
            <DialogContent sx={{paddingX: '50px', marginTop:'0px', width:'802px'}}>
                <Typography gutterBottom sx={{fontSize:'16px', color:'#454545'}} >
                    制作依頼のお支払いを行いますよろしいですか？<br />
                    ※内容を確認してください
                </Typography>
                <Typography sx={{marginTop:'50px', color:'#001219', fontSize:'14px', fontWeight:fontBold}}>選択中のカード</Typography>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{marginY:'20px', paddingY:'12px', paddingX:'7px', columnGap:'50px'}}>
                        <Box display='flex' flexDirection='row' sx={{width:'70%'}}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                sx={{
                                paddingY: '33px',
                                paddingX: '44px',
                                borderRadius: '30px',
                                width:'100%',
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
                                    2454
                                </Typography>
                                <Typography sx={{ fontSize: '22px', fontWeight: fontBold, marginX: '10px' }}>
                                    ****
                                </Typography>
                                <Typography sx={{ fontSize: '22px', fontWeight: fontBold, marginX: '10px' }}>
                                    ****
                                </Typography>
                                <Typography sx={{ fontSize: '22px', fontWeight: fontBold, marginLeft: '10px' }}>
                                    5473
                                </Typography>
                                </Box>
                                <Typography sx={{ fontSize: '20px', color: '#FFFFFF', fontWeight: fontBold, marginTop: '6px' }}>
                                メインのカード
                                </Typography>
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' sx={{width:'50%', rowGap:'10px'}}>
                            <Typography sx={{color:'#001219', fontSize:'14px', fontWeight:fontBold}}>合計金額(税込)</Typography>
                            <Typography sx={{color:'#B9324D', fontSize:'24px', fontWeight:fontBold}}>{contractInfo && (contractInfo.creatorPrice + contractInfo.fee).toLocaleString()}円</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{color:'#B9324D', fontSize:'14px'}}>
                        ※お支払い後、クレジットカードの変更などの理由としたキャンセル手続きができません。<br />
                        あらかじめご了承ください
                    </Typography>
            </DialogContent>
            <Box display='flex' flexDirection='row' justifyContent='center' sx={{columnGap:'30px', marginY:'30px'}}>
                <Button sx={{
                    backgroundColor:'#FFFFFF', 
                    borderRadius:'14px', 
                    border:'2px solid #DF8391',
                    paddingX:'50px', color:'#DF8391',
                    height:'60px',
                    marginBottom:'15px',
                    "&:hover": {
                        backgroundColor: '#EE7D90',
                        color:'#FFFFFF'
                    },
                    }}
                    onClick={handleClose}
                    >
                    <Typography sx={{fontSize:'16px' }}>      
                        キャンセル
                    </Typography>
                </Button>
                <Button sx={{
                    backgroundColor:btnBackground, 
                    borderRadius:'14px', 
                    paddingX:'50px', color:'red',
                    height:'60px',
                    marginBottom:'15px',
                    "&:hover": {
                        backgroundColor: btnBackgroundHover
                    },
                    }}
                    onClick={handleSubmit}
                    >
                    <Typography sx={{color:'#ffffff', fontSize:'16px' }}>      
                        お支払いする
                    </Typography>
                </Button>
            </Box>    
        </Dialog>
        </Stack>
    </Container>
    )
}