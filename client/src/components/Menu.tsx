import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Badge, Button, Drawer, InputAdornment, TextField, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavBarElement } from './NavBar';
import { fontBold, fontSize12, staticFiles } from './Constants';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from "@mui/icons-material/Search";
import { ItemElement } from '../pages/layouts/Top';
import { useSelector } from 'react-redux';
import { checkToken, convertNumberToDate, headers } from '../utils/appHelper';
import { API } from '../axios';
import axios from 'axios';

const menuItems: NavBarElement[] = [
  {
    name: "クリエイターを探す",
    path: "/creator",
    imgPath: staticFiles.icons.ic_navbar1,
  },
  // {
  //   name: "掲示板を見る",
  //   path: "/",
  //   imgPath: staticFiles.icons.ic_navbar2,
  // },
  // {
  //   name: "クリエイターランキング",
  //   path: "/",
  //   imgPath: staticFiles.icons.ic_navbar3,
  // },
  {
    name: "閲覧履歴",
    path: "/history/search",
    imgPath: staticFiles.icons.ic_navbar4,
  },
  // {
  //   name: "ヘルプ",
  //   path: "/",
  //   imgPath: staticFiles.icons.ic_navbar5,
  // },
];

export const MainMenu = () => {

  const navigate = useNavigate();
  const loginStatus = useSelector((state:any) => state.auth.isLoggedIn);
  const [ state, setState ] = React.useState({left: false});
  const [ clicked, setClicked ] = React.useState<boolean>(false);
  const [ invisible, setInvisible ] = React.useState(false);
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);

  const [searchInfo, setSearchInfo] = React.useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInfo(event.target.value);
  };
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents line break in the textarea
      if(searchInfo === '' || searchInfo.trim() === '') {
        navigate(`/history/search`);
      }else{
        navigate(`/history/${searchInfo.trim()}`);
      }
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [ adminInfo, setAdminInfo ] = React.useState<boolean>();
  const getAdminInfo = async () => {
      await checkToken();
      const query = `${API}/api/getAdmin`;
      const res = await axios.post(query, {}, headers());
      setAdminInfo(res.data.admin);
  }

  const [ messageInfo, setMessageInfo ] = React.useState<any[]>();
  const getAllMessageInfo = async () => {
    await checkToken();
    const query = `${API}/api/getAllNotReceivedMessages`;
    const res = await axios.post(query, {}, headers());
    console.log('res - ', res.data);
    setMessageInfo(res.data);
    if(res.data.length > 0) {
      setInvisible(false);
    } else {
      setInvisible(true);
    }
  }

  React.useEffect(() => {
    if(loginStatus) { 
      getAdminInfo(); 
      getAllMessageInfo();
      setClicked(false);
    }
  }, [clicked])
  
  const handleMyPage = () => {
    if(loginStatus){
      if(adminInfo){
        navigate('/mypage/admin_chat')
      }else{
        navigate('/mypage')
      }
    } else {
      navigate('/login')
    }
  }

  const handleNotification = (id: string, sender: string, receiver: string) => {
    setClicked(true);
    if(receiver === 'admin'){
      if(sender === 'client'){
        localStorage.setItem('role', 'client');
      } else {
        localStorage.setItem('role', 'creator');
      }
    }
    navigate(`/mypage/chatting/${id}`);
  }

  const toggleDrawer = (open:any) => (event:any) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, left: open });
  };
  const sxStyles = {
    border: "none",
    borderRadius: "50px",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "40px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <img src={staticFiles.images.circle} className='w-[34px]'/>
          <span className='mx-[20px]'>ログイン中</span>
        </ListItem>
        <ListItem>
          <label>NeoPen株式会社</label>
          <label className="font-m1c ml-5 h-[17px] min-w-[75px] bg-[#F9E5D1] flex justify-center items-center text-center rounded-lg" style={{fontSize:'9px'}}>インフルエンサー</label>
        </ListItem>
        <ListItem>
          <TextField
            id="search"
            type="search"
            placeholder="キーワードで探す"
            value={searchInfo}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            sx={sxStyles}
            className="bg-[#FCF9F8] rounded-lg px-10 flex justify-center"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
        <ListItem>
          <Badge color="error" variant="dot" invisible={invisible} className="mt-2 ">
            <NotificationsNoneIcon color="action" />
          </Badge>
          <button 
            className="min-w-[60px] font-m1c pl-4 mt-3 hover:text-lightBrown/[1]"
            onClick={handleClick}
            // aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            style={{fontWeight:fontBold, fontSize:fontSize12}}
            // aria-expanded={open ? 'true' : undefined}
            >
              お知らせ
          </button>
        </ListItem>
        <ListItem onClick={() => {navigate('/mypage');}}>
          <img src={staticFiles.icons.ic_user_unfill} className="pr-6 mt-2" />
          <button className="min-w-[60px] font-m1c mt-3 hover:text-lightBrown/[1]" style={{fontSize:fontSize12}}>マイページ</button>
        </ListItem>
        <ListItem>
          <button style={{fontSize:fontSize12}} onClick={() => {navigate('/direct_request');toggleDrawer(false);}} className=" px-[20px] font-m1c hover:bg-brown/[1] bg-pink h-[48px] rounded-[50px] text-white">丸投げ依頼する</button>
        </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src = {item.imgPath} />
              </ListItemIcon>
              <ListItemText primary={item.name} onClick={() => {navigate(item.path);toggleDrawer(false);}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <IconButton
            onClick={toggleDrawer(true)}
            size="small"
            sx={{ ml: 2 }}
            // aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            // aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
            <MoreVertIcon />
            </Avatar>
          </IconButton>
      </Box>
      
   <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          className="px-[100px]"
        >
            <div className='flex flex-row px-5 py-5'>
              <div className="flex-2 w-[600px]">
              <img className="" src={staticFiles.icons.ic_notification_color} />
              </div>
              <button className="flex-1"><img src={staticFiles.icons.ic_noti_close}
                onClick={handleClose} /></button>
            </div>
            {invisible?(
                <div className="px-10 py-5">
                新しいお知らせはありません
                </div>  
            ):(
              messageInfo && messageInfo.length > 0 && messageInfo.map((item:any, index:number) => (
                <div key={index}>
                <div className="flex flex-row p-5">
                    <div className="flex flex-col w-[85%]">
                      <p>お知らせ{index + 1}</p>
                      <p>{convertNumberToDate(item.date)}</p>
                    </div>
                  <button key={item.contractId} 
                    onClick={()=>{
                      handleNotification(item.contractId, item.sender, item.receiver);
                      }
                    } className="hover:bg-btHover/[1] bg-btColor w-[157px] h-[39x] rounded-[50px] text-white">詳しく見る</button>
                </div>
                <Divider />
                </div>
              ))
            )}
        </Menu>
    </>)
}

const fakeData: ItemElement[] = [
  {
    id: "1",
    name: "お知らせ1",
    date: "2022年11月11日11:11"
  },
  {
    id: "2",
    name: "お知らせ1",
    date: "2022年11月11日11:11"
  },
  {
    id: "3",
    name: "お知らせ1",
    date: "2022年11月11日11:11"
  },
  {
    id: "4",
    name: "お知らせ1",
    date: "2022年11月11日11:11"
  },
  {
    id: "5",
    name: "お知らせ1",
    date: "2022年11月11日11:11"
  },
]