import { Button, Checkbox, Grid, InputAdornment, TextField, makeStyles, useMediaQuery } from "@mui/material"
import { fontBold, staticFiles } from "../../components/Constants"
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const chkList1 = [
    {
        iconPath: staticFiles.images.seventeen,
        name: "17.Live"
    },
    {
        iconPath: staticFiles.images.youtube1,
        name: "Youtube"
    },
    {
        iconPath: staticFiles.images.tiktok,
        name: "TikTok"
    },
    {
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

interface listProps {
    userId: number,
    avatar: string,
    title: string,
    heart: number,
    follow: number,
    type: string,
    blog: string,
    recommand: boolean,
}

const fakeData:listProps[] = [
    {
        userId: 0,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: true,
    },
    {
        userId: 1,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 2,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 3,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 4,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 5,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 6,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 7,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 8,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
    {
        userId: 9,
        avatar: staticFiles.images.model,
        title: "なまえ なまえ なまえ",
        heart: 39000000,
        follow: 116900,
        type: "コスメ",
        blog: "ブログ",
        recommand: false,
    },
]

export const CreatorFind = () => {
    const navigate = useNavigate();
    const [ selectId, setSelectId ] = useState<string>("");
    const [ page, setPage ] = useState(5);
    
    const existingArrayString = sessionStorage.getItem('searchValue');
    const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];
    const [ searchValue, setSearchValue ] = useState(existingArray);
    const match_1024 = useMediaQuery('(min-width:1024px)');
    const sxStyles = {
        minWidth: match_1024 ? "725px" : "200px",
        border: "none",
        borderRadius: "50px",
        paddingLeft: "10px",
        paddingRight: "10px",
        height: "40px",
        backgroundColor: "#ee7d902c",
      };

    const [searchTerm, setSearchTerm] = useState<string>("");
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
          if(newValue === ""){
            return false;
          }
          if(existingArray.length >= 5){
              existingArray.shift();
          }
          existingArray.push(newValue);
          setSearchValue(existingArray);
          const updatedArrayString = JSON.stringify(existingArray);
          sessionStorage.setItem('searchValue', updatedArrayString);
        }
      };
    
    const handleSearch = () => {

    }
    
    return(
        <>
        <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-[480px]" style={{position:'absolute', top:-120, left:0, filter:'blur(10px)', zIndex:-10}}></div>
        <div className="w-full">
            <div className="h-[220px]"></div>
            <div className="px-[2vw]">
                <p className="text-[30px] text-[#001219] mt-[20px]" style={{letterSpacing:'-4px', fontWeight:fontBold}}>クリエイターを探す</p>
                <p className="text-[19px] text-[#511523]" style={{letterSpacing:'-1px', fontWeight:fontBold}}>登録中のインフルエンサー</p>
                <div className="flex flex-col mt-[95px] items-center">
                    
                {/** Recent Search Keyword */}
                    <div className="flex flex-row justify-center">
                        <span className="text-[25px] text-[#511523] w-[200px]" style={{letterSpacing:'-2px', fontWeight:fontBold}}>キーワード検索</span>
                        <div className="flex flex-col w-[925px]">
                        <TextField
                            id="search"
                            type="search"
                            label="クリエイター名を入力"
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
                        <div className="flex flex-row px-[20px] pt-[20px]">
                            <span className="mr-[5px] text-[16px] text-[#554744]" style={{whiteSpace:'nowrap'}}>最近の検索</span>
                            {
                                searchValue.map((item:any, index:number) => (
                                    <button className="border rounded-[20px] mx-[5px] px-[15px] text-[14px] text-[#554744]" key={index}>{item}</button>
                                ))
                            }
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center rounded-[25px] w-[1268px] bg-[#fff] px-[55px] py-[35px] mt-[25px]" style={{border:"1px solid #F2F2F2", boxShadow:"1px 1px 4px 5px #d78e891a"}}>
                        
                {/** SNS Search Part */}
                        <div className="flex flex-row items-center ">
                            <span className="text-[20px] text-[#554744] w-[270px]  items-center" style={{fontWeight:fontBold}}>活動しているSNS</span>
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
                                    <span className="text-[#001219] text-[18px] mr-[40px]">{item.name}</span>
                                </label>
                                ))
                            }        
                            </div>                        
                        </div>

                {/** Category Search Part */}
                        <div className="flex flex-row mt-[40px] ">
                            <span className="text-[#554744] text-[20px] w-[270px] flex-shrink-0" style={{fontWeight:fontBold}}>ジャンル</span>
                            <div className="flex flex-wrap">
                            {
                                chkList2.map((item, index) => (
                                    <label className="text-[#001219] text-[18px] mr-[30px] items-center cursor-pointer" style={{whiteSpace:"nowrap"}}>
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
                        <div className="mt-[41px] flex flex-row">
                        <span className="text-[#554744] text-[20px] w-[270px] flex-shrink-0" style={{fontWeight:fontBold}}>できること・特殊な依頼</span>
                            <div className="flex flex-wrap">
                            {
                                chkList3.map((item, index) => (
                                    <label className="text-[#001219] text-[18px] mr-[50px] items-center cursor-pointer" style={{whiteSpace:"nowrap"}}>
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
                            className="font-m1c hover:bg-[#E28E9C]/[1] bg-[#EE7D90] text-[19px] h-[41px] rounded-[50px] text-white w-[176px] "
                            onClick={handleSearch}
                            style={{boxShadow:"0px 0px 3px 2px #EE7D90", fontWeight:fontBold}}
                            >
                                絞り込む
                            </button>
                        </div>
                    </div>

                {/** Sort Buttons */}    
                    <div className="flex w-full px-[75px] mt-[40px] items-center">
                            <label className="text-[25px] text-[#511523] w-[35%]" style={{fontWeight:fontBold}}>登録インフルエンサー</label>
                            <label className="text-[18px] text-[#511523] px-[10px]" style={{whiteSpace:"nowrap", fontWeight:fontBold}}>並び替え</label>
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
                                marginRight: '20px',
                                width: '207px',
                                fontSize: '18px',
                                height: '44px',
                                whiteSpace: 'nowrap',
                            }}
                            onClick={() => {
                                setSelect1(item.id);
                            }}
                            onMouseEnter={()=>{setIsHovered1(item.id)}}
                            onMouseLeave={handleMouseLeave1}
                            >
                            {item.name}
                         </Button>) : (<></>)
                    ))}                            
                    </div>
                    <div className="mt-[47px]">
                        {fakeData.map((item, index) => (
                            index < page?(
                            <ItemComponent element={item} recommend={item.recommand}/>):null
                        ))}
                        
                    </div>
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



