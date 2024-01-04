import { Button, SvgIcon } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setInitPage } from "../../slices/page";
import { useNavigate } from "react-router-dom";
import { btnBackground, fontBold } from "../../components/Constants";
import { signout } from "../../slices/auth";
import { API } from "../../axios";
import axios from "axios";
import { headers } from "../../utils/appHelper";

export const SideBar = () => {
    const pageIndex = useSelector((state:any) => state.pages.index);
    const [ clicked, setClicked ] = useState<number>(useSelector((state:any) => state.pages.index));
    const [ isHovered, setIsHovered ] = useState<number>(-1);
    const [ admin, setAdmin ] = useState<boolean>(false);
    const getAdminData = async () => {
        const query = `${API}/api/getAdmin`;
        const res = await axios.post(query, {}, headers());
        setAdmin(res.data.admin);
    }

    useEffect(() => {
        getAdminData();
    }, [])

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
        setClicked(9); 
        dispatch(setInitPage());
        dispatch(signout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    const handleAdminPage = () => {
        navigate('/mypage/admin');
    }

    const handleAdminChat = () => {
        navigate('/mypage/admin_chat');
    }

    return(
        <div className="flex flex-col pl-[2vw] w-[300px]" style={{zIndex:10, position:'fixed', top:220}}>
            <div className="flex flex-col" style={{overflowY:'auto', maxHeight:screenHeight-400+'px'}}>
                <label className="text-[#554744] text-[28px]" style={{fontWeight:fontBold}}>マイページ</label>
                <label className="text-[16px] text-[#554744]" style={{letterSpacing:'-2px'}}>
                    {clicked < 7? (listItmes[clicked-1].name): clicked === 8?'管理者ページ':'チャット'}
                    </label>
                <div className="flex flex-col" style={{rowGap:'30px', marginTop:'30px'}}>
                {listItmes.map((item, index) => (
                    !admin && (
                    <Button key={index}
                        onMouseEnter={()=>{setIsHovered(item.id)}}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => {setClicked(item.id); dispatch(setPage({page:item.id})); navigate(item.url)}}
                        style={{justifyContent:'flex-start', paddingLeft:"20px"}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox={item.viewBox}>
                            <path d={item.draw} transform={item.transform}
                            fill={clicked === item.id ? selectColor : (isHovered === item.id ? hoverColor : unSelectColor)}/>
                        </svg>
                        <label className="text-[18px] pl-[18.6px] cursor-pointer" style={{ fontWeight:fontBold, color: clicked === item.id ? selectColor : (isHovered === item.id ? hoverColor : unSelectColor) }}>{item.name}</label>
                    </Button>
                    )
                ))}
                { admin && (
                    <>
                    <Button
                    onMouseEnter={()=>{setIsHovered(7)}}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleAdminChat}
                    style={{justifyContent:'flex-start', paddingLeft:"20px"}}
                    >
                        <svg width="25" height="25"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M406.975527 955.276802c-4.415566 0-8.832156-1.073448-12.872169-3.221368-9.221012-4.885264-14.886035-14.576997-14.603603-24.993231l2.685155-102.362342L313.258075 824.699861c-52.53654 0-90.039689-43.300178-90.039689-96.509031L223.218386 368.94998c0-51.865251 37.503149-94.053096 90.039689-94.053096l551.675628 0c52.53654 0 100.509135 42.187845 100.509135 94.053096l0 359.240851c0 53.207829-47.972595 96.509031-100.509135 96.509031L597.928556 824.699861 422.989245 950.122409C418.237011 953.532065 412.61292 955.276802 406.975527 955.276802zM313.258075 329.877079c-22.590508 0-35.060517 17.168008-35.060517 39.073924l0 359.240851c0 22.522969 13.221116 41.529859 35.060517 41.529859l97.153714 0c7.42204 0 14.522762 2.979868 19.691481 8.293897 5.180999 5.316076 7.986905 12.510942 7.785314 19.920702l-1.972934 75.275427 137.166009-98.335632c4.671393-3.355421 10.268878-5.154393 16.012695-5.154393l275.839349 0c21.838378 0 45.528939-19.006889 45.528939-41.529859L910.462642 368.94998c0-21.905916-22.939455-39.073924-45.528939-39.073924L313.258075 329.876056z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M115.72928 596.539418c-6.483668 0-10.361999-2.281973-15.597233-6.92676-20.106943-17.799388-28.107151-41.180911-28.107151-67.597561L72.024895 162.776294c0-51.865251 37.503149-94.053096 90.039689-94.053096L713.739189 68.723198c52.53654 0 100.509135 42.187845 100.509135 94.053096l0 15.906272c0 15.180747-12.307304 27.490098-27.489074 27.490098-15.180747 0-27.489074-12.308327-27.489074-27.490098l0-15.906272c0-21.905916-22.939455-39.073924-45.529963-39.073924L162.064584 123.70237c-22.590508 0-35.060517 17.168008-35.060517 39.073924l0 359.239827c0 10.523681 1.369184 19.167548 9.584286 26.443255 11.368932 10.067286 11.114129 27.462468 1.046842 38.819121C132.185067 593.398892 123.326305 596.539418 115.72928 596.539418z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M492.881059 453.580472 382.922714 453.580472c-7.597025 0-13.745049-6.148024-13.745049-13.745049 0-7.597025 6.148024-13.745049 13.745049-13.745049l109.959368 0c7.598049 0 13.746072 6.148024 13.746072 13.745049C506.627131 447.432449 500.479107 453.580472 492.881059 453.580472z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M685.309696 453.580472 547.861254 453.580472c-7.597025 0-13.745049-6.148024-13.745049-13.745049 0-7.597025 6.148024-13.745049 13.745049-13.745049l137.448442 0c7.597025 0 13.745049 6.148024 13.745049 13.745049C699.054745 447.432449 692.906721 453.580472 685.309696 453.580472z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M795.269064 453.580472l-54.980195 0c-7.598049 0-13.745049-6.148024-13.745049-13.745049 0-7.597025 6.147-13.745049 13.745049-13.745049l54.980195 0c7.597025 0 13.745049 6.148024 13.745049 13.745049C809.014112 447.432449 802.866089 453.580472 795.269064 453.580472z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M437.901887 522.311857l-54.979172 0c-7.597025 0-13.745049-6.148024-13.745049-13.745049s6.148024-13.751189 13.745049-13.751189l54.979172 0c7.597025 0 13.745049 6.154163 13.745049 13.751189S445.498912 522.311857 437.901887 522.311857z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M602.840426 522.311857 492.881059 522.311857c-7.598049 0-13.745049-6.148024-13.745049-13.745049s6.147-13.751189 13.745049-13.751189l109.959368 0c7.598049 0 13.745049 6.154163 13.745049 13.751189S610.438475 522.311857 602.840426 522.311857z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M795.269064 522.311857 657.820622 522.311857c-7.597025 0-13.745049-6.148024-13.745049-13.745049s6.148024-13.751189 13.745049-13.751189l137.448442 0c7.597025 0 13.745049 6.154163 13.745049 13.751189S802.866089 522.311857 795.269064 522.311857z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M520.37218 604.781126 382.922714 604.781126c-7.597025 0-13.745049-6.147-13.745049-13.745049s6.148024-13.746072 13.745049-13.746072l137.449465 0c7.597025 0 13.745049 6.148024 13.745049 13.746072S527.968182 604.781126 520.37218 604.781126z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M712.79877 604.781126 575.350328 604.781126c-7.597025 0-13.745049-6.147-13.745049-13.745049s6.148024-13.746072 13.745049-13.746072l137.448442 0c7.598049 0 13.746072 6.148024 13.746072 13.746072S720.396819 604.781126 712.79877 604.781126z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M795.269064 604.781126 767.779989 604.781126c-7.598049 0-13.745049-6.147-13.745049-13.745049s6.147-13.746072 13.745049-13.746072l27.489074 0c7.597025 0 13.745049 6.148024 13.745049 13.746072S802.866089 604.781126 795.269064 604.781126z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M437.901887 673.505347l-54.979172 0c-7.597025 0-13.745049-6.148024-13.745049-13.745049s6.148024-13.745049 13.745049-13.745049l54.979172 0c7.597025 0 13.745049 6.148024 13.745049 13.745049S445.498912 673.505347 437.901887 673.505347z"  />
                            <path fill = {clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor)} d="M589.095377 673.505347l-96.213295 0c-7.598049 0-13.745049-6.148024-13.745049-13.745049s6.147-13.745049 13.745049-13.745049l96.213295 0c7.598049 0 13.746072 6.148024 13.746072 13.745049S596.693426 673.505347 589.095377 673.505347z"  />
                        </svg>
                        <label className="text-[18px] pl-[18.6px] cursor-pointer" style={{ fontWeight:fontBold, color: clicked === 7 ? selectColor : (isHovered === 7 ? hoverColor : unSelectColor) }}>チャット</label>
                    </Button>
                    <Button
                    onMouseEnter={()=>{setIsHovered(8)}}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleAdminPage}
                    style={{justifyContent:'flex-start', paddingLeft:"20px"}}
                    >
                        <svg width="20" height="20" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path fill = {clicked === 8 ? selectColor : (isHovered === 8 ? hoverColor : unSelectColor)} d="M513.4 450.5m-173 0a173 173 0 1 0 346 0 173 173 0 1 0-346 0Z" />
                            <path fill = {clicked === 8 ? selectColor : (isHovered === 8 ? hoverColor : unSelectColor)} d="M734.4 569.2c-32.1 0-60.5 15.4-78.3 39.3-24.4 32.8-71.7 54.9-112.6 54.9l-31.4 1.3-31.4-1.3c-40.9 0-88.1-22.2-112.6-54.9-17.8-23.8-46.2-39.3-78.3-39.3-85.3 0-144.7 100-140.6 262.9 0.7 29 3.8 58.5 16 85.6 10.7 23.8 41.7 42 67.8 42h558c26.1 0 57.1-18.2 67.8-42 12.2-27.2 15.2-56.7 16-85.6 4.3-163-55.1-262.9-140.4-262.9z" />
                            <path fill = {clicked === 8 ? selectColor : (isHovered === 8 ? hoverColor : unSelectColor)} d="M742.9 192.9m-132.2 0a132.2 132.2 0 1 0 264.4 0 132.2 132.2 0 1 0-264.4 0Z" />
                            <path fill = {clicked === 8 ? selectColor : (isHovered === 8 ? hoverColor : unSelectColor)} d="M916.4 283c-24.5 0-46.2 11.8-59.8 30-18.7 25-54.8 42-86.1 42l-24 1-24-1c-8 0-16.3-1.1-24.5-3.2 15.7 29.1 24.7 62.4 24.7 97.8 0 32.4-7.7 63-21.1 90.4 11.5-3.3 23.5-5.2 35.6-5.2 38.2 0 73.3 15.3 101.5 44.3 0.7 0.7 1.3 1.7 2.1 2.5h119.1c20 0 43.7-13.9 51.8-32.1 9.3-20.8 11.6-43.3 12.2-65.5 3.1-124.6-42.3-201-107.5-201z" />
                            <path fill = {clicked === 8 ? selectColor : (isHovered === 8 ? hoverColor : unSelectColor)} d="M281.4 192.9m-132.2 0a132.2 132.2 0 1 0 264.4 0 132.2 132.2 0 1 0-264.4 0Z" />
                            <path fill = {clicked === 8 ? selectColor : (isHovered === 8 ? hoverColor : unSelectColor)} d="M188.5 579.8c28.3-29 63.4-44.3 101.5-44.3 12.2 0 24.1 1.9 35.6 5.2-13.4-27.3-21.1-57.9-21.1-90.4 0-35.4 9-68.6 24.7-97.8-8.2 2.1-16.5 3.2-24.5 3.2l-24 1-24-1c-31.2 0-67.4-17-86.1-42-13.6-18.2-35.3-30-59.8-30-65.2 0-110.6 76.4-107.4 201 0.6 22.1 2.9 44.7 12.2 65.5 8.2 18.2 31.9 32.1 51.8 32.1h119.1c0.6-0.8 1.3-1.7 2-2.5z" /></svg>
                        <label className="text-[18px] pl-[18.6px] cursor-pointer" style={{ fontWeight:fontBold, color: clicked === 8 ? selectColor : (isHovered === 8 ? hoverColor : unSelectColor) }}>管理者ページ</label>
                    </Button>
                    </>
                )}
                <Button
                    onMouseEnter={()=>{setIsHovered(9)}}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLogout}
                    style={{justifyContent:'flex-start', paddingLeft:"20px"}}
                    >
                    <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill = {clicked === 9 ? selectColor : (isHovered === 9 ? hoverColor : unSelectColor)} d="m497 273-168 168c-15 15-41 4.5-41-17v-96h-136c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136v-96c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zm-305 163v-40c0-6.6-5.4-12-12-12h-84c-17.7 0-32-14.3-32-32v-192c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-84c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"/></svg>
                    <label className="text-[18px] pl-[18.6px] cursor-pointer" style={{ fontWeight:fontBold, color: clicked === 9 ? selectColor : (isHovered === 9 ? hoverColor : unSelectColor) }}>ログアウト</label>
                </Button>
                </div>
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