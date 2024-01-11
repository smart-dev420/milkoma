import { Button, Checkbox, Grid, InputAdornment, TextField, makeStyles, useMediaQuery } from "@mui/material"
import { fontBold, fontSize12, fontSize14, fontSize16, fontSize18, fontSize22, fontSize24, fontSize26, staticFiles } from "../../components/Constants"
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { NumberFormatExample } from "../../utils/appHelper";
import axios from "axios";
import { API } from "../../axios";
import { useSelector } from "react-redux";

const chkList1 = [
    {
        id: 0,
        iconPath: staticFiles.images.seventeen,
        name: "17.Live"
    },
    {
        id: 1,
        iconPath: staticFiles.images.youtube1,
        name: "Youtube"
    },
    {
        id: 2,
        iconPath: staticFiles.images.tiktok,
        name: "TikTok"
    },
    {
        id: 3,
        iconPath: staticFiles.images.instagram,
        name: "Instagram"
    },
]

const chkList2 = [
    {
        name: "美容",
    },
    {
        name: "音楽",
    },
    {
        name: "ブログ",
    },
    {
        name: "教育",
    },
    {
        name: "漫画・アニメ",
    },
    {
        name: "カップル",
    },
    {
        name: "考察",
    },
    {
        name: "ビジネス",
    },
    {
        name: "フィットネス",
    },
    {
        name: "ゲーム",
    },
    {
        name: "ペット",
    },
]

const chkList3 = [
    {name: "ジャケット写真" },
    {name: "複数商品の宣伝" },
    {name: "動画撮影" },
    // {name: "ジャケット写真" },
    // {name: "複数商品の宣伝" },
    // {name: "動画撮影" },
    // {name: "ジャケット写真" },
]

const btn_group:{id: number; name: string;}[] = [
    {
        id:0,
        name : "おすすめ順"
    },
    {
        id:1,
        name : "フォロワー多い順"
    },
    {
        id:2,
        name : "新規順"
    },
    {
        id:3,
        name : "メディア数"
    },
    {
        id:4,
        name : ""
    },
];

