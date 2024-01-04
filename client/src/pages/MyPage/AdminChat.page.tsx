import { Box, Button, CardMedia, Container, Grid, IconButton, Slider, Stack, TextareaAutosize, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { btnBackground, btnBackgroundHover, fontBold, fontSize14, fontSize16, fontSize18, scrollTop, staticFiles } from "../../components/Constants";
import { setPage } from "../../slices/page";
import { headers, showSentence } from "../../utils/appHelper";
import io, { Socket } from 'socket.io-client';
import React, { useState, useEffect, FormEvent } from 'react';
import { API } from "../../axios";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

export const AdminChatPage: React.FC<{  }> = ({ }) => {
    // scrollTop();
    const dispatch = useDispatch();
    dispatch(setPage({page:7}));
    const navigate = useNavigate();
    const [ admin, setAdmin ] = useState<boolean>();
    const getAdmin = async () => {
        const query = `${API}/api/getAdmin`;
        const res = await axios.post(query, {}, headers());
        setAdmin(res.data.admin);
    }
    const [ contract, setContract ] = useState<any>([]);
    const getContract = async () => {
        const query = `${API}/api/getAllContracts`;
        const res = await axios.post(query, {}, headers());
        setContract(res.data.filter((item:any, index:number) => item.status > 0));
    }
    useEffect(() => {
        getAdmin();
        getContract();
        console.log(contract);
    if(admin == false){
        navigate('/mypage');
      }
    }, []);
    console.log(contract);
    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'40px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" sx={{paddingX:'20px', width:'100%'}}>
            {/** Back button and Page Title */}    
                <Box display='flex' flexDirection='row' alignItems='center'>
                    {/* <Button sx={{
                        backgroundColor:btnBackground, 
                        borderRadius:'25px', 
                        width:'147px', color:'red',
                        "&:hover": {
                            backgroundColor: btnBackgroundHover
                        },
                        }}
                    onClick={()=>{navigate('/mypage/detail')}}>
                        <CardMedia
                            component="img"
                            alt="Image1"
                            height="25"
                            sx={{borderRadius:'20px', width:'25px', marginRight:'10px'}}
                            image={staticFiles.icons.ic_back_white} />
                        <Typography sx={{color:'#ffffff', fontSize:'18px', fontWeight:fontBold }}>      
                            戻る
                        </Typography>
                    </Button> */}

                <Typography flex={9} sx={{color:'#511523', fontSize:'22px', marginLeft:'23px', fontWeight:fontBold}}>チャット</Typography>
                </Box>
                { contract && (
                <Box display='flex' flexDirection='row' sx={{columnGap:'50px'}}>
                    <Box display='flex' flexDirection='column' sx={{width:'100%'}}>
                    <Typography sx={{ marginLeft:'23px', marginTop:'10px', fontSize:fontSize16, fontWeight:fontBold }} >クライアントとのチャット</Typography>
                    <List sx={{ width: '100%', maxHeight: '500px', overflow: 'auto', marginY:'10px', paddingX:'20px' }}>
                        {contract.map((item: any, index: number) => (
                            <ListItem key={index} secondaryAction={
                                <IconButton edge="end" aria-label="send">
                                    <SendIcon />
                                </IconButton>
                            }>
                                <ListItemAvatar>
                                    <Avatar sx={{backgroundColor:'#e6d6d696'}}>
                                        <WorkIcon sx={{color:btnBackground}}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.category + " (" + item.clientEmail +")"}
                                    secondary={item.step1}
                                />
                            </ListItem>
                        ))}
                    </List>

                    </Box>
                    <Box display='flex' flexDirection='column' sx={{width:'100%'}}>
                    <Typography sx={{ marginLeft:'23px', marginTop:'10px', fontSize:fontSize16, fontWeight:fontBold }} >クリエイターとチャットする</Typography>
                    <List sx={{ width: '100%', maxHeight: '500px', overflow: 'auto', marginY:'10px', paddingX:'20px' }}>
                        {contract.map((item: any, index: number) => (
                            <ListItem key={index} secondaryAction={
                                <IconButton edge="end" aria-label="send">
                                    <SendIcon />
                                </IconButton>
                            }>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.category + " (" + item.creatorEmail +")"}
                                    secondary={item.step1}
                                />
                            </ListItem>
                        ))}
                    </List>

                    </Box>
                </Box>
                )}
            </Stack>
        </Container>
    )
}