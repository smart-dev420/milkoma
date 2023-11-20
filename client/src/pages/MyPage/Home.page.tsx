import { Box, Button, Card, CardMedia, Container, Divider, Grid, Icon, Stack, Typography } from "@mui/material"
import { fontBold, staticFiles } from "../../components/Constants"
import { SpaceY } from "../../components/SpaceY"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Slider from '@mui/material/Slider';
import { useDispatch } from "react-redux";
import { setPage } from "../../slices/page";
import { btnBackground, btnBackgroundHover } from "../../components/Constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const statusList = [
        {
            name:"依頼中",
            counter:23,
        },
        {
            name:"相談中",
            counter:3,
        },
        {
            name:"製作中",
            counter:10,
        },
        {
            name:"完了",
            counter:12,
        },
    ];
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
    const dispatch = useDispatch();
    dispatch(setPage({page:1}));
    const [ verify, setVerify ] = useState(false);
    const [ moreView1, setMoreView1 ] = useState(4);
    const [ moreView2, setMoreView2 ] = useState(4);

    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" spacing={2} sx={{paddingX:'50px'}}>
                <Typography className="pt-[25px] text-[#511523]" sx={{fontSize:'25px', fontWeight:fontBold}}>
                    初めてのあなたに
                </Typography>
                <SpaceY />
                <Box display="flex" flexDirection="row" sx={{columnGap:'34px'}}>
                    <CardMedia
                        component="img"
                        alt="Image1"
                        height="280"
                        sx={{borderRadius:'20px'}}
                        className="select-card"
                        image={staticFiles.images.card1} />
                    <CardMedia
                        component="img"
                        alt="Image2"
                        height="280"
                        sx={{borderRadius:'20px'}}
                        className="select-card"
                        image={staticFiles.images.card2} />
                    <CardMedia
                        component="img"
                        alt="Image3"
                        height="280"
                        sx={{borderRadius:'20px'}}
                        className="select-card"
                        image={staticFiles.images.card3} />
                </Box>
            </Stack>
            <Box display="flex" flexDirection="row" sx={{marginTop:'90px', paddingX:'50px'}}>
                <Box display="flex" flexDirection="column" sx={{borderRadius:'30px', border:"3px solid #DF8391", padding:'30px'}}>
                    <Typography sx={{color:'#B9324D', fontSize:'25px', marginBottom:'30px', fontWeight:fontBold}}>アカウントステータス</Typography>
                    <Typography sx={{color:'#554744', fontSize:'20px', marginBottom:'20px', fontWeight:fontBold}}>ログインアカウント</Typography>
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
                            sx={{width: '33px', position:'absolute', zIndex:'10', marginLeft:'34px', marginTop:'38px', display:verify?'':'none'}} />
                        <Typography sx={{color:'#511523', fontSize:'26px', fontWeight:fontBold}}>NeoPen株式会社</Typography>
                    </Box>
                    <SpaceY />
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography sx={{backgroundColor:verify?'#EE7D90':'#FFFFFF',borderRadius:'20px', color:verify?'#FFFFFF':'#E4443B', fontSize:'14px', paddingX:'20px', paddingY:'2px', border:'1px solid #D35144'}}>{verify?'公式リクエスター':'アカウント未認証'}</Typography>
                        <Typography sx={{color:'#554744', fontSize:'14px', marginLeft:'20px'}}>{verify?'このアカウントは認証済みです':'アカウント認証を行ってください'}</Typography>
                    </Box>
                    <SpaceY />
                    <Typography sx={{color:'#554744', fontSize:'20px', fontWeight:fontBold}}>依頼の状況</Typography>
                    <SpaceY />
                    <Box display="flex" flexDirection="row" sx={{whiteSpace:'nowrap'}}>
                    {statusList.map((item, index) => (
                        <Box display="flex" flexDirection="column" sx={{marginRight:'50px'}}>
                            <Typography sx={{color:'#511523', fontSize:'20px', fontWeight:fontBold}}>{item.name}</Typography>
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography sx={{color:'#511523', fontSize:'38px', fontWeight:fontBold}}>{item.counter}</Typography>
                                <Typography sx={{color:'#511523', fontSize:'26px', fontWeight:fontBold}}>件</Typography>
                            </Box>
                        </Box>
                    ))}
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" sx={{marginLeft:'60px', width:'100%'}}>
                    <Typography sx={{color:'#511523', fontSize:'25px', marginBottom:'35px', fontWeight:fontBold}}>お知らせ</Typography>
                    {alarmList.map((item, index) => (
                        <>
                        <Box display="flex" flexDirection="row" alignItems="center" 
                        sx={{paddingX:'20px', paddingY:'15px', borderRadius:'10px', 
                        boxShadow:'0px 3px 10px 6px #d78e8927', cursor:'pointer', "&:hover": {
                            backgroundColor: '#E0DED9'
                        },}}>
                        <FiberManualRecordIcon sx={{color:'#511523', width:'10px'}} />
                        <Box display="flex" flexDirection="column" sx={{marginLeft:'15px'}}>
                            <Typography sx={{color:'#511523', fontSize:'20px'}}>{item.title}</Typography>
                            <Typography sx={{color:'#554744', fontSize:'13px'}}>{item.date}</Typography>
                        </Box>
                        </Box>
                    <SpaceY />
                    </>
                    ))}
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" sx={{ marginTop:'110px'}}>
                <Box display="flex" flexDirection="column" flex="1">
                    <Typography sx={{color:'#511523', fontSize:'25px', paddingX:'50px', marginBottom:'70px', fontWeight:fontBold}}>制作中の案件一覧</Typography>
                    <CreateGrid count={moreView1} />
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
                            <p className="text-[10px] py-[2px] text-[#FFFFFF] font-bold" style={{fontWeight:fontBold}}>もっと見る</p>
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" flex="1" >
                    <Typography sx={{color:'#511523', fontSize:'25px', paddingX:'50px', marginBottom:'70px', fontWeight:fontBold}}>今依頼中の案件一覧</Typography>
                    <CancelGrid count={moreView2}/>
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
                            <p className="text-[10px] py-[2px] text-[#FFFFFF] font-bold" style={{fontWeight:fontBold}}>もっと見る</p>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

