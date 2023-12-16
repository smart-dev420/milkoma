import { Box, Button, Card, CardMedia, Container, Divider, Grid, Icon, Stack, Typography } from "@mui/material"
import { cardColor0, cardColor1, cardHoverColor0, cardHoverColor1, cardSidebar0, cardSidebar1, fontBold, scrollTop, staticFiles } from "../../components/Constants"
import { SpaceY } from "../../components/SpaceY"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Slider from '@mui/material/Slider';
import { useDispatch } from "react-redux";
import { setPage } from "../../slices/page";
import { btnBackground, btnBackgroundHover } from "../../components/Constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../axios";
import { getDateString, headers } from "../../utils/appHelper";

export const HomePage = () => {
    let statusList: { name: string, counter: number }[] = [];
    const alarmList = [
        {
            title: 'ミルコマサービスメンテナンスのお知らせ',
            date: '2023年1月1日',
        },
        {
            title: 'ミルコマサービスメンテナンスのお知らせ',
            date: '2023年1月1日',
        },
        {
            title: 'ミルコマサービスメンテナンスのお知らせ',
            date: '2023年1月1日',
        },
        {
            title: 'ミルコマサービスメンテナンスのお知らせ',
            date: '2023年1月1日',
        },
    ];
    // scrollTop();
    const dispatch = useDispatch();
    dispatch(setPage({page:1}));
    const [ verify, setVerify ] = useState(false);
    const [ moreView1, setMoreView1 ] = useState(4);
    const [ moreView2, setMoreView2 ] = useState(4);
    const [ contract, setContract ] = useState<any>([]);
    const [ stateList, setStateList ] = useState<any>([]);
    const user_data = localStorage?.getItem('user');
    const user = user_data ? JSON.parse(user_data) : null;

    const getData = async () => {
        try{
            const res = await axios.post(`${API}/api/getAllContract/${user.email}`, {}, {headers});
            const contractData = res.data;
            setContract(res.data);
            console.log('contract data', contractData);
            const verifyData = await axios.post(`${API}/auth/verify/${user.email}`, {}, {headers});
            setVerify(verifyData.data);
            const requestContract = contractData.filter((item:any) => item.status === 0 ).length;
            const acceptContract = contractData.filter((item:any) => item.status === 1).length;
            const progressContract = contractData.filter((item:any) => item.status === 2).length;
            const developContract = contractData.filter((item:any) => item.status === 3).length;
            const endContract = contractData.filter((item:any) => item.status === 4).length;
            statusList = [];
            statusList.push({name:"依頼中", counter: acceptContract});
            statusList.push({name:"相談中", counter: progressContract});
            statusList.push({name:"製作中", counter: developContract});
            statusList.push({name:"完了", counter: endContract});
            setStateList(statusList);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getData();
    }, []);

    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            
        {/** Card Sample */}
            <Stack direction="column" spacing={2} sx={{paddingLeft:'50px'}}>
                <Typography className="pt-[25px] text-[#511523]" sx={{ fontSize:'22px', fontWeight:fontBold }}>
                    初めてのあなたに
                </Typography>
                <SpaceY />
                <Box display="flex" flexDirection="row" flexWrap='wrap' sx={{ columnGap:'34px', rowGap:'20px' }}>
                    <CardMedia
                        component="img"
                        alt="Image1"
                        sx={{ borderRadius:'20px', width:'420px' }}
                        className="select-card"
                        image={staticFiles.images.card1} />
                    <CardMedia
                        component="img"
                        alt="Image2"
                        sx={{ borderRadius:'20px', width:'420px' }}
                        className="select-card"
                        image={staticFiles.images.card2} />
                    <CardMedia
                        component="img"
                        alt="Image3"
                        sx={{ borderRadius:'20px', width:'420px' }}
                        className="select-card"
                        image={staticFiles.images.card3} />
                </Box>
            </Stack>

        {/** User Data - Contract and Verification Data */}
            <Box display="flex" flexDirection="row" sx={{marginTop:'90px', paddingX:'50px'}}>
                <Box display="flex" flexDirection="column" sx={{borderRadius:'30px', border:"3px solid #DF8391", padding:'30px'}}>
                    <Typography sx={{color:'#B9324D', fontSize:'22px', marginBottom:'30px', fontWeight:fontBold}}>アカウントステータス</Typography>
                    <Typography sx={{color:'#554744', fontSize:'18px', marginBottom:'20px', fontWeight:fontBold}}>ログインアカウント</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <CardMedia 
                            component="img"
                            alt="Image2"
                            height="67"
                            image={staticFiles.images.circle}
                            sx={{width:'67px', marginRight:'20px'}}
                        />
                        <CardMedia 
                            component="img" 
                            image={staticFiles.images.footer} 
                            sx={{width: '33px', position:'absolute', zIndex:'1', marginLeft:'34px', marginTop:'38px', display:verify?'':'none'}} />
                        <Typography sx={{color:'#511523', fontSize:'24px', fontWeight:fontBold}}>NeoPen株式会社</Typography>
                    </Box>
                    <SpaceY />
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography sx={{backgroundColor:verify?'#EE7D90':'#FFFFFF',borderRadius:'20px', color:verify?'#FFFFFF':'#E4443B', fontSize:'12px', paddingX:'20px', paddingY:'2px', border:'1px solid #D35144'}}>{verify?'公式リクエスター':'アカウント未認証'}</Typography>
                        <Typography sx={{color:'#554744', fontSize:'12px', marginLeft:'20px'}}>{verify?'このアカウントは認証済みです':'アカウント認証を行ってください'}</Typography>
                    </Box>
                    <SpaceY />
                    <Typography sx={{color:'#554744', fontSize:'18px', fontWeight:fontBold}}>依頼の状況</Typography>
                    <SpaceY />
                    <Box display="flex" flexDirection="row" sx={{whiteSpace:'nowrap'}}>
                    { stateList && stateList.map((item: any, index:number) => (
                        <Box display="flex" flexDirection="column" sx={{marginRight:'50px'}} key={index}>
                            <Typography sx={{color:'#511523', fontSize:'18px', fontWeight:fontBold}}>{item.name}</Typography>
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography sx={{color:'#511523', fontSize:'35px', fontWeight:fontBold}}>{item.counter}</Typography>
                                <Typography sx={{color:'#511523', fontSize:'24px', fontWeight:fontBold}}>件</Typography>
                            </Box>
                        </Box>
                    ))}
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" sx={{marginLeft:'60px', width:'100%'}}>
                    <Typography sx={{color:'#511523', fontSize:'22px', marginBottom:'35px', fontWeight:fontBold}}>お知らせ</Typography>
                    {alarmList.map((item, index) => (
                        <div key={index}>
                            <Box display="flex" flexDirection="row" alignItems="center" 
                            sx={{paddingX:'20px', paddingY:'15px', borderRadius:'10px', 
                            boxShadow:'0px 3px 10px 6px #d78e8927', cursor:'pointer', "&:hover": {
                                backgroundColor: '#E0DED9'
                            },}}>
                                <FiberManualRecordIcon sx={{color:'#511523', width:'10px'}} />
                                <Box display="flex" flexDirection="column" sx={{marginLeft:'15px'}}>
                                    <Typography sx={{color:'#511523', fontSize:'18px'}}>{item.title}</Typography>
                                    <Typography sx={{color:'#554744', fontSize:'11px'}}>{item.date}</Typography>
                                </Box>
                            </Box>
                            <SpaceY />
                        </div>
                    ))}
                </Box>
            </Box>

        {/** Contract list */}
            <Box display="flex" flexDirection="row" sx={{ marginTop:'110px'}}>
        {/** Started Contract */}
                <Box display="flex" flexDirection="column" flex="1">
                    <Typography sx={{color:'#511523', fontSize:'22px', paddingX:'50px', marginBottom:'70px', fontWeight:fontBold}}>制作中の案件一覧</Typography>
                    <CreateGrid data = { contract } count={moreView1} />
                    <Box display = "flex" alignItems="center" justifyContent='center' sx={{width:'100%'}}>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" 
                            sx={{
                                backgroundColor:btnBackground, 
                                width:'72px', 
                                minHeight:'72px', 
                                borderRadius:'50%', 
                                cursor:'pointer', 
                                marginTop:'50px',
                                boxShadow:'0px 0px 20px 5px #ee7d902c',
                                "&:hover": {
                                    backgroundColor: btnBackgroundHover
                                },
                            }}
                            onClick={() => {
                                setMoreView1(moreView1 + 4);
                            }}
                            >
                            <img src={staticFiles.images.more} width={10} className="py-[2px]"/>
                            <p className="text-[9px] py-[2px] text-[#FFFFFF] font-bold" style={{fontWeight:fontBold}}>もっと見る</p>
                        </Box>
                    </Box>
                </Box>
        {/** Waiting Contract */}
                <Box display="flex" flexDirection="column" flex="1" >
                    <Typography sx={{color:'#511523', fontSize:'22px', paddingX:'50px', marginBottom:'70px', fontWeight:fontBold}}>今依頼中の案件一覧</Typography>
                    <CancelGrid count={moreView2} data={ contract }/>
                    <Box display = "flex" alignItems="center" justifyContent='center' sx={{width:'100%'}}>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" 
                            sx={{
                                backgroundColor:btnBackground, 
                                width:'72px', 
                                minHeight:'72px', 
                                borderRadius:'50%', 
                                cursor:'pointer', 
                                marginTop:'50px',
                                boxShadow:'0px 0px 20px 5px #ee7d902c',
                                "&:hover": {
                                    backgroundColor: btnBackgroundHover
                                },
                            }}
                            onClick={() => {
                                setMoreView2(moreView2 + 4);
                            }}
                            >
                            <img src={staticFiles.images.more} width={10} className="py-[2px]"/>
                            <p className="text-[9px] py-[2px] text-[#FFFFFF] font-bold" style={{fontWeight:fontBold}}>もっと見る</p>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Container>
    )
}

