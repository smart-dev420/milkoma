import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, NavBarElement } from "../../components/NavBar";
import { SpaceY } from "../../components/SpaceY";
import { fontBold, staticFiles } from "../../components/Constants";
import { Container, InputAdornment, TextField, Badge, useMediaQuery, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { MainMenu } from "../../components/Menu";
import Menu from '@mui/material/Menu';
import { tr } from "date-fns/locale";
import { useSelector } from "react-redux";

const pageLayoutNavBar: NavBarElement[] = [
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

export type ItemElement = {
  id: string;
  name: string;
  date: string;
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
  
export const Top = () => {
    const navigate = useNavigate();
    const loginStatus = useSelector((state:any) => state.auth.isLoggedIn);
    const handleSignOut = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      navigate("/login");
    }
    const [searchTerm, setSearchTerm] = useState<string>("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
    const [invisible, setInvisible] = useState(false);
    const match_1024 = useMediaQuery('(min-width:1024px)');
    const match_1200 = useMediaQuery('(min-width:1200px)');
    const match_1500 = useMediaQuery('(min-width:1500px)');
    const sxStyles = {
      minWidth: match_1024 ? "100%" : "200px",
      border: "none",
      borderRadius: "50px",
      paddingLeft: "10px",
      paddingRight: "10px",
      height: "40px"
    };
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

    const [ isHovered, setIsHovered ] = useState<number>(-1);
    const handleMouseLeave = () => {
        setIsHovered(-1);
    };

    return (
      <> 
      <div className="w-full h-[170px] bg-gradient-to-b from-[#FFFFFF] via-[#ffffffe1] to-[#FFFFFF00]" style={{position:'fixed', zIndex:8, top:0}}></div>
        <div className={`${match_1024 ? "w-[96%]" : "w-[96%]"} bg-white px-5 xl:flex justify-between items-center flex-col mt-5 py-2 rounded-[10px]`} style={{ boxShadow: "0 8px 14px -1px #F6EEEB", position:"fixed", top:0, zIndex:10 }}>
          <div className={`${match_1024 ? "flex-row" : "flex-col"} flex  justify-start w-full items-center pt-4`}>
            <div className="flex flex-row justify-center items-center">
              <img onClick={() => navigate("/")} src={staticFiles.icons.ic_logo} alt="Mirucoma logo" className={`${match_1024 ? "w-[80%]" : "w-[40%] py-[20px] mx-[20px]" } cursor-pointer`} />
              <div className={`${match_1024 ? "hidden":""}`}>
                <MainMenu />
              </div>
            </div>
            <img src={staticFiles.images.circle} className={`${match_1024 ? "" : "hidden"} w-[32px] py-3`} />
            <div className={`${match_1024 ? "" : "hidden"} flex flex-col ml-10`} >
              <label className="text-xs font-m1c">ログイン中</label>
                <div className="flex flex-row justify-between">
                  <label className="text-md font-m1c min-w-[140px]" style={{whiteSpace:'nowrap', fontWeight:fontBold}}>NeoPen株式会社</label>
                  <label className="text-xs font-m1c ml-5 h-[17px] min-w-[75px] bg-[#F9E5D1] flex justify-center items-center text-center rounded-lg" style={{whiteSpace:'nowrap'}}>リクエスター</label>
                </div>
            </div>
            <div className={`${match_1024 ? "" : "hidden"} pl-12 pt-3 w-full justify-center flex`}>
              <TextField
                  id="search"
                  type="search"
                  placeholder="キーワードで探す"
                  variant="outlined"
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
            </div>
              <label className={`${match_1024 ? "" : "hidden"} flex flex-row cursor-pointer`} 
                onClick={handleClick}
                onMouseEnter={()=>setIsHovered(1)}
                onMouseLeave={handleMouseLeave}
                >
              <Badge color="error" variant="dot" invisible={invisible} className="mt-2 pl-6" >
                <NotificationsNoneIcon sx={{
                        color: isHovered == 1?'#F6CAA1':'#000'
                    }} />
              </Badge>
                <button 
                  className={`${match_1500 ? "text-md min-w-[120px]" : match_1024 ? "text-ms min-w-[60px]" : "hidden"} font-m1c pl-4 mt-3`}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  style={{whiteSpace:'nowrap', fontWeight:fontBold, color:isHovered == 1?'#F6CAA1':'#000'}}
                  >
                    お知らせ
                </button>
              </label>
              {/* <img src={staticFiles.icons.ic_user_unfill} className={`${match_1500 ? "pl-10" : match_1024 ? "pl-4" : "hidden" } pr-3 mt-2`}/> */}
              <label className="flex flex-row " style={{alignItems:'center', marginLeft:'50px'}}
                onMouseEnter={()=>setIsHovered(2)}
                onMouseLeave={handleMouseLeave}
                onClick={()=>{loginStatus?(navigate('/mypage')):(navigate('/login'))}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17.693" height="20.22" viewBox="0 0 17.693 20.22" style={{marginTop:'10px'}}>
                  <path id="Path_176" data-name="Path 176" d="M80.165,6.321a6.319,6.319,0,1,0-10.426,4.8A8.838,8.838,0,0,0,65,18.959a1.264,1.264,0,1,0,2.528,0,6.319,6.319,0,0,1,12.638,0,1.264,1.264,0,1,0,2.528,0,9.045,9.045,0,0,0-1.617-5.1,8.568,8.568,0,0,0-3.123-2.736A6.3,6.3,0,0,0,80.165,6.321Zm-6.319,3.791a3.791,3.791,0,1,1,3.791-3.791,3.791,3.791,0,0,1-3.791,3.791" transform="translate(-65 -0.002)" 
                  fill={isHovered == 2?'#F6CAA1':'#001219'} fill-rule="evenodd"/>
                </svg>
                <button 
                  className={`${match_1500 ? "text-md min-w-[120px]" : match_1024 ? "text-ms min-w-[60px]" : "hidden"} font-m1c mt-3 `} 
                  style={{whiteSpace:'nowrap', fontWeight:fontBold, color:isHovered == 2?'#F6CAA1':'#000'}}
                >{loginStatus?"マイページ":"ログイン"}
                </button>
              </label>
              <button
                onClick={()=>{navigate('/direct_request')}}  
                className={`${match_1500 ? "ml-[10%] text-sm min-w-[170px]" : match_1024 ? "ml-1 text-ms min-w-[170px]" : "hidden"} font-m1c hover:bg-brown/[1] bg-pink h-[48px] rounded-[50px] text-white`} style={{whiteSpace:'nowrap', fontWeight:fontBold}}>
                直接依頼をする
              </button>
              
          </div>
          <div className={`${match_1024 ? "" : "hidden"}`}>
            <NavBar elements={pageLayoutNavBar} />
          </div>
        </div>
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
      </>
    );
  };

