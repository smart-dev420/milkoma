import { Box, Button, CardMedia, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Slider, Stack, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { btnBackground, btnBackgroundHover, fontBold, staticFiles } from "../../components/Constants";
import { setPage } from "../../slices/page";
import { useState } from "react";
import { showSentence } from "../../utils/appHelper";
import * as yup from "yup";
import {Form, Formik} from "formik";
import axios from 'axios';
import { API } from "../../axios";
import { toast } from "react-toastify";

/** Add Card */
type FormData = {
    cardNumber: string;
  };
  
const validationSchema = yup.object().shape({
    cardNumber: yup
        .string()
        .required('エラー'),
});

export const CardManage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<boolean>(false);
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

    const onSend = async (data:FormData) => {
        const formData = new FormData();
        formData.append('cardNumber', data.cardNumber);
        const query = `${API}/`;
        toast.success("ok");
        // try {
            
        // } catch (error:any) {
        //     const result = error.response.data.msg;
        //     toast.error(result);
        // }
    };

    const [ cardNumberValidation, setCardNumberValidation ] = useState<boolean>(true);
    const validateCardNumber = (value:string) => {
        if(isNaN(parseInt(value)) || value.length!== 16){
            setCardNumberValidation(true)
        }
        else{
            setCardNumberValidation(false)
        }
    }

    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" sx={{paddingX:'26px', width:'100%'}}>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography sx={{color:'#511523', fontSize:'25px', fontWeight:fontBold}}>登録しているクレジットカード</Typography>
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
                    <Typography sx={{color:'#ffffff', fontSize:'15px', fontWeight:fontBold }}>      
                        カードを追加
                    </Typography>
                </Button>
                </Box>
                <Box display='flex' flexDirection='row' sx={{marginTop:'72px', columnGap:'40px', rowGap:'20px'}} flexWrap='wrap'>
                    <BankCard type={1} firstNumber={2454} lastNumber={5473} />
                    <BankCard type={0} firstNumber={2454} lastNumber={5473} />
                    <BankCard type={0} firstNumber={2454} lastNumber={5473} />
                </Box>
                {/** Bill Download Dialog */}                                    
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            >
            <DialogTitle sx={{ m: 0, paddingTop: '50px', paddingLeft:'50px', fontSize: '25px', color:'#454545', fontWeight:fontBold }} id="customized-dialog-title">
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
                }}
                validationSchema={validationSchema}
                onSubmit={(data:FormData, actions) => {
                    actions.setSubmitting(true);
                    onSend(data);
                    actions.setSubmitting(false);
                    // setCardNumberValue('');
                }}
            >
            {({values, touched, errors, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off' className='flex flex-col justify-center items-center w-full'>
            <DialogContent sx={{padding: '50px', marginTop:'-50px', width:'802px'}}>
                <Typography gutterBottom sx={{fontSize: "18px", color:'#454545'}} >
                    クレジットカードを登録します。
                </Typography>
                <CardMedia 
                    component='img'
                    image={staticFiles.images.addCard}
                    sx={{width:'419px', height:'241px', marginX:'auto', marginTop:'35px'}}
                />
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{marginTop:'35px',}}>
                    <Typography sx={{color:'#454545', fontSize:'20px', fontWeight:fontBold}}>カード番号</Typography>
                    <Typography sx={{color:'#FF4A55', fontSize:'14px', fontWeight:fontBold, display:cardNumberValidation?'none':''}}>カード番号が正しく入力されていません</Typography>
                </Box>  
                <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{paddingX:'15px', border:'2px solid #EC605B', borderRadius:'14px'}}>
                    <TextField
                          id = "cardNumber"
                          name='cardNumber'
                          type={"text"}
                          placeholder="カード番号を入力"
                        //   variant="standard" 
                          value={values.cardNumber}
                          className="bg-[#FCF9F8] rounded-lg w-[90%]"
                          error={
                              errors.cardNumber && touched.cardNumber
                                  ? true
                                  : false
                          }
                          onChange={(e)=>{setFieldValue('cardNumber', values.cardNumber); validateCardNumber(e.target.value); }}
                          onBlur={handleBlur}
                          sx={{ whiteSpace:'normal', width:'100%',}}
                          inputProps={{
                            inputMode: "numeric", // Set input mode to numeric
                            pattern: "[0-9]{16}", // Specify pattern for 16 digits
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
            </DialogContent>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button
                    type="submit"
                sx={{
                    backgroundColor:btnBackground, 
                    borderRadius:'14px', 
                    width:'446px', color:'red',
                    height:'60px',
                    marginBottom:'15px',
                    "&:hover": {
                        backgroundColor: btnBackgroundHover
                    },
                    }}>
                    <Typography sx={{color:'#ffffff', fontSize:'18px' }}>      
                        追加する
                    </Typography>
                </Button>
            </Box>    
             </Form>
             )}
         </Formik>
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
            <Typography sx={{ fontSize: '17px', fontWeight: fontBold, marginRight: '10px' }}>
                {firstNumber}
            </Typography>
            <Typography sx={{ fontSize: '17px', fontWeight: fontBold, marginX: '10px' }}>
                ****
            </Typography>
            <Typography sx={{ fontSize: '17px', fontWeight: fontBold, marginX: '10px' }}>
                ****
            </Typography>
            <Typography sx={{ fontSize: '17px', fontWeight: fontBold, marginLeft: '10px' }}>
                {lastNumber}
            </Typography>
            </Box>
            <Typography sx={{ fontSize: '21px', color: type === 1?'#FFFFFF':'#E38A86', fontWeight: fontBold, marginTop: '11px' }}>
            {type === 1 ? 'メインのカード' : 'サブのカード'}
            </Typography>
        </Box>
    );
  };