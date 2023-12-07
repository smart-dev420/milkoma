import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setInitPage } from "../../slices/page";
import { useNavigate } from "react-router-dom";
import { btnBackground, fontBold } from "../../components/Constants";
import { signout } from "../../slices/auth";

export const SideBar = () => {
    const pageIndex = useSelector((state:any) => state.pages.index);
    const [ clicked, setClicked ] = useState<number>(useSelector((state:any) => state.pages.index));
    const [ isHovered, setIsHovered ] = useState<number>(-1);
    const screenHeight = window.screen.height;
    const handleMouseLeave = () => {
        setIsHovered(-1);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const selectColor = btnBackground;
    const unSelectColor = "#001219";
    const hoverColor = "#E38A86";
    useEffect(() => {
        setClicked(pageIndex);
    },[pageIndex]);
    
    const handleLogout = () => {
        setClicked(7); 
        dispatch(setInitPage());
        dispatch(signout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/login');
    }

    return(
        <div className="flex flex-col pl-[2vw] w-[300px]" style={{zIndex:10, position:'fixed', top:220}}>
            <div className="flex flex-col" style={{overflowY:'auto', maxHeight:screenHeight-400+'px'}}>
            <label className="text-[#554744] text-[28px]" style={{fontWeight:fontBold}}>マイページ</label>
            <label className="text-[16px] text-[#554744]" style={{letterSpacing:'-2px'}}>{clicked != 7? (listItmes[clicked-1].name):''}</label>
                {listItmes.map(item => (
                    <Button
                        onMouseEnter={()=>{setIsHovered(item.id)}}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => {setClicked(item.id); dispatch(setPage({page:item.id})); navigate(item.url)}}
                        style={{justifyContent:'flex-start', marginTop:"40px", paddingLeft:"20px"}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox={item.viewBox}>
                            <path d={item.draw} transform={item.transform}
                            fill={clicked === item.id ? selectColor : (isHovered === item.id ? hoverColor : unSelectColor)}/>
                        </svg>
                        <label className="text-[18px] pl-[18.6px] cursor-pointer" style={{ fontWeight:fontBold, color: clicked === item.id ? selectColor : (isHovered === item.id ? hoverColor : unSelectColor) }}>{item.name}</label>
                    </Button>
                ))}
                <Button
                    onMouseEnter={()=>{setIsHovered(7)}}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLogout}
                    style={{justifyContent:'flex-start', marginTop:"40px", paddingLeft:"20px"}}
                    >
                    <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="m497 273-168 168c-15 15-41 4.5-41-17v-96h-136c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136v-96c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zm-305 163v-40c0-6.6-5.4-12-12-12h-84c-17.7 0-32-14.3-32-32v-192c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-84c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"/></svg>
                    <label className="text-[18px] pl-[18.6px] cursor-pointer" style={{ fontWeight:fontBold, color: clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor) }}>ログアウト</label>
                </Button>
                </div>
        </div>
    )
}