const ItemComponent:React.FC<{element:listProps, recommend:boolean}> = ({element, recommend}) => {
    const style = {
        marginTop: '-50px',
        display: recommend ? '' : 'none',
      };
      const navigate = useNavigate();
    return(
        <div className="w-[1572px] h-[221px] px-[45px] pt-[25px] pb-[29px] my-[33px] list-style flex flex-row" >
            <div className="flex flex-col items-center">
            <img className="w-[167px] h-[167px] rounded-[30px]" src={element.avatar} onClick={() => navigate(`/creator/detail/${element.userId}`)}/>
            <div className="rounded-[30px] bg-[#F4B7A5] text-center text-[#fff] w-[80%] h-[37px] flex justify-center items-center" style={style}>
                <span style={{fontWeight:fontBold}}>おすすめ</span>
            </div>
            </div>
            <div className="flex flex-col pl-[30px] pt-[8px]">
                <label className="text-[27px] text-[#511523] title-hover" onClick={() => navigate(`/creator/detail/${element.userId}`)} style={{fontWeight:fontBold}}>{element.title}</label>
                <div className="flex flex-row text-[18px] text-[#838688]">
                    <img src={staticFiles.icons.ic_heart_gray} className="w-[16px] mr-[5px]"/><span>いいね数 {element.heart}</span>
                </div>
                <div className="flex flex-row text-[18px] text-[#838688]">
                    <img src={staticFiles.icons.ic_user_plus} className="w-[20px] mr-[5px]"/><span>フォロワー数 {element.follow}人</span>
                </div>
                <div className="flex flex-row text-[#fff] text-[15px] text-center mt-[23px]">
                    <span className="w-[96px] h-[31px] bg-[#F59ABF] rounded-[20px] mr-[15px]" style={{fontWeight:fontBold}}>コスメ</span>
                    <span className="w-[96px] h-[31px] bg-[#E38A86] rounded-[20px]" style={{fontWeight:fontBold}}>ブログ</span>
                    <img src={staticFiles.images.youtube} className="w-[30px] h-[30px] ml-[30px] mr-[4px] rounded-[8px] log-shadow"/>
                    <img src={staticFiles.images.seventeen} className="w-[30px] h-[30px] mx-[4px] rounded-[8px] log-shadow"/>
                    <img src={staticFiles.images.twitter} className="w-[30px] h-[30px] mx-[4px] rounded-[8px] log-shadow"/>
                    <img src={staticFiles.images.instagram} className="w-[30px] h-[30px] mx-[4px] rounded-[8px] log-shadow"/>
                </div>
            </div>
            <div className="flex flex-col ml-[132px] mr-[15px]">
                <label className="text-[#511523] text-[19px]" style={{fontWeight:fontBold}}>動画・画像</label>
                <div className="flex flex-row mt-[11px]">
                    <img src={staticFiles.images.blog1} className="w-[131px] rounded-[20px] mr-[25px] image-hover"/>
                    <img src={staticFiles.images.blog1} className="w-[131px] rounded-[20px] image-hover"/>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <label className="text-[#554744] text-[15px] mt-[45px] title-hover" style={{whiteSpace:'nowrap'}} onClick={() => navigate(`/creator/detail/${element.userId}`)}>+5枚のメディア</label>
            </div>
            <div className="flex flex-col ml-[59px] mr-[15px]">
                <label className="text-[#511523] text-[19px]" style={{fontWeight:fontBold}}>広告・動画</label>
                <div className="flex flex-row mt-[11px]">
                    <img src={staticFiles.images.blog2} className="w-[93px] rounded-[20px] mr-[25px] image-hover"/>
                    <img src={staticFiles.images.blog2} className="w-[93px] rounded-[20px] image-hover"/>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <label className="text-[#554744] text-[15px] mt-[45px] title-hover" style={{whiteSpace:'nowrap'}} onClick={() => navigate(`/creator/detail/${element.userId}`)}>+5個の広告</label>
            </div>
        </div>
    )
}