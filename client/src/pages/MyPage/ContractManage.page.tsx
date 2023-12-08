import { Box, Container, Grid, Slider, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { btnBackground, btnBackgroundHover, fontBold, scrollTop, staticFiles } from "../../components/Constants";
import { statusColor } from "./Home.page";
import { setPage } from "../../slices/page";
import { useState } from "react";

export const ContractManage = () => {
    const statusList = [
        {
            name: '依頼中',
            count: 23,
        },
        {
            name: '相談中',
            count: 3,
        },
        {
            name: '製作中',
            count: 10,
        },
        {
            name: '完了',
            count: 12,
        },
    ];
    scrollTop();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageIndex = useSelector((state:any) => state.pages.index);
    dispatch(setPage({page:3}));
    const [ moreView1, setMoreView1 ] = useState(4);
    const [ moreView2, setMoreView2 ] = useState(4);
    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
        <Stack direction="column" sx={{paddingX:'20px', width:'100%'}}>
            <Typography sx={{color:'#511523', fontSize:'22px', paddingX:'15px', marginTop:'25px', fontWeight:fontBold }}>
                制作中の案件一覧
            </Typography>
            <CreateGrid count={moreView1}/>
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
            <Typography sx={{color:'#511523', fontSize:'22px', marginTop:'85px', paddingX:'15px', fontWeight:fontBold }}>      
                今依頼中の案件一覧      
            </Typography> 
            <CancelGrid count={moreView2}/>  
            <Box display = "flex" alignItems="center" justifyContent='center' sx={{width:'100%', marginTop:'155px'}}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" 
                    sx={{
                        backgroundColor:btnBackground, 
                        width:'72px', 
                        minHeight:'72px', 
                        borderRadius:'50%', 
                        cursor:'pointer', 
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
                    <p className="text-[10px] py-[2px] text-[#FFFFFF] font-bold">もっと見る</p>
                </Box>
            </Box>   
        </Stack>
    </Container>
    )
}

const CreateGrid:React.FC<{count:number}> = ({count}) => {
    if(count > statusColor.length){count = statusColor.length;}
    const navigate = useNavigate();
    return(
    <Grid container spacing={1} className='items-center' sx={{marginTop:'70px'}}>
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
                <Typography sx={{color:'#554744', fontSize:'10px', marginBottom:'20px', paddingX:'30px', fontWeight:fontBold}}>2023年1月10日依頼</Typography>
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'18px', marginBottom:'8px', paddingX:'30px', fontWeight:fontBold}}>商品紹介の案件</Typography>
                <Typography sx={{color:'#85766D', fontSize:'10px', paddingX:'30px', fontWeight:fontBold}}>内容</Typography>
                <Typography sx={{fontSize:'12px', paddingX:'30px', height:'60px', overflow:'hidden', textOverflow:'ellipsis'}}>
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
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'10px', marginTop:'10px', paddingX:'30px', fontWeight:fontBold}}>{el.state}</Typography>
                <Box sx={{height:'2px', backgroundColor:'#fff', width:'100%', marginTop:'13px'}}></Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" sx={{marginTop:'10px', paddingX:'30px', }}>
                    <Typography sx={{fontSize:'10px', color:el.sidebarColor, paddingY:'7px', width:'56px', backgroundColor:'#fff', textAlign:'center', borderRadius:'60px', fontWeight:fontBold}}>状況</Typography>
                    <Typography sx={{fontSize:'10px', marginLeft:'10px', color:el.textColor, fontWeight:fontBold}}>{el.title}</Typography>
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
        <Grid container spacing={1} className='items-center' sx={{marginTop:'70px'}}>
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
                <Typography sx={{color:'#554744', fontSize:'10px', marginBottom:'20px', paddingX:'30px', fontWeight:fontBold}}>2023年1月10日依頼</Typography>
                <Typography sx={{textAlign:'center', color:'#001219', fontSize:'18px', marginBottom:'8px', paddingX:'30px', fontWeight:fontBold}}>商品紹介の案件</Typography>
                <Typography sx={{color:'#85766D', fontSize:'10px', paddingX:'30px', fontWeight:fontBold}}>内容</Typography>
                <Typography sx={{fontSize:'12px', paddingX:'30px', height:'120px', overflow:'hidden', textOverflow:'ellipsis'}}>
                自社の美容液の紹介をしたい。新商品です。発売予定は12月1日です。
                商品のURLはhttps://mirucoma.co.jpです。この商品は、顔に適した商品です、保湿に特化したものになります…
                </Typography>
                <Box sx={{height:'2px', backgroundColor:'#FBF4ED', width:'100%', marginTop:'13px'}}></Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" sx={{marginTop:'10px', paddingX:'30px'}}>
                    <Typography sx={{fontSize:'10px', color:'#fff', paddingY:'7px', width:'56px', backgroundColor:btnBackgroundHover, textAlign:'center', borderRadius:'60px', fontWeight:fontBold}}>状況</Typography>
                    <Typography sx={{fontSize:'10px', marginLeft:'10px', fontWeight:fontBold}}>内容を確認しています</Typography>
                </Box>                
               </Box>
            </Grid>
        ))
        }
    </Grid>
    );
}