import { Box, Container, Grid, Slider, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { btnBackground, btnBackgroundHover, fontBold, scrollTop, staticFiles } from "../../components/Constants";
import { statusColor } from "./Home.page";
import { setPage } from "../../slices/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../axios";
import { getDateString, headers } from "../../utils/appHelper";

export const ContractManage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageIndex = useSelector((state:any) => state.pages.index);
    dispatch(setPage({page:3}));
    const [ moreView1, setMoreView1 ] = useState(4);
    const [ moreView2, setMoreView2 ] = useState(4);

    const user_data = localStorage?.getItem('user');
    const user = user_data ? JSON.parse(user_data) : null;
    const [ contract, setContract ] = useState<any>([]);
    const loginStatus = useSelector((state:any) => state.auth.isLoggedIn);
    const getData = async () => {
        const res = await axios.post(`${API}/api/getAllContract/${user.email}`, {}, headers());
        setContract(res.data);
    }
    useEffect(()=>{
        if(loginStatus) getData();
    }, []);
    
    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
        <Stack direction="column" sx={{paddingX:'20px', width:'100%'}}>
            <Typography sx={{color:'#511523', fontSize:'22px', paddingX:'15px', marginTop:'25px', fontWeight:fontBold }}>
                制作中の案件一覧
            </Typography>
            <CreateGrid count={moreView1} data = {contract}/>
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
            <CancelGrid count={moreView2} data = {contract}/>  
            <Box display = "flex" alignItems="center" justifyContent='center' sx={{width:'100%', marginTop:'70px'}}>
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

const CreateGrid:React.FC<{count:number, data:any}> = ({ count, data }) => {
    const navigate = useNavigate();
    const filteredItems = data.filter((item: any) => item.status > 0);

    return(
    <Grid container spacing={1} className='items-center' style={{marginTop:'30px'}}>
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
        <Grid container spacing={1} className='items-center' style={{marginTop:'30px'}}>
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
                        <Typography sx={{fontSize:'11px', marginLeft:'10px', fontWeight:fontBold, color:item.status == 0?'#000000':'red'}}>{item.status == 0 ?'内容を確認しています':'依頼を受注できません'}</Typography>
                    </Box>                
                   </Box>
                </Grid>
            )
        ))
        }
    </Grid>
    );
}