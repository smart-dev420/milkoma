import { useEffect, useState } from "react";
import { Box, Button, CardMedia, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material"
import { fontBold, scrollTop, staticFiles } from "../../components/Constants"
import { styled } from '@mui/material/styles';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../slices/page";
import { NumberFormatExample, convertSize, getDateString, getProvideDate, headers, showSentence } from "../../utils/appHelper";
import CloseIcon from '@mui/icons-material/Close';
import { btnBackground, btnBackgroundHover } from "../../components/Constants";
import { useNavigate, useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { API } from "../../axios";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const box_shadow ='0 0 4px 5px rgba(255,255,255,0.5)';

const marks = [
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
];

const StatusSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 20,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 35,
    width: 35,
    backgroundColor: btnBackground,
    border:'3px solid #fff',
        '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: box_shadow,
      },
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 10,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height:20,
    backgroundColor:btnBackground
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#FFE3E3',
  },
  '& .MuiSlider-mark': {
    backgroundColor: btnBackground,
    height: 18,
    width: 18,
    borderRadius:30,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: btnBackground,
    },
  },
}));

const statusValues = [
    {
        title: "リクエスター待ちです",
        description: "ご依頼いただいた内容についてミルコマディレクターからメッセージが来ています。@@@内容をご確認ください",
    }, 
    { 
        title: "インフルエンサー確定・撮影中",
        description: "現在、インフルエンサーが撮影中です。@@@撮影後、動画編集を行います。",
    }, 
    {
        title: "動画編集中", 
        description: "現在、撮影された動画を編集中です。@@@編集後、検修をお願いいたします。",
    },
    {
        title: "検修をお願いします。",
        description: "「ファイル・検修管理」からファイルを確認して、@@@検修を行ってください",
    }];

const productDownloadData = [
    {
        name:'ダウンロードファイル.rtf',
        capacity:'3.5GB',
    },
    {
        name:'ダウンロードファイル.rtf',
        capacity:'3.5GB',
    },
    {
        name:'ダウンロードファイル.rtf',
        capacity:'3.5GB',
    },
    {
        name:'ダウンロードファイル.rtf',
        capacity:'3.5GB',
    },
    {
        name:'ダウンロードファイル.rtf',
        capacity:'3.5GB',
    },
];