const CreateGrid:React.FC<{count:number}> = ({count}) => {
    if(count > statusColor.length){count = statusColor.length;}
    const navigate = useNavigate();
    return(
    <Grid container spacing={1} className='items-center' style={{marginLeft:'30px'}}>
        {
            
        statusColor.map((el, i) => (
            i < count? (
            <Grid item xs="auto" > 
            <Box 
                sx={{backgroundColor:el.color,
                    width:'314px', marginX:'15px',
                    marginY:'5px', height:'310px', 
                    borderRadius:'50px',
                    paddingTop:'27px', paddingBottom:'16px', 
                    cursor:'pointer',
                    boxShadow:'0px 0px 10px 3px #00000018',
                    "&:hover": {
                        backgroundColor: el.hoverColor
                      },}}
                onClick={() => {navigate('/mypage/detail')}}>
                <Box display="flex" flexDirection="column">
                <Typography sx={{color:'#554744', fontSize:'11px', marginBottom:'20px', paddingX:'30px', fontWeight:fontBold}}>2023年1月10日依頼</Typography>
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'20px', marginBottom:'8px', paddingX:'30px', fontWeight:fontBold}}>商品紹介の案件</Typography>
                <Typography sx={{color:'#85766D', fontSize:'12px', paddingX:'30px', fontWeight:fontBold}}>内容</Typography>
                <Typography sx={{fontSize:'14px', paddingX:'30px', height:'60px', overflow:'hidden', textOverflow:'ellipsis'}}>
                    自社の美容液の紹介をしたい。新商品です。発売予定は12月1日です。
                    商品のURLはhttps://mirucoma.co…
                </Typography>
                <Slider
                    aria-label="Always visible"
                    defaultValue={el.value}
                    step={25}
                    marks
                    min={0}
                    max={100}
                    sx={{color:el.sidebarColor, marginTop:'10px', width:'80%', marginLeft:'30px',}}
                />
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'11px', marginTop:'10px', paddingX:'30px', fontWeight:fontBold}}>{el.state}</Typography>
                <Box sx={{height:'2px', backgroundColor:'#fff', width:'100%', marginTop:'13px'}}></Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" sx={{marginTop:'10px', paddingX:'30px', }}>
                    <Typography sx={{fontSize:'11px', color:el.sidebarColor, paddingY:'7px', width:'56px', backgroundColor:'#fff', textAlign:'center', borderRadius:'60px', fontWeight:fontBold}}>状況</Typography>
                    <Typography sx={{fontSize:'12px', marginLeft:'10px', color:el.textColor, fontWeight:fontBold}}>{el.title}</Typography>
                </Box>                
               </Box>
            </Grid>):null
        ))
        }
    </Grid>
    );
}