export const CreatorFind = () => {
    const navigate = useNavigate();
    const match_768 = useMediaQuery('(min-width:768px)');
    const match_1024 = useMediaQuery('(min-width:1025px)');
    const [ selectId, setSelectId ] = useState<string>("");
    const [ page, setPage ] = useState(5);
    const loginStatus = useSelector((state:any) => state.auth.isLoggedIn);
    
    const existingArrayString = localStorage.getItem('searchValue');
    const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];
    const [ searchValue, setSearchValue ] = useState(existingArray);
    const sxStyles = {
        minWidth: match_1024 ? "725px" : "200px",
        border: "none",
        borderRadius: "50px",
        paddingLeft: "10px",
        paddingRight: "10px",
        height: "40px",
        backgroundColor: "#ee7d902c",
      };
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const [ search, setSearch ] = useState<string>("");

    const [ creatorInfo, setCreatorInfo] = useState<any>([]);
    const getCreatorInfo = async () => {
        const res = await axios.post(`${API}/api/getCreatorInfo`, {});
        setCreatorInfo(res.data.data);
    }
    const getSearchCreatorInfo = async (str: string) => {
        const res = await axios.post(`${API}/api/getSearchCreatorInfo/${str}`, {});
        setCreatorInfo(res.data.data);
    }

    useEffect(() => {
       if(loginStatus) getCreatorInfo();
    }, []);

    useEffect(() => {
        if(loginStatus){
        if(search == ''){
          getCreatorInfo();
        }else{
          getSearchCreatorInfo(search);
        }}
    }, [search]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const [checked, setChecked] = useState(false);

    const handleChecked = (event:React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const [ isHovered1, setIsHovered1 ] = useState<number>(-1);
    const [ select1, setSelect1 ] = useState<number>(-1);
    const handleMouseLeave1 = () => {
        setIsHovered1(-1);
    };

    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevents line break in the textarea
          const newValue = event.target.value;
          setSearch(newValue);
          if(newValue === ""){
            return false;
          }
          if(existingArray.length >= 5){
              existingArray.shift();
          }
          existingArray.push(newValue);
          setSearchValue(existingArray);
          const updatedArrayString = JSON.stringify(existingArray);
          localStorage.setItem('searchValue', updatedArrayString);
        }
      };
    
    const handleSort = async (id:number) => {
        switch(id){
            case 0:{
                const res = creatorInfo.sort((a:any, b:any) => b.heart - a.heart);
                setCreatorInfo(res);
                break;
            }
            case 1:{
                const res = creatorInfo.sort((a:any, b:any) => b.follower.length - a.follower.length);
                setCreatorInfo(res);
                break;
            }
            case 2:{
                const res = creatorInfo.sort((a:any, b:any) => b.created_at - a.created_at);
                setCreatorInfo(res);
                break;
            }
            case 3:{
                const res = creatorInfo.sort((a:any, b:any) => b.media - a.media);
                setCreatorInfo(res);
                break;
            }
            default:break;
        }
    }
    const handleSearch = () => {

    }
       
    return(
        <>
        <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-[480px]" style={{position:'absolute', top:-120, left:0, filter:'blur(10px)', zIndex:-10}}></div>
        <div className="w-full" style={{whiteSpace:'nowrap'}}>
            <div className="h-[220px]"></div>
            <div className="px-[2vw]">
                <p className="text-[#001219] mt-[20px]" style={{letterSpacing:'-4px', fontWeight:fontBold, fontSize:fontSize26}}>クリエイターを探す</p>
                <p className="text-[#511523]" style={{letterSpacing:'-1px', fontWeight:fontBold, fontSize:fontSize16}}>登録中のインフルエンサー</p>
                <div className="flex flex-col mt-[95px] items-center">
                    
                {/** Recent Search Keyword */}
                    <div className="flex justify-center" style={{flexDirection:match_1024?'row':'column', width:match_1024?'60%':'100%'}}>
                        <span className="text-[#511523] w-[200px]" style={{letterSpacing:'-2px', fontWeight:fontBold, fontSize:fontSize22}}>キーワード検索</span>
                        <div className="flex flex-col w-[100%]">
                        <TextField
                            id="search"
                            type="search"
                            placeholder="クリエイター名を入力"
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
                        onKeyDown={handleKeyDown}
                        />
                        <div className="flex flex-wrap px-[20px] pt-[20px]" style={{columnGap:'5px', rowGap:'10px'}}>
                            <span className="text-[#554744]" style={{whiteSpace:'nowrap', fontSize:fontSize14}}>最近の検索</span>
                            {
                                searchValue.map((item:any, index:number) => (
                                    <button style={{fontSize:fontSize12}} className="border rounded-[20px] mx-[5px] px-[15px] text-[#554744]" key={index}>{item}</button>
                                ))
                            }
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center rounded-[25px] bg-[#fff] px-[55px] py-[35px] mt-[25px]" style={{border:"1px solid #F2F2F2", boxShadow:"1px 1px 4px 5px #d78e891a", width:match_1024?'66%':'90%'}}>
                        
                {/** SNS Search Part */}
                        <div className="flex"  style={{flexDirection:match_1024?'row':'column'}}>
                            <span className="text-[#554744] w-[270px] items-center" style={{fontWeight:fontBold, fontSize:fontSize18}}>活動しているSNS</span>
                            <div className="flex flex-wrap">
                            {
                                chkList1.map((item, index) => (
                                <label className="flex flex-row justify-center items-center cursor-pointer">
                                    <Checkbox
                                        color="primary"
                                        className="checkbox"
                                        inputProps={{ 'aria-label': 'checkbox' }}
                                        style={{marginTop:'6px'}}
                                    />
                                    <img src={item.iconPath} className="w-[41px] h-[41px] mr-[10px]" />
                                    <span className="text-[#001219] mr-[40px]" style={{fontSize:fontSize16}}>{item.name}</span>
                                </label>
                                ))
                            }        
                            </div>                        
                        </div>

                {/** Category Search Part */}
                        <div className="flex mt-[40px]" style={{flexDirection:match_1024?'row':'column'}}>
                            <span className="text-[#554744] w-[270px] flex-shrink-0" style={{fontWeight:fontBold, fontSize:fontSize18}}>ジャンル</span>
                            <div className="flex flex-wrap">
                            {
                                chkList2.map((item, index) => (
                                    <label className="text-[#001219] mr-[30px] items-center cursor-pointer" style={{whiteSpace:"nowrap", fontSize:fontSize16}}>
                                    <Checkbox
                                        className="checkbox"
                                        inputProps={{ 'aria-label': 'checkbox' }}
                                        style={{marginTop:'6px'}}
                                    />
                                    {item.name}
                                    </label>
                                ))
                            }  
                            </div>
                        </div>
                {/** To do Search Part */}
                        <div className="mt-[41px] flex" style={{flexDirection:match_1024?'row':'column'}}>
                        <span className="text-[#554744] w-[270px] flex-shrink-0" style={{fontWeight:fontBold, fontSize:fontSize18}}>できること・特殊な依頼</span>
                            <div className="flex flex-wrap">
                            {
                                chkList3.map((item, index) => (
                                    <label className="text-[#001219] mr-[50px] items-center cursor-pointer" style={{whiteSpace:"nowrap", fontSize:fontSize16}}>
                                    <Checkbox
                                        color="primary"
                                        className="checkbox "
                                        inputProps={{ 'aria-label': 'checkbox' }}
                                        style={{marginTop:'6px'}}
                                    />
                                    {item.name}
                                    </label>
                                ))
                            }  
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-[31px] mb-[34px]">
                            <button
                            className="font-m1c hover:bg-[#E28E9C]/[1] bg-[#EE7D90] h-[41px] rounded-[50px] text-white w-[176px] "
                            onClick={handleSearch}
                            style={{boxShadow:"0px 0px 3px 2px #EE7D90", fontWeight:fontBold, fontSize:fontSize16}}
                            >
                                絞り込む
                            </button>
                        </div>
                    </div>

                {/** Sort Buttons */}    
                    <div className="flex w-full px-[75px] mt-[40px] items-center" style={{columnGap:'25%', flexDirection:match_1024?'row':'column'}}>
                        <label className="text-[#511523] " style={{fontWeight:fontBold, fontSize:fontSize22}}>登録インフルエンサー</label>
                        <div style={{display:'flex', flexDirection:'row', columnGap:'20px', alignItems:'center'}}>
                            <label className="text-[#511523] px-[10px]" style={{whiteSpace:"nowrap", fontWeight:fontBold, fontSize:fontSize16}}>並び替え</label>
                            {btn_group.map((item) => (
                                item.id < 4 ? (
                                <Button 
                                    variant="outlined"
                                    size="medium"
                                    style={{
                                        backgroundColor: select1 === item.id? '#CE6F82' : isHovered1 === item.id? '#FCF4EC' : 'white',
                                        color: select1 === item.id ? 'white' : '#B9324D',
                                        borderColor: '#CE6F82',
                                        borderRadius: '25px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                        fontSize: match_1024?fontSize14:fontSize12,
                                        height: '44px',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onClick={() => {
                                        setSelect1(item.id);
                                        handleSort(item.id);
                                    }}
                                    onMouseEnter={()=>{setIsHovered1(item.id)}}
                                    onMouseLeave={handleMouseLeave1}
                                    >
                                    {item.name}
                                </Button>) : (<></>)
                            ))}            
                        </div>                
                    </div>
                
                {/** List Data */}
                    <div className="mt-[47px]">
                        {
                            creatorInfo.length > 0 && creatorInfo.map((item:any, index:number) => (
                                index < page?(
                                <ItemComponent creator={item} recommend={item.recommand}/>):null
                        ))}
                    </div>

                {/** Next Search */}
                    <div className="my-[59px]">
                        <button
                            onClick={() => {setPage((prevPage) => prevPage + 5); console.log(page)}}
                            className="btn-hover w-[284px] h-[58px]"
                            style={{fontWeight:fontBold}}
                            >
                            次の検索
                        </button>
                    </div>
                </div>
            </div>
        </div>                
        </>
    )
}

const ItemComponent:React.FC<{creator:any, recommend:boolean}> = ({creator, recommend}) => {
    const style = {
        marginTop: '-50px',
        display: recommend ? '' : 'none',
      };
      const navigate = useNavigate();
      const match_768 = useMediaQuery('(min-width:768px)');
      const match_1024 = useMediaQuery('(min-width:1025px)');
    return(
        <div className="w-[100%] px-[45px] pt-[25px] pb-[29px] my-[33px] list-style flex" style={{flexDirection:match_1024?'row':'column', columnGap:'132px'}}>
            { creator && (
                <>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div className="flex flex-col items-center">
                            <img className="w-[167px] h-[167px] rounded-[30px]" 
                                src = {`${API}/api/avatar/${creator._id}`}
                                onClick={() => navigate(`/creator/detail/${creator._id}`)}/>
                            <div className="rounded-[30px] bg-[#F4B7A5] text-center text-[#fff] w-[80%] h-[37px] flex justify-center items-center" style={style}>
                                <span style={{fontWeight:fontBold}}>おすすめ</span>
                            </div>
                        </div>
                    <div className="flex flex-col pl-[30px] pt-[8px]">
                        <label className="text-[#511523] title-hover" onClick={() => navigate(`/creator/detail/${creator._id}`)} style={{fontWeight:fontBold, fontSize:fontSize24}}>{creator.username}</label>
                        <div className="flex flex-row text-[#838688]" style={{fontSize:fontSize16}}>
                            <img src={staticFiles.icons.ic_heart_gray} className="w-[16px] mr-[5px]"/>
                            <span>いいね数 {NumberFormatExample(creator.heart.length)}</span>
                        </div>
                        <div className="flex flex-row text-[#838688]" style={{fontSize:fontSize16}}>
                            <img src={staticFiles.icons.ic_user_plus} className="w-[20px] mr-[5px]"/>
                            <span>フォロワー数 {creator.follower.length.toLocaleString()}人</span>
                        </div>
                        <div className="flex flex-row text-[#fff] text-center mt-[23px]" style={{fontSize:fontSize14}}>
                            <span className="w-[96px] h-[31px] bg-[#F59ABF] rounded-[20px] mr-[15px]" style={{fontWeight:fontBold}}>コスメ</span>
                            <span className="w-[96px] h-[31px] bg-[#E38A86] rounded-[20px]" style={{fontWeight:fontBold}}>ブログ</span>
                            <a href={`https://www.youtube.com/${creator.youtubeAccount}`} target="_blank"><img src={staticFiles.images.youtube} className="w-[30px] h-[30px] ml-[30px] mr-[4px] rounded-[8px] log-shadow"/></a>
                            <a href={`https://17.live/${creator.liveAccount}`} target="_blank"><img src={staticFiles.images.seventeen} className="w-[30px] h-[30px] mx-[4px] rounded-[8px] log-shadow"/></a>
                            <a href={`https://twitter.com/${creator.twitterAccount}`} target="_blank"><img src={staticFiles.images.twitter} className="w-[30px] h-[30px] mx-[4px] rounded-[8px] log-shadow"/></a>
                            <a href={`https://www.instagram.com/${creator.instagramAccount}`} target="_blank"><img src={staticFiles.images.instagram} className="w-[30px] h-[30px] mx-[4px] rounded-[8px] log-shadow"/></a>
                        </div>
                    </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', marginTop:match_1024?'0px':'20px', alignItems:match_1024?'center':'start'}}>
                        <div style={{display:'flex', flexDirection:match_1024?'row':'column'}}>
                            <div className="flex flex-col">
                                <label className="text-[#511523]" style={{fontWeight:fontBold, fontSize:fontSize16}}>動画・画像</label>
                                <div className="flex flex-row mt-[11px]">
                                    <img src={staticFiles.images.blog1} className="w-[131px] rounded-[20px] mr-[25px] image-hover"/>
                                    <img src={staticFiles.images.blog1} className="w-[131px] rounded-[20px] image-hover"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <label className="text-[#554744] mt-[45px] title-hover" style={{whiteSpace:'nowrap', fontSize:fontSize14}} onClick={() => navigate(`/creator/detail/${creator._id}`)}>+5枚のメディア</label>
                            </div>
                        </div>
                        <div style={{display:'flex', flexDirection:match_1024?'row':'column'}}>
                            <div className="flex flex-col ml-[59px] mr-[15px]">
                                <label className="text-[#511523]" style={{fontWeight:fontBold, fontSize:fontSize16}}>広告・動画</label>
                                <div className="flex flex-row mt-[11px]">
                                    <img src={staticFiles.images.blog2} className="w-[93px] rounded-[20px] mr-[25px] image-hover"/>
                                    <img src={staticFiles.images.blog2} className="w-[93px] rounded-[20px] image-hover"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <label className="text-[#554744] mt-[45px] title-hover" style={{whiteSpace:'nowrap', fontSize:fontSize14}} onClick={() => navigate(`/creator/detail/${creator._id}`)}>+5個の広告</label>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}