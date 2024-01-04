import { Box, Button, CardMedia, Container, Grid, Slider, Stack, TextareaAutosize, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { btnBackground, btnBackgroundHover, fontBold, fontSize14, fontSize16, scrollTop, staticFiles } from "../../components/Constants";
import { setPage } from "../../slices/page";
import { getDateString, headers, showSentence } from "../../utils/appHelper";
import io, { Socket } from 'socket.io-client';
import React, { useState, useEffect, FormEvent } from 'react';
import { API } from "../../axios";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
// const socket = io('http://localhost:5001');

export const ChattingPage: React.FC<{  }> = ({ }) => {
    // scrollTop();
    const dispatch = useDispatch();
    dispatch(setPage({page:2}));
    const navigate = useNavigate();
    const [ contractInfo, setContractInfo ] = useState<any>(null);
    const { rid } = useParams();
    const userData = localStorage.getItem('user');
    const userEmail = userData?JSON.parse(userData).email:'';
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [ admin, setAdmin ] = useState<boolean>();
    const getAdmin = async () => {
        const query = `${API}/api/getAdmin`;
        const res = await axios.post(query, {}, headers());
        setAdmin(res.data.admin);
    }

    const getContractInfo = async () => {
        const res = await axios.post(`${API}/api/getContractInfo/${rid}`, {}, headers());
        setContractInfo(res.data);
    }
  
    useEffect(() => {
    getAdmin();
    getContractInfo();
    const newSocket = io('http://localhost:5002'); // Replace with your server URL
    setSocket(newSocket);
  
    return () => {
        newSocket.disconnect();
    };
    }, []);
  
    useEffect(() => {
      if (socket) {
        socket.on('connect', () => {
            console.log(`Connected with ID: ${socket.id}`);
            socket.emit('joinRoom', rid);
          });
          
          socket.on('userJoined', ({ room, userId, users }) => {
            console.log(`User with ID ${userId} joined room ${room}, ${users[0]}`);
            // Your logic to handle a user joining a room in real-time
          });
        socket.on('joinedRoom', (room: string) => {
            console.log(`Successfully joined room ${room}`);
            // Your logic to handle successful room join on the client-side
          });

        socket.on('message', (receivedMessage: string) => {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        socket.on('updateOnlineUsers', (onlineUsers) => {
            console.log('Online users:', onlineUsers);
            // Handle the updated online users list on the client side
          });

        // socket.emit('disconnected', { room: '123', message: 'tiger'});

      }
    }, [socket]);
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputMessage && socket) {
        const result = {
            sender: admin?'admin':userEmail,
            message: inputMessage,
        }
          socket.emit('sendMessage', { room: rid, message: result });
          setInputMessage('');
      }
    };   
  
    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            {contractInfo && (
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
                    onClick={()=>{ navigate(`/mypage/detail/${rid}`)} }>
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

                <Typography flex={9} sx={{color:'#511523', fontSize:'22px', marginLeft:'23px', fontWeight:fontBold}}>チャット</Typography>
                <Typography flex={2} sx={{color:'#554744', fontSize:'16px', marginLeft:'23px', fontWeight:fontBold}}>{getDateString(contractInfo.createdDate)} 依頼</Typography>
                </Box>

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
                                  希望納期: {contractInfo.step3 > 0 ? contractInfo.step3 + 'ヶ月': '相談したい'}
                            </Typography>
                        </Box>
                        <Typography sx={{color:'#001219', fontSize:'12px', marginTop:'14px'}}>
                        {contractInfo.step1}
                        </Typography>
                    </Box>
                </Box>       

                {/** Chatting Part */}
                    {/* Displaying received messages */}
                        <Box sx={{border:'1px solid #00000012', borderRadius:'30px', boxShadow:"0px 0px 5px 5px #00000012", marginTop:'50px', padding:'20px', minHeight:'200px'}}>
                            {messages.map((msg, index) => (
                                <Box
                                sx={{width:'70%', float:'right', marginY:'10px'}}
                                >
                                <TextareaAutosize key={index} value={msg.message} 
                                style={{
                                    width:'100%',
                                    resize:"none", 
                                    borderRadius:'15px 15px 0px 15px', 
                                    padding:'15px', backgroundColor:'#FCF4EC', fontSize:fontSize16,
                                }} 
                                disabled />
                                {msg.sender}
                                <Typography sx={{color:'#858997', fontSize:fontSize14}}>
                                {
                                    new Date().getFullYear()}/{new Date().getMonth() + 1 }/{ new Date().getDate()
                                }
                                {
                                 " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                                }
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <TextareaAutosize maxRows={3} style={{
                            resize:"none", backgroundColor:'rgba(0,0,0,0)', 
                            border:'2px solid #DF8391', width:'100%', 
                            padding:'10px 20px 10px 20px', borderRadius:'14px', marginTop:'50px'
                        }}
                        placeholder="Your Message"
                        value={inputMessage}
                         onChange={(e) => setInputMessage(e.target.value)} />
                        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='flex-end' sx={{columnGap:'10px'}}>
                        <svg 
                        onClick={()=>{}}
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{cursor:'pointer'}}>
                            <g id="smile_1" data-name="smile 1" transform="translate(-0.002)">
                                <path id="smile_1_Background_Mask_" data-name="smile 1 (Background/Mask)" d="M0,0H24V24H0Z" transform="translate(0.002)" fill="none"/>
                                <g id="Layer_2" data-name="Layer 2" transform="translate(0 0)">
                                <g id="smile">
                                    <path id="icon" d="M12,24h0a12,12,0,1,1,4.591-.913A12.023,12.023,0,0,1,12,24ZM6.2,14.9a.953.953,0,0,0-.842.507.948.948,0,0,0-.046.78.96.96,0,0,0,.219.335A9.809,9.809,0,0,0,11.95,19.59h.158A8.844,8.844,0,0,0,18.473,16.5a.924.924,0,0,0,.261-.643.947.947,0,0,0-.593-.881.938.938,0,0,0-.354-.069.957.957,0,0,0-.2.021.943.943,0,0,0-.484.27A7.069,7.069,0,0,1,12.1,17.7H12a7.993,7.993,0,0,1-5.131-2.526.951.951,0,0,0-.611-.272ZM17.025,7.37a1.542,1.542,0,1,0,.855.26A1.533,1.533,0,0,0,17.025,7.37Zm-10.048,0a1.542,1.542,0,1,0,.855.26A1.533,1.533,0,0,0,6.977,7.37Z" transform="translate(0.002)" fill="#ee7d90"/>
                                </g>
                                </g>
                            </g>
                        </svg>
                        <svg 
                        onClick={()=>{}}
                        id="icAttachment" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{cursor:'pointer'}}>
                        <g id="attach_1" data-name="attach 1">
                            <path id="attach_1_Background_Mask_" data-name="attach 1 (Background/Mask)" d="M0,0H24V24H0Z" fill="none"/>
                            <g id="Attach" transform="translate(1.595 0)">
                            <path id="Vector" d="M20.244,10.356a7.44,7.44,0,0,1-1.627,2.428L9.16,22.24A5.368,5.368,0,0,1,1.57,14.649l9.574-9.573a3.246,3.246,0,1,1,4.591,4.591L8.48,16.92a.375.375,0,0,1-.53,0L6.89,15.86a.375.375,0,0,1,0-.53l7.254-7.254a1,1,0,0,0,0-1.409,1.023,1.023,0,0,0-1.409,0L3.16,16.24A3.118,3.118,0,1,0,7.57,20.649l9.456-9.456A5.239,5.239,0,0,0,9.616,3.784L5.48,7.92a.375.375,0,0,1-.53,0L3.89,6.86a.375.375,0,0,1,0-.53L8.026,2.193a7.489,7.489,0,0,1,12.785,5.3h0A7.44,7.44,0,0,1,20.244,10.356Z" fill="#ee7d90"/>
                            </g>
                        </g>
                        </svg>
                            <Button
                                variant="outlined" 
                                sx={{color:'#ffffff',
                                    border:'1px solid #EE7D90', marginX:'5px', 
                                    paddingX:'20px',
                                    backgroundColor:'#EE7D90',
                                    fontSize:'16px',
                                    "&:hover": {
                                        backgroundColor:btnBackgroundHover,
                                        border:'1px solid #EE7D90',
                                    },
                                }}
                                type="submit"
                                startIcon = {<SendIcon sx={{marginBottom:'5px'}}/>}
                            >追 加</Button>
                        </Box>
                    </Box>
                </form>

            </Stack>
            )}
        </Container>
    )
}