export const DetailPage = () => {
    const dispatch = useDispatch();
    dispatch(setPage({page:2}));
    const navigate = useNavigate();
    const [ data, setData ] = useState({
        contracted: useSelector((state:any) => state.contract.contracted),
        contractCheck: useSelector((state:any) => state.contract.contractCheck),
        paid: false,
        bill: false,
        step: 1,
        isMessage: false,
        sampleMessage:'この度は、ミルコマをご利用いただきましてありがとうございます。@@@「商品紹介の案件」について、何点かお伺いしたいことがありますのでご返答いただきますと幸いです。@@@よろしくお願いします',
        noMessage: 'まだメッセージはありません。',
        productDownload: productDownloadData,
    });

    const [ uploadOpen, setUploadOpen ] = useState<boolean>(false);
    const [ uploadFileName, setUploadFileName ] = useState<string>(''); // Uploaded file name
    const [ fileName, setFileName ] = useState<string>('');             // Inserted file name
    const { cid } = useParams();
    const contractId = cid??'';
    const [ open, setOpen ] = useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<boolean>(false);
    const fileTypes = ["jpg", "png", "gif", "pdf", "doc", "docx", "avi", "mp4", "mp3", "txt", "rtf"];
    const [ file, setFile ] = useState<File | null>(null);
    const [ contractInfo, setContractInfo ] = useState<any>(null);
    const [ creatorInfo, setCreatorInfo ] = useState<any>(null);
    const [ nextStep, setNextStep ] = useState<boolean>(false);
    const [ role, setRole ] = useState<string>('');
    const [ uploadState, setUploadState ] = useState<boolean>(false);

    const getRole = async () => {
        const res = await axios.post(`${API}/api/getRole`, {}, headers());
        setRole(res.data.role);
    }

    useEffect(()=>{
        getRole()
    }, [])
    const handleContract = () => {
        // setData(prevData => ({ ...prevData, contracted: true }));
        navigate(`/mypage/contract/${contractId}`);
    }
    const handleContractCheck = () => {
        setData(prevData => ({ ...prevData, contractCheck: true }));
    }
    const handlePaid = () => {
        navigate(`/mypage/pay/${contractId}`);
        setData(prevData => ({ ...prevData, paid: true, step: 2 }));
    }
    const handleBill = () => {
        handleClickOpen();
        setData(prevData => ({ ...prevData, bill: true }));
    }

    const [ provideFiles, setProvideFiles ] = useState<any>([]);
    const [ productFiles, setProductFiles ] = useState<any>([]);

    const getProvideFileList = async () => {
        const res = await axios.post(`${API}/api/getProvideFiles/${contractId}`, {}, headers());
        setProvideFiles(res.data.data);
    }

    const getProductFileList = async () => {
        const res = await axios.post(`${API}/api/getProductFiles/${contractId}`, {}, headers());
        setProductFiles(res.data.data);
    }

    const getContractInfo = async () => {
        const res = await axios.post(`${API}/api/getContractInfo/${contractId}`, {}, headers());
        setContractInfo(res.data);
    }
    const getCreatorData = async () => {
        const res = await axios.post(`${API}/api/getCreatorData/${contractId}`, {}, headers());
        setCreatorInfo(res.data);
    }

    useEffect(() => {
        getProvideFileList();
        getProductFileList();
    }, [uploadOpen]);

    useEffect(() => {
        getContractInfo();
        getCreatorData();
        setNextStep(false);
    }, [nextStep])

    /** Bill Dialog */

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

    /** Chatting */
    const handleChatting = () => {
        navigate('/mypage/chatting');
    }

    /** File Upload */

    const handleChange = (file:any) => {
        setFile(file);
        setUploadFileName(file.name);
    };

    const handleUpload = () => {
        setUploadOpen(true);
    }
    const handleUploadClose = () => {
        setUploadOpen(false);
        setIsHovered(false);
    }

    const handleStateUp = async () => {
        let formData = new FormData();
        formData.append('currentStatus', contractInfo.status);
        await axios.post(`${API}/api/nextStep/${contractId}`, formData, headers());
        setNextStep(true);
    }

    // File Upload
    const handleFileUpload = async () => {

        let formData = new FormData();
        if(file){
            formData.append('file', file);
        }
        else {
            toast.error('ファイルが見つかりません');
            return;
        }
        const userData = localStorage.getItem('user');
        if(userData){ formData.append('userEmail', JSON.parse(userData).email); }
        else { toast.error('ユーザーデータが見つかりません!'); return;}
        formData.append('contractId', contractId);
        formData.append('filename', fileName);
        console.log('fileData - ', file);
        
        try{
            setUploadState(true);
            let query = '';
            if(role == 'client'){
                query = `${API}/api/upload_provide`;
            }
            else if(role == 'creator') { query = `${API}/api/upload_product`;}
            const res = await axios.post(query, formData, headers());
            if( res.status === 200 ){
                console.log('return', res.data);
                toast.success(res.data.msg);
                setFile(null); setFileName(''); setUploadFileName('');
                setUploadState(false);
                handleUploadClose();
            } else {
                console.log(res);
                toast.error(res.data.msg);
            }
        }catch(err){ console.error(err); }
    }

    // File Download
    const handleDownload = async (fileName:string, index: number) => {
        try {
            const token = localStorage?.getItem('token');
            const headers = {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer " + token
            };
          let response;
          if(index == 0){
              response = await axios.get(`${API}/api/provideDownload/${fileName}`, {
                responseType: 'blob',
                headers,
              });
          } else {
            response = await axios.get(`${API}/api/productDownload/${fileName}`, {
                responseType: 'blob',
                headers,
              });
          }
    
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
    };

    return (
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'68px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            { contractInfo && (
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

                <Typography flex={9} sx={{color:'#511523', fontSize:'22px', marginLeft:'23px', fontWeight:fontBold}}>案件詳細</Typography>
                <Typography flex={2} sx={{color:'#554744', fontSize:'16px', marginLeft:'23px', fontWeight:fontBold}}>{getDateString(contractInfo.createdDate)}依頼</Typography>
                </Box>
        {/** Product Data and Status Data */}                
                <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{marginTop:'28px', columnGap:'30px'}}>
                    <Box display='flex' flexDirection='column' sx={{border:'3px solid #DF8391', borderRadius:'30px', width:'471px', padding:'33px'}}>
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
                                    希望納期: {contractInfo.step3 > 0 ? contractInfo.step3 + 'ヶ月': '相談したい'}
                            </Typography>
                        </Box>
                        <Typography sx={{color:'#001219', fontSize:'12px', marginTop:'14px'}}>
                            {contractInfo.step1}
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' sx={{ width:'64%'}}>
                        <Typography sx={{marginTop:'15px', color:'#511523', fontSize:'18px', fontWeight:fontBold}}>現在状況</Typography>
                        <Typography sx={{marginTop:'40px', color:'#B9324D', fontSize:'20px', fontWeight:fontBold}}>{statusValues[contractInfo.status-1].title}
                        {
                            (contractInfo.status === 2 || contractInfo.status === 3) && 
                            `(納期 ${getProvideDate(contractInfo.createdDate, contractInfo.step3)})`
                        }
                        </Typography>
                        <StatusSlider
                            aria-label="slider"
                            defaultValue={25}
                            value = {25 * contractInfo.status}
                            marks={marks}
                            step={25}
                            min={0}
                            max={100}
                            sx={{width:'100%', marginTop:'30px', marginBottom:'45px'}}
                        />
                        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                            <Box display='flex' flexDirection='column' sx={{width:'100%', marginTop:'15px',  border:'2px dashed #857D7B', borderRadius:'15px', paddingX:'15px', paddingY:'30px'}}>
                                {showSentence(statusValues[contractInfo.status-1].description)}
                            </Box>
                            {/* <Button sx={{
                                    backgroundColor:btnBackground, 
                                    paddingX:'6%', borderRadius:'36px', 
                                    color:'#ffffff', fontSize:'17px',
                                    marginY:'7px',
                                    "&:hover": {
                                        backgroundColor: '#D48996'
                                    },
                                    }}>
                                        研修完了
                            </Button> */}
                        </Box>
                        
                    </Box>
                </Box>

        {/** Creator Data */}
                {
                creatorInfo && creatorInfo.billed && (
                    <Box display='flex' flexDirection='column' sx={{marginTop:'60px', display:data.contractCheck?'':'none'}}>
                    <Typography sx={{color:'#511523', fontSize:'22px', fontWeight:fontBold}}>参加するインフルエンサー</Typography>
                    <Box display='flex' flexDirection='row' alignItems='center' sx={{marginTop:'30px'}}>
                        <CardMedia 
                            component="img"
                            alt="Image2"
                            sx={{borderRadius:'20px', width:'63px', height:'63px', marginRight:'22px'}}
                            image = {`${API}/api/avatar/${creatorInfo._id}`}
                        />
                        <Box display='flex' flexDirection='column' flex={3}>
                            <Typography sx={{color:'#838688', fontSize:'14px'}}>{creatorInfo.email}</Typography>
                            <Typography sx={{color:'#001219', fontSize:'26px', letterSpacing:'-3px', whiteSpace:'nowrap', fontWeight:fontBold}}>{creatorInfo.username}</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row' flex={3} alignItems='center' sx={{ marginTop:'15px'}}>
                            <CardMedia 
                                component="img"
                                alt="Image2"
                                sx={{width:'28px', marginRight:'9px', aspectRatio:'1.217'}}
                                image={staticFiles.images.userPlusBrown}
                            />
                            <Typography sx={{color:'#511523', fontSize:'18px'}}>総フォロワー数 {creatorInfo.follower.length.toLocaleString()}人</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row' flex={3} alignItems='center' sx={{ marginTop:'15px'}}>
                            <CardMedia 
                                component="img"
                                alt="Image2"
                                sx={{width:'21px', marginRight:'9px'}}
                                image={staticFiles.icons.ic_heart}
                            />
                            <Typography sx={{color:'#511523', fontSize:'18px'}}>総いいね数 {NumberFormatExample(creatorInfo.heart.length)}</Typography>
                        </Box>
                        <Button sx={{
                            backgroundColor:btnBackground, 
                            width:'241px', borderRadius:'36px', 
                            color:'#ffffff', fontSize:'16px', fontWeight: fontBold, 
                            marginY:'7px',
                            "&:hover": {
                                backgroundColor: '#D48996'
                            },
                            }}>
                                詳細へ
                        </Button>
                    </Box>
                    </Box>
                )}                            
               
        {/** Contract */}                            
                <Typography sx={{fontSize:'22px', color:'#511523', marginTop:'60px', marginBottom:'32px', fontWeight:fontBold}}>金額・契約書管理</Typography>
                <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{columnGap:'30px'}}>
                    <Box display='flex' flexDirection='column' sx={{
                        backgroundColor:contractInfo.confirm?'#FFFFFF':'#F9E6CE',
                        borderRadius:'33px', 
                        width:'468px', 
                        paddingY:'35px', 
                        paddingX:'32px',
                        boxShadow:'0 0 20px 0px #0000001f'
                        }}>
                        <Typography sx={{fontSize:'18px', color:'#001219', marginBottom:'16px', fontWeight:fontBold}}>契約書</Typography>
                        <Typography sx={{fontSize:'12px', color:'#001219', marginBottom:'9px', fontWeight:fontBold}}>依頼を行う前に必ずお読みいただき、契約書を締結してください</Typography>
                        <Typography sx={{fontSize:'10px', color:'#E4443B', marginBottom:'11px', fontWeight:fontBold}}>
                            {data.contractCheck?'依頼内容を確認中です。':contractInfo.confirm?'締結済みです':'締結を行わないと制作が進行しません'}
                        </Typography>
                        <Box display='flex' flexDirection='column' alignItems='center'>
                            <Button 
                            sx={{
                                backgroundColor:data.contractCheck?'#B9B2B1':contractInfo.confirm?'#E38A86':'#EE7A4B', 
                                width:'183px', borderRadius:'36px', fontWeight:fontBold,
                                color:'#ffffff', fontSize:'10px',
                                "&:hover": {
                                    backgroundColor: data.contractCheck?'#B9B2B1':contractInfo.confirm?btnBackgroundHover:'#D58463'
                                },
                                }}
                                onClick={contractInfo.confirm?handleContractCheck:handleContract}
                                >
                                    {data.contractCheck?"確認する":contractInfo.confirm?"締結済み・確認する":"確認する"}
                            </Button>
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='column' sx={{border:'3px solid #AB3D4F', borderRadius:'30px', paddingX:'33px', paddingY:'37px', width:'64%'}}>
                        <Typography sx={{fontSize:'18px', color:'#B9324D', marginBottom:'30px', fontWeight:fontBold}}>金額・お支払い</Typography>
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
                            <Box display='flex' flexDirection='column' flex={4} alignItems='center'>
                                <Button sx={{
                                    backgroundColor: data.bill?'#B9B2B1':data.paid?'#ffffff':btnBackground, 
                                    paddingX:'20%', borderRadius:'36px', 
                                    color: data.bill?'#FFFFFF':data.paid?btnBackground:'#ffffff', fontSize:'15px',
                                    marginY:'7px', fontWeight:fontBold,
                                    border:data.bill?'':data.paid?'2px solid #DF8391':'',
                                    "&:hover": {
                                        backgroundColor: data.bill?'#B9B2B1': '#D48996',
                                        color:data.bill?'#FFFFFF':data.paid?'#FFFFFF':'#FFF'
                                    },
                                    }}
                                    onClick={data.paid?handleBill:handlePaid}
                                    >
                                        {data.bill?'CALCULATING':data.paid?'領収書発行':'お支払い'}
                                </Button>
                                <Typography sx={{fontSize:'10px', color:'#001219'}}>{data.bill?'料金確定までお待ちください':data.paid?'お支払い済みです':'支払い期限:' + getProvideDate(contractInfo.createdDate, 1)}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

        {/** Live Chatting */}
                <Box display='flex' flexDirection='row' sx={{marginTop:'60px'}} alignItems='center'>
                    <Typography flex={1} sx={{fontSize:'22px', color:'#511523', letterSpacing:'-7px', fontWeight:fontBold}}>チャット</Typography>
                    <Typography flex={10} sx={{fontSize:'12px', color:'#B9324D', marginLeft:'50px'}}>ディレクターからお知らせがあります</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' flexDirection='row' sx={{marginTop:'33px'}}>
                    <CardMedia
                        component="img"
                        alt="Image2"
                        sx={{borderRadius:'20px', width:'63px', height:'63px', marginRight:'10px', display:data.isMessage?'':'none'}}
                        image={staticFiles.images.userProfile}
                        />
                        
                    <Box display='flex' flexDirection='column' sx={{color:'#454545', fontSize:'16px', paddingX:'27px', paddingY:'20px', backgroundColor:'#FDECEE', borderRadius:'14px 14px 14px 0px', marginRight:'70px'}}>
                        {data.isMessage?showSentence(data.sampleMessage):data.noMessage}
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='end' sx={{}}>
                        <Button sx={{
                            backgroundColor:btnBackground, 
                            width:'241px', borderRadius:'36px', 
                            color:'#ffffff', fontSize:'16px', fontWeight:fontBold,
                            "&:hover": {
                                backgroundColor: '#D48996'
                            },
                            }}
                            onClick={handleChatting}>
                                チャットへ
                        </Button>
                    </Box>
                </Box>

        {/** File Upload and Download  */}
                
                {contractInfo.billed && (<>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{marginTop:'60px'}}>
                    <Typography sx={{color:'#511523', fontSize:'22px', fontWeight:fontBold}}>ファイル・検修管理</Typography>
                    { contractInfo.status < 4 && (
                        <Button sx={{
                        backgroundColor:btnBackground, 
                        width:'241px', borderRadius:'36px', 
                        color:'#ffffff', fontSize:'16px', fontWeight:fontBold,
                        "&:hover": {
                            backgroundColor: '#D48996'
                        },
                        }}
                        onClick={handleStateUp}>
                            {contractInfo.status === 3?'完了':'次の一歩'}
                    </Button>
                    )}
                    
                    </Box>
                    <Box display='flex' flexDirection='row' sx={{marginTop:'33px', columnGap:'50px'}}>
                    <Box display='flex' flexDirection='column' flex={6} >
                        <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{ minHeight:'27px'}}>
                            <Typography sx={{fontSize:'18px', color:'#B9324D', whiteSpace:'nowrap', fontWeight:fontBold}}>あなたから</Typography>
                            <Button sx={{
                                backgroundColor:btnBackground, 
                                paddingX:'32px', borderRadius:'36px', 
                                color:'#ffffff', fontSize:'11px', fontWeight:fontBold,
                                "&:hover": {
                                    backgroundColor: btnBackgroundHover
                                },
                                }}
                                onClick={handleUpload}
                                >アップロードする
                            </Button>
                        </Box>
                        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{border:'2px dashed #AA3D4F', borderRadius:'15px', width:'100%', marginTop:'16px', paddingY:'22px', paddingX:'27px', rowGap:'10px'}}>
                            {!provideFiles?
                                (<Typography sx={{fontSize:'14px', color:'#001219', textAlign:'center', whiteSpace:'nowrap',paddingY:'126px'}}>まだファイル共有はされていません</Typography>)
                                :(
                                    provideFiles && provideFiles.map((item:any, index:number) => (
                                        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width:'100%', border:'1px solid #AA3D4F', borderRadius:'10px', paddingY:'12px', paddingX:'7px'}} key={index}>
                                            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' 
                                                sx={{ backgroundColor:'#F0F0F0', borderRadius:'50%', width:'46px', height:'46px'}}>
                                                <CardMedia
                                                    component='img'
                                                    image={staticFiles.images.file}
                                                    sx={{width:'19px', height:'24px'}}
                                                />
                                            </Box>
                                            <Box display='flex' flexDirection='column' flex={6} sx={{marginX:'7px'}}>
                                                <Typography sx={{color:'#424242', fontSize:'11px', fontWeight:fontBold}}>{item.title}</Typography>
                                                <Typography sx={{color:'#424242', fontSize:'10px'}}>{convertSize(item.fileSize)}</Typography>
                                            </Box>
                                            <Button sx={{
                                                backgroundColor:'#AA3D4F', 
                                                borderRadius:'27px', 
                                                width:'142px', color:'red',
                                                "&:hover": {
                                                    backgroundColor: '#E38A86'
                                                },
                                                }}
                                            onClick={()=>handleDownload( item.fileName + '.' + item.fileExtension, 0 )}>
                                                <CardMedia
                                                    component="img"
                                                    alt="Image1"
                                                    height="25"
                                                    sx={{borderRadius:'20px', width:'19px', marginRight:'10px'}}
                                                    image={staticFiles.images.download} />
                                                <Typography sx={{color:'#ffffff', fontSize:'9px', fontWeight:fontBold }}>      
                                                    ダウンロード
                                                </Typography>
                                            </Button>
                                        </Box>
                                    ))
                                )}
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='column' flex={6} >
                        <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{ minHeight:'35px'}}>
                            <Typography sx={{fontSize:'16px', color:'#B9324D', fontWeight:fontBold}}>ミルコマから</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{border:'2px dashed #AA3D4F', borderRadius:'15px', width:'100%', marginTop:'16px', paddingY:'22px', paddingX:'27px', rowGap:'10px'}}>
                        {!productFiles?
                                (<Typography sx={{fontSize:'14px', color:'#001219', textAlign:'center', whiteSpace:'nowrap',paddingY:'126px'}}>まだファイル共有はされていません</Typography>)
                                :(
                                    productFiles && productFiles.map((item: any, index:number) => (
                                        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width:'100%', border:'1px solid #EE7D90', borderRadius:'10px', paddingY:'12px', paddingX:'7px'}} key={index}>
                                            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' 
                                                sx={{ backgroundColor:'#F0F0F0', borderRadius:'50%', width:'46px', height:'46px'}}>
                                                <CardMedia
                                                    component='img'
                                                    image={staticFiles.images.productFile}
                                                    sx={{width:'19px', height:'24px'}}
                                                />
                                            </Box>
                                            <Box display='flex' flexDirection='column' flex={6} sx={{marginX:'7px'}}>
                                                <Typography sx={{color:'#424242', fontSize:'11px', fontWeight:fontBold}}>{item.title}</Typography>
                                                <Typography sx={{color:'#424242', fontSize:'10px'}}>{convertSize(item.fileSize)}</Typography>
                                            </Box>
                                            <Button sx={{
                                                backgroundColor:btnBackground, 
                                                borderRadius:'27px', 
                                                width:'142px', color:'red',
                                                "&:hover": {
                                                    backgroundColor: btnBackgroundHover
                                                },
                                                }}
                                            onClick={()=>handleDownload( item.fileName + '.' + item.fileExtension, 1 )}>
                                                <CardMedia
                                                    component="img"
                                                    alt="Image1"
                                                    height="25"
                                                    sx={{borderRadius:'20px', width:'19px', marginRight:'10px'}}
                                                    image={staticFiles.images.download} />
                                                <Typography sx={{color:'#ffffff', fontSize:'10px', fontWeight:fontBold }}>      
                                                    ダウンロード
                                                </Typography>
                                            </Button>
                                        </Box>
                                    ))
                                )}
                        </Box>
                    </Box>
                    </Box>
                </>
                )}
                
        {/** Bill Download Dialog */}                                    
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            >
            <DialogTitle sx={{ m: 0, paddingTop: '50px', paddingLeft:'50px', fontSize: '22px', color:'#454545', fontWeight:fontBold }} id="customized-dialog-title">
                領収書発行
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
                    領収書は以下からダウンロードできます。
                </Typography>
                <Typography sx={{marginTop:'61px', marginLeft:'30px', color:'#454545', fontSize:'18px', fontWeight:fontBold}}>ファイルダウンロード</Typography>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width:'90%', marginY:'20px', border:'1px solid #EE7D90', borderRadius:'10px', paddingY:'12px', paddingX:'7px', marginLeft:'30px'}}>
                        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' 
                            sx={{ backgroundColor:'#F0F0F0', borderRadius:'50%', width:'46px', height:'46px'}}>
                            <CardMedia
                                component='img'
                                image={staticFiles.images.productFile}
                                sx={{width:'19px', height:'24px'}}
                            />
                        </Box>
                        <Box display='flex' flexDirection='column' flex={6} sx={{marginX:'7px'}}>
                            <Typography sx={{color:'#424242', fontSize:'12px', fontWeight:fontBold}}>領収書</Typography>
                        </Box>
                        <Button sx={{
                            backgroundColor:btnBackground, 
                            borderRadius:'27px', 
                            width:'142px', color:'red',
                            "&:hover": {
                                backgroundColor: btnBackgroundHover
                            },
                            }}>
                            <CardMedia
                                component="img"
                                alt="Image1"
                                height="25"
                                sx={{borderRadius:'20px', width:'19px', marginRight:'10px'}}
                                image={staticFiles.images.download} />
                            <Typography sx={{color:'#ffffff', fontSize:'10px', fontWeight:fontBold }}>      
                                ダウンロード
                            </Typography>
                        </Button>
                    </Box>
            </DialogContent>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button sx={{
                    backgroundColor:btnBackground, 
                    borderRadius:'14px', 
                    width:'446px', color:'red',
                    height:'60px',
                    marginBottom:'15px',
                    "&:hover": {
                        backgroundColor: btnBackgroundHover
                    },
                    }}
                    onClick={handleClose}
                    >
                    <Typography sx={{color:'#ffffff', fontSize:'16px' }}>      
                        完了
                    </Typography>
                </Button>
            </Box>    
        </Dialog>

        {/** File Upload Dialog */}
        <Dialog
            onClose={handleUploadClose}
            aria-labelledby="customized-dialog-title"
            open={uploadOpen}
            >
            <DialogTitle sx={{ m: 0, paddingTop: '50px', paddingLeft:'50px', fontSize: '22px', color:'#454545', fontWeight:fontBold }} id="customized-dialog-title">
                ファイルアップロード
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleUploadClose}
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
                    送信画像の設定をして「完了」ボタンを押してください。
                </Typography>
                <Typography sx={{marginTop:'30px', color:'#454545', fontSize:'18px', fontWeight:fontBold}}>ファイル選択</Typography>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} hoverTitle=' '>
                    <Box
                        display='flex' flexDirection='column'
                        sx={{
                            paddingX:'200px',
                            paddingY:'60px',
                            border:'1px dashed #DF8391',
                            borderRadius:'8px',
                            marginTop:'20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize:'10px',
                            fontWeight:fontBold,
                            backgroundColor:'#FFFEFC',
                        }}
                    >
                        <CardMedia
                            component='img'
                            image={staticFiles.images.folder}
                            className="image-hover"
                            sx={{width:'54px', height:'44px', cursor:'pointer'}}
                        />
                        <Typography>クリックまたは</Typography>
                        <Typography>ドラックしてアップロード</Typography>
                    </Box>
                </FileUploader>
               
                <Typography sx={{marginTop:'30px', color:'#454545', fontSize:'18px', fontWeight:fontBold}}>アップロード状況</Typography>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width:'100%', marginY:'20px', border:'1px solid #AA3D4F', borderRadius:'10px', paddingY:'12px', paddingX:'7px'}}>
                        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' 
                            sx={{ backgroundColor:'#F0F0F0', borderRadius:'50%', width:'46px', height:'46px'}}>
                            <CardMedia
                                component='img'
                                image={staticFiles.images.file}
                                sx={{width:'19px', height:'24px'}}
                            />
                        </Box>
                        <Box display='flex' flexDirection='column' flex={6} sx={{marginX:'7px'}}>
                            <Typography sx={{color:'#424242', fontSize:'11px', fontWeight:fontBold}}>{fileName?fileName:uploadFileName}</Typography>
                        </Box>
                        {uploadState && (
                            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                            <Typography sx={{fontSize:'15px', fontWeight:fontBold}}>アップロード中…</Typography>
                            {/* <CircularProgress style={{height:'50px', width:'50px'}}/> */}
                            </Box>
                        )}
                    </Box>

                <Typography sx={{marginTop:'27px', color:'#454545', fontSize:'18px', fontWeight:fontBold}}>ファイル名を設定(オプション)</Typography>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width:'100%', marginY:'20px', border:'1px solid #D6929D', borderRadius:'10px', paddingX:'7px'}}>
                        <TextField
                            placeholder="ファイル名"
                            className="w-full text-[20px] rounded-[15px] "
                            style={{}}
                            value={fileName}
                            onChange={(e)=>{setFileName(e.target.value)}}
                        />
                    </Box>
                    <Typography sx={{fontSize:'14px', color:'#858997', }}>ファイル名を別に設定することができます。</Typography>
            </DialogContent>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button sx={{
                    backgroundColor:btnBackground, 
                    borderRadius:'14px', 
                    width:'446px', color:'red',
                    height:'60px',
                    marginBottom:'50px',
                    "&:hover": {
                        backgroundColor: btnBackgroundHover
                    },
                    }}
                    onClick={handleFileUpload}>
                    <Typography sx={{color:'#ffffff', fontSize:'16px' }}>      
                        完了
                    </Typography>
                </Button>
            </Box>    
        </Dialog>

            </Stack>
            )}
        </Container>
    )
}