const CreateGrid:React.FC<{count:number, data:any}> = ({ count, data }) => {
    const navigate = useNavigate();
    const filteredItems = data.filter((item: any) => item.status > 0);

    return(
    <Grid container spacing={1} className='items-center' style={{marginLeft:'30px'}}>
        {
            filteredItems.map((item:any, index:number) => (
               index < count && (
                <Grid item xs="auto" > 
            <Box 
                sx={{
                    backgroundColor:statusColor[item.status - 1].color,
                    width:'314px', marginX:'15px',
                    marginY:'5px', height:'310px', 
                    borderRadius:'50px',
                    paddingTop:'27px', paddingBottom:'16px', 
                    cursor:'pointer',
                    boxShadow:'0px 0px 10px 3px #00000018',
                    "&:hover": {
                        backgroundColor: statusColor[item.status - 1].hoverColor,
                      },}}
                onClick={() => { navigate(`/mypage/detail/${item._id}`)} }
                key={ index }
                >
                <Box display="flex" flexDirection="column">
                <Typography sx={{color:'#554744', fontSize:'10px', marginBottom:'20px', paddingX:'30px', fontWeight:fontBold}}>{getDateString(item.createdDate.toString())} 依頼</Typography>
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'18px', marginBottom:'8px', paddingX:'30px', fontWeight:fontBold}}>{item.category}の案件</Typography>
                <Typography sx={{color:'#85766D', fontSize:'11px', paddingX:'30px', fontWeight:fontBold}}>内容</Typography>
                <Typography sx={{fontSize:'12px', paddingX:'30px', height:'60px', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {item.description}
                </Typography>
                <Slider
                    aria-label="Always visible"
                    defaultValue={ 25 * item.status }
                    step={25}
                    marks
                    min={0}
                    max={100}
                    sx={{color:statusColor[item.status - 1].sidebarColor, marginTop:'10px', width:'80%', marginLeft:'30px',}}
                />
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'10px', marginTop:'10px', paddingX:'30px', fontWeight:fontBold}}>{statusColor[item.status - 1].state}</Typography>
                <Box sx={{height:'2px', backgroundColor:'#fff', width:'100%', marginTop:'13px'}}></Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" sx={{marginTop:'10px', paddingX:'30px', }}>
                    <Typography sx={{fontSize:'10px', color:statusColor[item.status - 1].sidebarColor, paddingY:'7px', width:'56px', backgroundColor:'#fff', textAlign:'center', borderRadius:'60px', fontWeight:fontBold}}>状況</Typography>
                    <Typography sx={{fontSize:'11px', marginLeft:'10px', color:statusColor[item.status - 1].textColor, fontWeight:fontBold}}>{statusColor[item.status - 1].title}</Typography>
                </Box>                
               </Box>
            </Grid>
               )
            ))
        }
    </Grid>
    );
}

