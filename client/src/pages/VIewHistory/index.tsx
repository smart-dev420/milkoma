import { Button, Grid, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { fontBold, scrollTop, staticFiles } from "../../components/Constants";
import axios from "axios";
import { API } from "../../axios";

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

export const ViewHistory = () => {
    // scrollTop();
    const navigate = useNavigate();
    const [ selectId, setSelectId ] = useState<string>("");
    const [ page, setPage ] = useState(8);
    const { userId } = useParams();

    const existingArrayString = localStorage.getItem('searchValue');
    const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];
    const [ searchValue, setSearchValue ] = useState(existingArray);
    const match_1024 = useMediaQuery('(min-width:1025px)');
    const sxStyles = {
        minWidth: match_1024 ? "725px" : "200px",
        border: "none",
        borderRadius: "50px",
        paddingLeft: "10px",
        paddingRight: "10px",
        height: "40px",
        backgroundColor: "#ee7d901a",
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
            getCreatorInfo();
            return false;
          }
          if(existingArray.length >= 5){
              existingArray.shift();
          }
          getSearchCreatorInfo(newValue);
          existingArray.push(newValue);
          setSearchValue(existingArray);
          const updatedArrayString = JSON.stringify(existingArray);
          localStorage.setItem('searchValue', updatedArrayString);
        }
    };
        
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
        if(userId){
            if(userId === 'search'){
                getCreatorInfo();
            }else {
                getSearchCreatorInfo(userId);
            }
        }
    }, [userId]);

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

    return(
        <>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-[480px]" style={{position:'absolute', top:-120, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className="w-full">
                <div className="h-[220px]"></div>
                <div className="px-[2vw]">
                    <p className="text-[28px] text-[#001219] mt-[20px]" style={{letterSpacing:'-2px'}}>閲覧履歴</p>
                    <p className="text-[16px] text-[#511523]" style={{letterSpacing:'-1px'}}>閲覧したことのあるインフルエンサー</p>
                    <div className="flex flex-col mt-[85px] items-center">
                        <div className="flex flex-row justify-center" style={{columnGap:'63px'}}>
                            <span className="text-[22px] text-[#511523] " style={{letterSpacing:'-2px'}}>キーワード検索</span>
                            <div className="flex flex-col w-[48%]">
                                <TextField
                                    id="search"
                                    type="search"
                                    label="クリエイター名を入力"
                                    value={searchTerm}
                                    onChange={handleChange}
                                    sx={sxStyles}
                                    className="bg-[#ee7d901a] rounded-lg px-10 flex justify-center"
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
                                    <span className="text-[14px] text-[#554744]" style={{whiteSpace:'nowrap'}}>最近の検索</span>
                                    {
                                        searchValue.map((item:any, index:number) => (
                                            <button className="border rounded-[20px] mx-[5px] px-[15px] text-[12px] text-[#554744]" key={index}>{item}</button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full px-[75px] items-center mt-[80px] mb-[60px]" style={{flexDirection:match_1024?'row':'column'}}>
                            <label className="text-[22px] text-[#511523] w-[35%]" style={{width:match_1024?'35%':'100%'}}>登録インフルエンサー</label>
                            <div className="flex flex-row items-center">
                                <label className="text-[16px] text-[#511523] px-[10px]" style={{whiteSpace:"nowrap"}}>並び替え</label>
                                <div className="flex flex-wrap" style={{columnGap:'20px', rowGap:'10px'}}>
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
                                                width: '207px',
                                                fontSize: '16px',
                                                height: '44px',
                                                whiteSpace:'nowrap'
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
                    </div>
                        <GridComponent count={page} creatorInfo={creatorInfo}/>
                        <div className="my-[59px]">
                        <button
                            onClick={() => {setPage((prevPage) => prevPage + 8); console.log(page)}}
                            className="btn-hover w-[284px] h-[58px]"
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

const GridComponent: React.FC<{ count: number; creatorInfo: any }> = ({ count, creatorInfo }) => {
    const navigate = useNavigate();
    return (
      <Grid container spacing={5} className='justify-center items-center'>
        {
            creatorInfo.length > 0 && (
                creatorInfo.map((item:any, index:number) => (
                    index < count && (
                        <Grid item xs='auto' key={index}>
                            <div className="w-[361px] card-hover my-[15px] cursor-pointer" onClick={() => {navigate('')}}>
                                <div className="flex flex-col px-[20px] py-[30px]">
                                    <div className="flex flex-row ">
                                        <img 
                                            src = {`${API}/api/avatar/${item._id}`}
                                            className="rounded-[25px] w-[100px]"/>
                                        <div className="flex flex-col pl-[10px]" style={{justifyContent:'end', rowGap:'5px'}}>
                                            <div className="flex flex-wrap" style={{rowGap:'5px', columnGap:'5px'}}>
                                                {
                                                    item.skills.map((skill:string) =>(
                                                        <span className="px-[10px] py-[3px] text-[#fff] text-[14px] bg-[#F59ABF] rounded-[20px] text-center" style={{fontWeight:fontBold}}>{skill}</span>
                                                    ))
                                                }
                                            </div>
                                            <div className="flex flex-row">
                                                <a href={`https://www.youtube.com/${item.youtubeAccount}`} target="_blank"><img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.youtube} style={{zIndex:20}}/></a>
                                                <a href={`https://17.live/${item.liveAccount}`} target="_blank"><img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.seventeen} /></a>
                                                <a href={`https://twitter.com/${item.twitterAccount}`} target="_blank"><img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.twitter} /></a>
                                                <a href={`https://www.instagram.com/${item.instagramAccount}`} target="_blank"><img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.instagram} /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="mt-[30px] text-[#511523] text-[24px]" style={{letterSpacing:'-1px'}}>{item.username}</span>
                                    <div className="flex flex-row">
                                        <img className="w-[20px]" src={staticFiles.icons.ic_user_plus} />
                                        <span className="text-[14px] text-[#838688]">フォロワー数 {item.follower.length.toLocaleString()}人</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    )
                ))
            )}
      </Grid>
    );
};