const CancelGrid:React.FC<{count:number}> = ({count}) => {
    return(
        <Grid container spacing={1} className='items-center' style={{marginLeft:'30px'}}>
        {
        Array.from({ length: count }).map((_, i) => (
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
                <Typography sx={{color:'#554744', fontSize:'11px', marginBottom:'20px', paddingX:'30px', fontWeight:fontBold}}>2023年1月10日依頼</Typography>
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'20px', marginBottom:'8px', paddingX:'30px', fontWeight:fontBold}}>商品紹介の案件</Typography>
                <Typography sx={{color:'#85766D', fontSize:'12px', paddingX:'30px', fontWeight:fontBold}}>内容</Typography>
                <Typography sx={{fontSize:'14px', paddingX:'30px', height:'120px', overflow:'hidden', textOverflow:'ellipsis'}}>
                自社の美容液の紹介をしたい。新商品です。発売予定は12月1日です。
                商品のURLはhttps://mirucoma.co.jpです。この商品は、顔に適した商品です、保湿に特化したものになります…
                </Typography>
                <Box sx={{height:'2px', backgroundColor:'#FBF4ED', width:'100%', marginTop:'13px'}}></Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" sx={{marginTop:'10px', paddingX:'30px'}}>
                    <Typography sx={{fontSize:'11px', color:'#fff', paddingY:'7px', width:'56px', backgroundColor:btnBackgroundHover, textAlign:'center', borderRadius:'60px', fontWeight:fontBold}}>状況</Typography>
                    <Typography sx={{fontSize:'12px', marginLeft:'10px', fontWeight:fontBold}}>内容を確認しています</Typography>
                </Box>                
               </Box>
            </Grid>
        ))
        }
    </Grid>
    );
}

export const statusColor = [
    {
        title: 'リクエスター待ちです',
        state: '相談中',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 25,
    },
    {
        title: '撮影中',
        state: '撮影中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 50,
    },
    {
        title: '編集中です',
        state: '編集中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 75,
    },
    {
        title: 'リクエスター待ちです',
        state: '完了・リクエスター確認',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 100,
    },
    {
        title: 'リクエスター待ちです',
        state: '相談中',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 25,
    },
    {
        title: '撮影中',
        state: '撮影中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 50,
    },
    {
        title: '編集中です',
        state: '編集中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 75,
    },
    {
        title: 'リクエスター待ちです',
        state: '完了・リクエスター確認',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 100,
    },
    {
        title: 'リクエスター待ちです',
        state: '相談中',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 25,
    },
    {
        title: '撮影中',
        state: '撮影中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 50,
    },
    {
        title: '編集中です',
        state: '編集中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 75,
    },
    {
        title: 'リクエスター待ちです',
        state: '完了・リクエスター確認',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 100,
    },
    {
        title: 'リクエスター待ちです',
        state: '相談中',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 25,
    },
    {
        title: '撮影中',
        state: '撮影中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 50,
    },
    {
        title: '編集中です',
        state: '編集中',
        color: "#F9E6CE",
        hoverColor: "#EDCBA1",
        sidebarColor: '#EE7A4B',
        textColor: '#554744',
        value: 75,
    },
    {
        title: 'リクエスター待ちです',
        state: '完了・リクエスター確認',
        color: "#F5DFDE",
        hoverColor: "#F7B6B3",
        sidebarColor: btnBackground,
        textColor: '#E4443B',
        value: 100,
    },
]