import { Box, Button, CardMedia, Container, Grid, Slider, Stack, TextareaAutosize, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { btnBackground, btnBackgroundHover, fontBold, scrollTop, staticFiles } from "../../components/Constants";
import { setPage } from "../../slices/page";
import { showSentence } from "../../utils/appHelper";
import io, { Socket } from 'socket.io-client';
import React, { useState, useEffect, FormEvent } from 'react';

// const socket = io('http://localhost:5001');

export const ChattingPage: React.FC<{  }> = ({ }) => {
    // scrollTop();
    const dispatch = useDispatch();
    dispatch(setPage({page:2}));
    const navigate = useNavigate();
    const [ data, setData ] = useState({
        contracted:useSelector((state:any) => state.contract.contracted),
        productIntro: '自社の美容液の紹介をしたい。新商品です。発売予定は12月1日です。@@@商品のURLはhttps://mirucoma.comです。@@@ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。',
    });
    const { roomId } = useParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
  
    useEffect(() => {
      const newSocket = io('http://localhost:5002'); // Replace with your server URL
      setSocket(newSocket);
  
      return () => {
        newSocket.disconnect();
      };
    }, []);
  
    useEffect(() => {
      if (socket) {
        socket.on('message', (receivedMessage: string) => {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      }
    }, [socket]);
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputMessage && socket) {
        console.log('message', messages);
        socket.emit('sendMessage', { room: roomId, message: inputMessage });
        setMessages((prevMessages) => [...prevMessages, inputMessage]);
        setInputMessage('');
      }
    };

    // useEffect(() => {
    //   // Set up a socket event listener when the component mounts
    //   socket.on('message', (receivedMessage: string) => {
    //     setMessages((prevMessages: string[]) => [...prevMessages, receivedMessage]);
    //   });
  
    //   // Clean up the socket event listener when the component unmounts
    //   return () => {
    //     socket.off('message');
    //   };
    // }, []); // Empty dependency array ensures the effect runs once on mount
  
    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (inputMessage && socket) {
    //         console.log('message', messages);
    //       socket.emit('sendMessage', { room: roomId, message: inputMessage });
    //       setInputMessage('');
    //     }
    //   };
      
  
    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
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
                    </Button>

                <Typography flex={9} sx={{color:'#511523', fontSize:'22px', marginLeft:'23px', fontWeight:fontBold}}>チャット</Typography>
                <Typography flex={2} sx={{color:'#554744', fontSize:'16px', marginLeft:'23px', fontWeight:fontBold}}>2023年1月10日依頼</Typography>
                </Box>

                 {/** Product Data and Status Data */}                
                 <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{border:'3px solid #DF8391', borderRadius:'30px', marginTop:'28px', width:'100%'}}>
                    <Box display='flex' flexDirection='column' sx={{padding:'33px'}}>
                        <Typography sx={{color:'#85766D', fontSize:'12px', marginBottom:'7px', fontWeight:fontBold}}>案件名</Typography>
                        <Typography sx={{color:'#B9324D', fontSize:'18px', marginBottom:'26px', fontWeight:fontBold}}>商品紹介の案件</Typography>
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
                                    広告運用を行う際に使う
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
                                    希望納期:5ヶ月
                            </Typography>
                        </Box>
                        <Typography sx={{color:'#001219', fontSize:'12px', marginTop:'14px'}}>
                            {showSentence(data.productIntro)}
                        </Typography>
                    </Box>
                </Box>       

                {/** Chatting Part */}
                    {/* Displaying received messages */}
                        <div>
                            {messages.map((msg, index) => (
                                <TextareaAutosize key={index} value={msg} 
                                style={{width:'100%', resize:"none", border:'1px solid black', borderRadius:'5px', padding:'5px'}} 
                                disabled />
                            ))}
                            {messages.map((msg, index) => (
                                <div>{msg}</div>
                            ))}
                        </div>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <TextareaAutosize maxRows={3} style={{resize:"none", backgroundColor:'rgba(0,0,0,0)', border:'1px solid black', width:'100%'}}
                        placeholder="Your Message"
                        value={inputMessage}
                         onChange={(e) => setInputMessage(e.target.value)} />
                        <button type="submit">Send</button>
                    </Box>
                </form>

            </Stack>
        </Container>
    )
}