const listItmes = [
    {
        id: 1,
        name: "マイページトップ",
        // width: "22.396",
        // height: "20.61",
        viewBox: "0 0 22.396 20.61",
        draw: "M13.438,16.112v3.945a1.113,1.113,0,0,0,1.113,1.112h6.732A1.113,1.113,0,0,0,22.4,20.057v-9.9a1.788,1.788,0,0,0-.525-1.265L12.463,1.083a1.789,1.789,0,0,0-2.531,0L.525,8.891A1.788,1.788,0,0,0,0,10.156v9.9a1.113,1.113,0,0,0,1.113,1.112H7.845a1.113,1.113,0,0,0,1.113-1.112V16.112a2.24,2.24,0,1,1,4.479,0",
        transform: "translate(0 -0.558)",
        url: "",
    },
    {
        id: 2,
        name: "案件一覧・チャット",
        // width: "15.24",
        // height: "17.135",
        viewBox: "0 0 15.24 17.135",
        draw: "M295.5,57.287h-.725a1.089,1.089,0,0,0-1.089,1.089l0,.027a1.42,1.42,0,0,1-1.421,1.392h-6.592a1.42,1.42,0,0,1-1.421-1.419h0a1.089,1.089,0,0,0-1.089-1.089h-.725a1.089,1.089,0,0,0-1.089,1.089V73.333a1.089,1.089,0,0,0,1.089,1.089H295.5a1.089,1.089,0,0,0,1.089-1.089V58.376a1.089,1.089,0,0,0-1.089-1.089m-4.354,11.692H286.79a1.088,1.088,0,1,1,0-2.177h4.354a1.088,1.088,0,1,1,0,2.177m0-4.353H286.79a1.088,1.088,0,1,1,0-2.177h4.354a1.088,1.088,0,1,1,0,2.177",
        transform: "translate(-281.346 -57.287)",
        url: "project",
    },
    {
        id: 3,
        name: "契約書管理",
        // width: "15.383",
        // height: "18.933",
        viewBox: "0 0 15.383 18.933",
        draw: "M14.017,658.934H3.367A2.365,2.365,0,0,1,1,656.558V642.377A2.373,2.373,0,0,1,3.367,640h7.692a2.8,2.8,0,0,1,1.846.769l2.71,2.706a2.838,2.838,0,0,1,.769,1.851v11.24a2.359,2.359,0,0,1-2.367,2.367M11.65,642.857v1.877h1.881Zm2.367,4.243H11.65a2.366,2.366,0,0,1-2.367-2.367v-2.367c-2.272,0-5.917,0-5.917.007v14.193h10.65Zm-8.283-2.367H6.917a1.183,1.183,0,1,1,0,2.367H5.733a1.183,1.183,0,1,1,0-2.367m0,3.55H11.65a1.183,1.183,0,1,1,0,2.367H5.733a1.183,1.183,0,1,1,0-2.367m0,3.55H11.65a1.183,1.183,0,1,1,0,2.367H5.733a1.183,1.183,0,1,1,0-2.367",
        transform: "translate(-1 -640.001)",
        url: "contract_manage",
    },
    {
        id: 4,
        name: "お支払い管理",
        // width: "15.383",
        // height: "14.284",
        viewBox: "0 0 15.383 14.284",
        draw: "M69.845,3.563A3.063,3.063,0,0,0,66.782.5H59.063A3.063,3.063,0,0,0,56,3.563v9.155a2.082,2.082,0,0,0,2.1,2.066H69.985a1.387,1.387,0,0,0,1.4-1.377V5.094a1.651,1.651,0,0,0-1.538-1.531m-12.306,0V3.314a1.282,1.282,0,0,1,1.282-1.282h8.2a1.281,1.281,0,0,1,1.281,1.282v.249Zm9.532,7.029A1.519,1.519,0,1,1,68.6,9.074a1.521,1.521,0,0,1-1.525,1.519",
        transform: "translate(-56 -0.5)",
        url: "card_manage",
    },
    {
        id: 5,
        name: "サポート",
        // width: "18.934",
        // height: "18.934",
        viewBox: "0 0 18.934 18.934",
        draw: "M12.842,3.375a9.467,9.467,0,1,0,9.467,9.467A9.471,9.471,0,0,0,12.842,3.375ZM13.8,18.531H11.886V16.619H13.8Zm-.009-2.867H11.9c0-3.049,2.84-2.831,2.84-4.724a1.9,1.9,0,0,0-1.893-1.9,1.921,1.921,0,0,0-1.893,1.889H9.055a3.787,3.787,0,0,1,7.573,0C16.629,13.3,13.788,13.57,13.788,15.664Z",
        transform: "translate(-3.375 -3.375)",
        url: "",
    },
    {
        id: 6,
        name: "アカウント設定",
        // width: "16.648",
        // height: "18.933",
        viewBox: "0 0 16.648 18.933",
        draw: "M.845,72.157V70.8a2.723,2.723,0,0,1,1.577-2.333,18.1,18.1,0,0,1,13.494,0A2.723,2.723,0,0,1,17.493,70.8v1.36a2.776,2.776,0,0,1-2.775,2.775H3.62A2.776,2.776,0,0,1,.845,72.157M9.169,56a4.624,4.624,0,1,0,4.624,4.624A4.624,4.624,0,0,0,9.169,56",
        transform: "translate(-0.845 -55.999)",
        url: "profile",
    },
]