const CancelGrid:React.FC<{count:number, data: any}> = ({ count, data }) => {
    const filteredItems = data.filter((item: any) => item.status < 1);
    return(
        <Grid container spacing={1} className='items-center' style={{marginLeft:'30px'}}>
        {
        filteredItems.map((item: any, index: number) => (
            index < count && (
                <Grid item xs="auto" > 
                <Box 
                    sx={{backgroundColor:'#fff',
                        width:'314px', marginX:'15px',
                        marginY:'5px', height:'310px', 
                        borderRadius:'50px', 
                        paddingTop:'27px', paddingBottom:'16px', 
                        cursor:'pointer',
                        boxShadow:'0px 0px 10px 3px #00000018',
                        "&:hover": {
                            backgroundColor: '#FFF5F5'
                          },}}>
                    <Box display="flex" flexDirection="column">
                    <Typography sx={{color:'#554744', fontSize:'10px', marginBottom:'20px', paddingX:'30px', fontWeight:fontBold}}>{getDateString(item.createdDate.toString())}</Typography>
                    <Typography sx={{textAlign:'center', color:'#001219', fontSize:'18px', marginBottom:'8px', paddingX:'30px', fontWeight:fontBold}}>{item.category}の案件</Typography>
                    <Typography sx={{color:'#85766D', fontSize:'11px', paddingX:'30px', fontWeight:fontBold}}>内容</Typography>
                    <Typography sx={{fontSize:'12px', paddingX:'30px', height:'120px', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {item.description}
                    </Typography>
                    <Box sx={{height:'2px', backgroundColor:'#FBF4ED', width:'100%', marginTop:'13px'}}></Box>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" sx={{marginTop:'10px', paddingX:'30px'}}>
                        <Typography sx={{fontSize:'10px', color:'#fff', paddingY:'7px', width:'56px', backgroundColor:btnBackgroundHover, textAlign:'center', borderRadius:'60px', fontWeight:fontBold}}>状況</Typography>
                        <Typography sx={{fontSize:'11px', marginLeft:'10px', fontWeight:fontBold}}>{item.status == 0 ?'内容を確認しています':item.cancel}</Typography>
                    </Box>                
                   </Box>
                </Grid>
            )
        ))
        }
    </Grid>
    );
}

export const statusColor = [
    {
        state: '相談中',
        title: 'リクエスター待ちです',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 25,
    },
    {
        state: '撮影中',
        title: '撮影中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 50,
    },
    {
        state: '編集中',
        title: '編集中です',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 75,
    },
    {
        state: '完了・リクエスター確認',
        title: 'リクエスター待ちです',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 100,
    },
]