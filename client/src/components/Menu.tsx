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
import { fontBold, staticFiles } from './Constants';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from "@mui/icons-material/Search";
import { ItemElement } from '../pages/layouts/Top';

const menuItems: NavBarElement[] = [
  {
    name: "クリエイターを探す",
    path: "/creator",
    imgPath: staticFiles.icons.ic_navbar1,
  },
  {
    name: "掲示板を見る",
    path: "/direct_request",
    imgPath: staticFiles.icons.ic_navbar2,
  },
  {
    name: "クリエイターランキング",
    path: "/",
    imgPath: staticFiles.icons.ic_navbar3,
  },
  {
    name: "閲覧履歴",
    path: "/history",
    imgPath: staticFiles.icons.ic_navbar4,
  },
  {
    name: "ヘルプ",
    path: "/",
    imgPath: staticFiles.icons.ic_navbar5,
  },
];

type Anchor = 'left';

export const MainMenu = () => {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const navigate = useNavigate();
  // const [invisible, setInvisible] = React.useState(false);
  const [state, setState] = React.useState({left: false});
  const [invisible, setInvisible] = React.useState(false);
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
  const [ detail, setDetail ] = React.useState<boolean>(false);
  const [ selectId, setSelectId ] = React.useState<string>("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setDetail(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [searchTerm, setSearchTerm] = React.useState<string>("");

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
          <label className="text-xs font-m1c ml-5 h-[17px] min-w-[75px] bg-[#F9E5D1] flex justify-center items-center text-center rounded-lg">リクエスター</label>
        </ListItem>
        <ListItem>
          <TextField
            id="search"
            type="search"
            placeholder="キーワードで探す"
            value={searchTerm}
            onChange={handleChange}
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
            className="text-ms min-w-[60px] font-m1c pl-4 mt-3 hover:text-lightBrown/[1]"
            onClick={handleClick}
            // aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            style={{fontWeight:fontBold}}
            // aria-expanded={open ? 'true' : undefined}
            >
              お知らせ
          </button>
        </ListItem>
        <ListItem onClick={() => {navigate('/mypage');}}>
          <img src={staticFiles.icons.ic_user_unfill} className="pr-6 mt-2" />
          <button className="text-ms min-w-[60px] font-m1c mt-3 hover:text-lightBrown/[1]">マイページ</button>
        </ListItem>
        <ListItem>
          <button onClick={() => {navigate('/direct_request');toggleDrawer(false);}} className=" px-[20px] text-ms font-m1c hover:bg-brown/[1] bg-pink h-[48px] rounded-[50px] text-white">直接依頼をする</button>
        </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.name} disablePadding>
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
      <React.Fragment>
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
            {detail?(
              <React.Fragment>
                <div className="px-10 py-5">
                新しいお知らせはありません {selectId}
                </div>  
              </React.Fragment>
            ):(
              fakeData.map((item:ItemElement) => (
                <>
                <div className="flex flex-row p-5">
                    <div className="flex flex-col w-[85%]">
                      <p>{item.name}</p>
                      <p>{item.date}</p>
                    </div>
                  <button key={item.id} onClick={()=>{setDetail(true); setSelectId(item.id)}} className="hover:bg-btHover/[1] bg-btColor w-[157px] h-[39x] rounded-[50px] text-white">詳しく見る</button>
                </div>
                <Divider />
                </>
              ))
            )}
        </Menu>
      </React.Fragment>
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