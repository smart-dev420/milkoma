import { Box, Button, CardMedia, Checkbox, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import { btnBackground, btnBackgroundHover, fontBold, scrollTop, staticFiles } from "../../components/Constants"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPage } from "../../slices/page";
import { getDateString, headers, showSentence } from "../../utils/appHelper";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import contract, { setContract } from "../../slices/contract";
import axios from "axios";
import { API } from "../../axios";

export const ContractPage = () => {

    const { cid } = useParams();
    const contractId = cid??'';
    const dispatch = useDispatch();
    dispatch(setPage({page:2}));
    const navigate = useNavigate();
    const [ data, setData ] = useState({
        contracted:useSelector((state:any) => state.contract.contracted),
        productIntro: '自社の美容液の紹介をしたい。新商品です。発売予定は12月1日です。@@@商品のURLはhttps://mirucoma.comです。@@@ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。',
    });
    const [ checked, setChecked ] = useState(false);
    const [ contractInfo, setContractInfo ] = useState<any>(null);

    const getContractInfo = async () => {
        const res = await axios.post(`${API}/api/getContractInfo/${contractId}`, {}, {headers});
        setContractInfo(res.data);
    }

    useEffect(() => {
        getContractInfo();
    }, []);

    const handleChange = (event:any) => {
        setChecked(event.target.checked);
      };
    const handleSubmit = (event:any) => {
        if(!checked){
            toast.error('契約書の同意を確認してください。');
        }else{
            setOpen(true);
        }
    }

    const [ open, setOpen ] = useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
        setIsHovered(false);
    };
    const handleConfirm = async () => {
        dispatch(setContract({contracted:true}));
        setOpen(false);
        setData(prevData => ({ ...prevData, contracted: true }));
        try{
            await axios.post(`${API}/api/setContract/${contractId}`, {}, {headers});
        } catch (e) {
            console.error(e);
        }
    }
    const handleHoverEnter = () => {
        setIsHovered(true);
    }
    const handleHoverLeave = () => {
        setIsHovered(false);
    }
    useEffect(()=>{
        scrollTop();
    }, [open])

    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            { contractInfo && (
                <Stack direction="column" sx={{paddingX:'20px', width:'100%'}}>
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
                        onClick={()=>{navigate(`/mypage/detail/${contractId}`); }}>
                            <CardMedia
                                component="img"
                                alt="Image1"
                                height="25"
                                sx={{borderRadius:'20px', width:'25px', marginRight:'10px'}}
                                image={staticFiles.icons.ic_back_white} />
                            <Typography sx={{color:'#ffffff', fontSize:'18px', fontWeight:fontBold }}>      
                                戻る
                            </Typography>
                        </Button>
    
                    <Typography flex={9} sx={{color:'#511523', fontSize:'22px', marginLeft:'23px', fontWeight:fontBold}}>契約書の確認・締結</Typography>
                    <Typography flex={3} sx={{color:'#554744', fontSize:'16px', marginLeft:'23px', fontWeight:fontBold}}>{getDateString(contractInfo.createdDate)} 依頼</Typography>
                    </Box>
    
                    <Typography sx={{color:'#001219', fontSize:'12px', marginTop:'35px'}}>依頼を遂行するために、以下の契約に対して確認、締結を行ってください</Typography>
                     {/** Product Data and Status Data */}                
                     <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{border:'3px solid #DF8391', borderRadius:'30px', marginTop:'28px', width:'100%'}}>
                        <Box display='flex' flexDirection='column' sx={{padding:'33px'}}>
                            <Typography sx={{color:'#85766D', fontSize:'12px', marginBottom:'7px', fontWeight:fontBold}}>案件名</Typography>
                            <Typography sx={{color:'#B9324D', fontSize:'18px', marginBottom:'26px', fontWeight:fontBold}}>{contractInfo.category}の案件</Typography>
                            <Typography sx={{color:'#85766D', fontSize:'10px', marginBottom:'9px', fontWeight:fontBold}}>依頼内容</Typography>
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
                                        希望納期:{contractInfo.step3}ヶ月
                                </Typography>
                            </Box>
                            <Typography sx={{color:'#001219', fontSize:'12px', marginTop:'14px'}}>
                                {contractInfo.step1}
                            </Typography>
                        </Box>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{width:'200px',marginRight:'50px'}}>
                             <CardMedia 
                                component='img'
                                image={staticFiles.images.contract}  
                                sx={{width:'110px', height:'110px', marginBottom:'14px', display:data.contracted?'':'none'}}
                                />
                            <Typography sx={{color:'#001219', fontSize:'12px', display:data.contracted?'':'none'}}>契約書は締結済みです</Typography>
                        </Box>
                    </Box>       
                    {/** Contract content */} 
                    <Box display='flex' flexDirection='column' sx={{width:'100%', padding:'75px', marginTop:'40px', backgroundColor:'#FFFFFF', borderRadius:'50px', boxShadow:'0px 0px 20px 0px #00000017', }}>
                          <Typography sx={{fontSize:'22px', color:'#001219', fontWeight:'600'}}>第1条( 目 的 )</Typography>          
                          <Typography sx={{fontSize:'22px', color:'#001219', marginTop:'27px'}}>本契約は甲乙相互間の信頼に基づく公正な取引関係を確立し、相互の利益と業務の発展をはかること を目的とする。</Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', fontWeight:'600', marginTop:'30px'}}>第2条 ( 業務内容 )</Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', marginTop:'27px', letterSpacing:'-1px'}}>
                            1 甲は、乙に対し、甲のコンサルティング業務に関し、下記業務(以下「本件業務」という)を委託し、<br />
                            乙はこれを受託する。<br />
                            (1)テーマ:Web サイト制作におけるプログラミングの基礎及び応用のノウハウを提供 Web サイト<br />
                            制作におけるプログラミングの基礎及び応用のノウハウを提供 (2)サイズ/形態:オンラインにてコンサルティング対応(月4回まで)。<br />
                            2 乙の作業開始は、本契約の締結後、甲より乙へ入金がされ、乙が入金確認をした日より開始されるも のとする。<br />
                            3 期間は 6 ヶ月間とし、甲の進捗次第で最大 6 ヶ月まで延⻑とする。 また延⻑に関して、乙の判断で実施の可否とする。<br />
                            4 乙は甲の要求する成果の保証をしないものとする。
                          </Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', fontWeight:'600', marginTop:'128px'}}>第2条 ( 業務内容 )</Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', marginTop:'27px', letterSpacing:'-1px'}}>
                            1 甲は、乙に対し、甲のコンサルティング業務に関し、下記業務(以下「本件業務」という)を委託し、<br />
                            乙はこれを受託する。<br />
                            (1)テーマ:Web サイト制作におけるプログラミングの基礎及び応用のノウハウを提供 Web サイト<br />
                            制作におけるプログラミングの基礎及び応用のノウハウを提供 (2)サイズ/形態:オンラインにてコンサルティング対応(月4回まで)。<br />
                            2 乙の作業開始は、本契約の締結後、甲より乙へ入金がされ、乙が入金確認をした日より開始されるも のとする。<br />
                            3 期間は 6 ヶ月間とし、甲の進捗次第で最大 6 ヶ月まで延⻑とする。 また延⻑に関して、乙の判断で実施の可否とする。<br />
                            4 乙は甲の要求する成果の保証をしないものとする。
                          </Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', fontWeight:'600', marginTop:'128px'}}>第2条 ( 業務内容 )</Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', marginTop:'27px', letterSpacing:'-1px'}}>
                            1 甲は、乙に対し、甲のコンサルティング業務に関し、下記業務(以下「本件業務」という)を委託し、<br />
                            乙はこれを受託する。<br />
                            (1)テーマ:Web サイト制作におけるプログラミングの基礎及び応用のノウハウを提供 Web サイト<br />
                            制作におけるプログラミングの基礎及び応用のノウハウを提供 (2)サイズ/形態:オンラインにてコンサルティング対応(月4回まで)。<br />
                            2 乙の作業開始は、本契約の締結後、甲より乙へ入金がされ、乙が入金確認をした日より開始されるも のとする。<br />
                            3 期間は 6 ヶ月間とし、甲の進捗次第で最大 6 ヶ月まで延⻑とする。 また延⻑に関して、乙の判断で実施の可否とする。<br />
                            4 乙は甲の要求する成果の保証をしないものとする。
                          </Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', fontWeight:'600', marginTop:'128px'}}>第2条 ( 業務内容 )</Typography>
                          <Typography sx={{fontSize:'22px', color:'#001219', marginTop:'27px', marginBottom:'187px', letterSpacing:'-1px'}}>
                            1 甲は、乙に対し、甲のコンサルティング業務に関し、下記業務(以下「本件業務」という)を委託し、<br />
                            乙はこれを受託する。<br />
                            (1)テーマ:Web サイト制作におけるプログラミングの基礎及び応用のノウハウを提供 Web サイト<br />
                            制作におけるプログラミングの基礎及び応用のノウハウを提供 (2)サイズ/形態:オンラインにてコンサルティング対応(月4回まで)。<br />
                            2 乙の作業開始は、本契約の締結後、甲より乙へ入金がされ、乙が入金確認をした日より開始されるも のとする。<br />
                            3 期間は 6 ヶ月間とし、甲の進捗次第で最大 6 ヶ月まで延⻑とする。 また延⻑に関して、乙の判断で実施の可否とする。<br />
                            4 乙は甲の要求する成果の保証をしないものとする。
                          </Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <label className="text-[#001219] text-[16px] items-center cursor-pointer" style={{marginTop:'75px', marginBottom:'46px', whiteSpace:"nowrap", display:data.contracted?'none':''}}>
                            <Checkbox
                                className="checkbox"
                                inputProps={{ 'aria-label': 'checkbox' }}
                                checked={checked}
                                onChange={handleChange}
                                />         
                                契約書に同意する
                        </label>
                        <Button sx={{
                            backgroundColor:data.contracted?'#554744':btnBackground, 
                            borderRadius:'36px', 
                            width:'266px', color:'red',
                            height:'47px',
                            marginBottom:'92px', fontWeight:'bold',
                            marginTop:data.contracted?'145px':'0px',
                            "&:hover": {
                                backgroundColor: data.contracted?'#554744':btnBackgroundHover
                            },
                            }}
                            onClick={handleSubmit}>
                            <Typography sx={{color:'#ffffff', fontSize:'16px' }}>      
                                {data.contracted?'締結済み':'確認完了'}
                            </Typography>
                        </Button>  
                    </Box>
            {/** Check Dialog */}                                    
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                >
                <DialogTitle sx={{ m: 0, paddingTop: '50px', paddingLeft:'50px', fontSize: '22px', color:'#454545', fontWeight:fontBold }} id="customized-dialog-title">
                    契約の締結
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
                <DialogContent sx={{padding: '50px', marginTop:'-50px', width:'802px'}}>
                    <Typography gutterBottom sx={{fontSize:'16px', color:'#454545'}} >
                        契約書を確認しましたか？締結を行います。<br />
                        ※契約書はいつでも確認できます。
                    </Typography>
                        
                </DialogContent>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly'>
                    <Button sx={{
                        backgroundColor:'#FFFFFF', 
                        borderRadius:'14px', 
                        width:'265px', border:'2px solid #DF8391',
                        height:'60px',
                        marginBottom:'45px',
                        "&:hover": {
                            backgroundColor: '#FCF4F4'
                        },
                        }}
                        onClick={handleClose}
                        >
                        <Typography sx={{color:'#DF8391', fontSize:'16px' }}>      
                            キャンセル
                        </Typography>
                    </Button>
                    <Button sx={{
                        backgroundColor:btnBackground, 
                        borderRadius:'14px', 
                        width:'265px', color:'red',
                        height:'60px',
                        marginBottom:'45px',
                        "&:hover": {
                            backgroundColor: btnBackgroundHover
                        },
                        }}
                        onClick={handleConfirm}>
                        <Typography sx={{color:'#ffffff', fontSize:'16px' }}>      
                            確認
                        </Typography>
                    </Button>
                </Box>    
            </Dialog>
        </Stack>
                    )}
            
        </Container>
    )
}