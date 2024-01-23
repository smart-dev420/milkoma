import { Grid, Hidden, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material"
import { fontBold, fontSize20, fontSize28, fontSize30, scrollTop, staticFiles } from "../../components/Constants"
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API } from "../../axios";
import axios from "axios";
import { NumberFormatExample, checkToken, headers } from "../../utils/appHelper";
import { toast } from "react-toastify";

export const FindCreator = () => {
    // scrollTop();
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const [ search, setSearch ] = useState<string>("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
    const navigate = useNavigate();
    const match_768 = useMediaQuery('(min-width:768px)');
    const match_1024 = useMediaQuery('(min-width:1025px)');
    const [ creatorInfo, setCreatorInfo] = useState<any>([]);
    const [ creatorSearch, setCreatorSearch ] = useState<any>([]);
    const getCreatorInfo = async () => {
      const res = await axios.post(`${API}/api/getCreatorInfo`, {});
      setCreatorInfo(res.data.data);
      setCreatorSearch(res.data.data);
    }
    const getSearchCreatorInfo = async (str: string) => {
      const res = await axios.post(`${API}/api/getSearchCreatorInfo/${str}`, {});
      setCreatorSearch(res.data.data);
    }

    const handleSearch = (event:any) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevents line break in the textarea
        setSearch(event.target.value);
      }
    }
  useEffect(() => {
      getCreatorInfo();
  }, []);

  useEffect(() => {
    if(search == ''){
      getCreatorInfo();
    }else{
      getSearchCreatorInfo(search);
    }
  }, [search]);
    return(
        <>
        <div style={{whiteSpace:'nowrap'}}>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-screen " style={{position:'absolute', top:0, left:0, filter:'blur(10px)', zIndex:-10, height:match_1024?'1150px':'1850px'}}></div>
            <div className=" w-full " >
                <div className="h-[220px]"></div>
                <div className="pl-[2vw]">
                    <div className="flex" style={{flexDirection:match_1024?'row':'column'}}>
                        <div className="flex flex-col w-[30%]" style={{zIndex:2}}>
                            <p className="text-[#511523] font-m1c" style={{fontSize:match_1024?fontSize28:fontSize20, letterSpacing:'-2px', fontWeight:fontBold}}>クリエイターを探す</p>
                            <div className="ml-[65px]">
                            <div className="flex flex-row mt-[75px]" style={{alignItems:'center'}}>
                                <div className="mr-[5px]">
                                <img src = {staticFiles.images.creator_logo} className="max-w-[200px] aspect-logo" />
                                </div>
                                <span className="text-[#511523]" style={{fontSize:match_1024?fontSize28:fontSize20, fontWeight:fontBold}}>にいる</span><span className="text-[#B9324D]" style={{fontSize:match_1024?fontSize28:fontSize20,fontWeight:fontBold}}>インフルエンサー</span>
                            </div>
                            <p className="text-[#001219] text-[14px] bg-[#fff] mt-[45px]" style={{whiteSpace:'nowrap', width:'fit-content', fontWeight:fontBold}}>ミルコマでは様々なSNSのインフルエンサーが在籍！</p>
                            <div className="flex flex-row text-[#fff] text-[14px] text-center mt-[25px]" style={{columnGap:'25px'}}>
                                <span className="bg-[#FC6761] rounded-[20px] px-[20px]" style={{boxShadow:"0px 2px 3px 1px #FCBEBB", fontWeight:fontBold}}>17ライバー</span>
                                <span className="bg-[#7ABDC4] rounded-[20px] px-[20px]" style={{boxShadow:"0px 2px 3px 1px #DAD8D3", fontWeight:fontBold}}>TikToker</span>
                                <span className="bg-[#F4827F] rounded-[20px] px-[20px]" style={{boxShadow:"0px 2px 3px 1px #F7C9C2", fontWeight:fontBold}}>Youtuber</span>
                                <span className="bg-[#FD8E5C] rounded-[20px] px-[20px]" style={{boxShadow:"0px 2px 3px 1px #FABDA7", fontWeight:fontBold}}>Youtuber</span>
                            </div>
                            <div className="flex flex-col w-[500px] bg-[#E38A86] rounded-[50px] mt-[45px] h-[65px]" style={{boxShadow:"5px 5px 3px 0px #fff"}}>
                                <div className="flex flex-row mt-2 items-center justify-center">
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                </div>
                                
                                <div className="flex flex-row text-[#fff] pl-[20px]" style={{whiteSpace:'nowrap', fontWeight:fontBold, columnGap:'10px'}} >
                                    <span className="text-[20px] ">リクエスターの </span>
                                    <span className="text-[20px]">  や り た い  </span>
                                    <span className="text-[20px]"> に合わせた</span>       
                                </div>
                            
                            </div>
                            <div className="flex flex-row w-[407px] bg-[#E38A86] rounded-[50px] text-[#fff] h-[53px] ml-[30%] pl-[50px]" style={{marginTop:"-10px", boxShadow:"5px 5px 3px 0px #fff"}}>
                                <span className="text-[20px] mt-[5px]">インフルエンサーを</span><span className="text-[20px] mt-[5px]">お探しします</span>
                            </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-row" style={{marginTop:match_1024?'':'50px', paddingLeft:match_1024?'185px':'', justifyContent:match_1024?'':'center'}}>
                            <VerticalSlide creatorInfo={creatorInfo} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                    <p className="text-[#511523] text-[28px] mb-[40px]" style={{fontWeight:fontBold, marginTop:match_1024?'230px':'100px'}}>まずは知っているインフルエンサーを検索！</p>
                    <TextField
                        id="search"
                        type="search"
                        label="キーワードで探す"
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyDown={handleSearch}
                        className="bg-[#FCF9F8] rounded-lg flex justify-center "
                        sx={{marginBottom:match_1024?"70px":'20px', height:"46px", width:match_1024?'45%':'80%'}}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </div>
                </div>
            </div>
            <p className="text-[28px] pt-[85px] pb-[40px] px-[50px]" style={{fontWeight:fontBold}} >
            最近在籍したインフルエンサー
            </p>
            <SlickCarousel creatorInfo = {creatorInfo}/>
            <div className="flex flex-row justify-between pt-[85px] pb-[40px] px-[50px]" style={{columnGap:'100px'}}>
                <p className="text-[28px]" style={{fontWeight:fontBold}}>登録中のインフルエンサー</p>
                <span className="text-[18px] mr-[100px] w-[286px] h-[40px] border rounded-[50px] text-center" style={{fontWeight:fontBold}}>登録数:{creatorInfo.length.toLocaleString()}人</span>
            </div>
            <div className = "px-[2vw]">
                <GridComponent creatorInfo={creatorSearch}/>
            </div>
            <div className="flex flex-row justify-center items-center w-full my-[95px]">
                <button className="btn-hover py-[11px]" onClick={() => {navigate('/creator/find')}} style={{fontWeight:fontBold}}>一覧を見る</button>
            </div>
        </div>
        </>
    )
}

const VerticalSlide : React.FC<{ creatorInfo: any; }> = ({ creatorInfo }) => {

    const match_768 = useMediaQuery('(min-width:768px)');
    const match_1024 = useMediaQuery('(min-width:1025px)');
    const navigate = useNavigate();
    const handleFind = (id: string) => {
      navigate(`/creator/detail/${id}`);
    }
    const [creator, setCreator] = useState<any[]>([]);

    useEffect(() => {
      if (creatorInfo && creatorInfo.length > 0) {
        if(creatorInfo.length > 5){
          setCreator(creatorInfo.slice(0, 5));
        }
        else {
          setCreator(creatorInfo);
        }
      }
    }, [creatorInfo]);
    
    return(
      <>
        {match_1024?(
        <>
          <div className="border-[#E7BBC7] border-[5px] rounded-[25px] h-[473px] w-[62%] " style={{position:"absolute", zIndex: -1}}></div>
          <div className = "slider-content w-[55%] h-[570px]" style={{position:"absolute", marginLeft:"113px", marginTop:"50px"}}></div>
        </>
        ):null}
        <div className = {`${match_1024 ?"":"home-slider-content rounded-[20px] min-h-[590px] px-[20px] py-[20px]"}`}  style={{width:match_1024?"100%":"80%"}}>
          <img src={staticFiles.images.blog} className = "w-[348px] rounded-[20px]" 
          style={{position:match_1024?'absolute':'relative',  margin:match_1024?'90px 0px 40px 55px':'auto', boxShadow:'0px 0px 15px 3px #E5BAA7'}}/>
          <div style={{marginLeft:match_1024?'450px':'0px', marginTop:match_1024?'180px ':'50px', width:match_1024?'600px':'',}}>
            {creator.length > 0? (
                <Carousel 
                autoPlay={true}
                showArrows={false}
                showIndicators={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                stopOnHover={true}
                axis='vertical'
                renderIndicator={(clickHandler, isSelected, index, label) => {
                  if (isSelected) {
                    return (
                      <li
                        className="custom-indicator selected"
                        aria-label={`Selected: ${label} ${index + 1}`}
                        title={`Selected: ${label} ${index + 1}`}
                      />
                    );
                  }
                  return (
                    <li
                      className="custom-indicator"
                      onClick={clickHandler}
                      onKeyDown={clickHandler}
                      value={index}
                      key={index}
                      role="button"
                      tabIndex={0}
                      title={`${label} ${index + 1}`}
                      aria-label={`${label} ${index + 1}`}
                    />
                  );
                }}
                >
                {creator.map((item:any, index:number) => (
                  <div className="flex flex-col w-[450px] p-[10px]" key={index}>
                    <span key={index} className="py-[6px] w-[356px] bg-gradient-to-br from-[#F4B7A5] to-[#F7CF91] text-[#fff] text-[16px] rounded-[20px]" style={{whiteSpace:'nowrap', fontWeight:fontBold, textAlign:'center'}}>17.Live受け取ったギフト No.1</span>
                    <div className="flex flex-row mt-[30px]">
                      <img src = {`${API}/api/avatar/${item._id}`} className="max-h-[65px] max-w-[65px]"/>
                      <div className="flex flex-col ml-[20px] mb-[35px]">
                        <label className="text-[#838688] text-[14px]" style={{whiteSpace:'nowrap', textAlign:'left'}}>{item.email}</label>
                        <label className="text-[24px] text-[#001219]" style={{whiteSpace:'nowrap', fontWeight:fontBold}}>{item.username}</label>
                      </div>
                    </div>
                    <div className="flex flex-row text-[#511523] text-[16px] justify-center items-center" style={{whiteSpace:'nowrap'}}>
                      <img src={staticFiles.icons.ic_user_plus_brown} className="max-w-[22px] max-h-[20px]"/>
                      <label className="ml-[5px] mr-[65px] text-[16px]">フォロワー数 {item.follower.length.toLocaleString()}人</label>
                      <img src={staticFiles.icons.ic_heart} className="max-w-[20px]"/>
                      <label className="text-[16px] ml-[5px]">いいね数 {NumberFormatExample(item.heart.length)}</label>
                    </div>
                    <button className="w-[206px] h-[41px] mt-[40px] rounded-[27px] btn-color" style={{fontWeight:fontBold}}
                        onClick={() => handleFind(item._id)}>
                        詳しく見る
                    </button>
                  </div>
                ))}
                </Carousel>
            ):null}
          </div>
        </div>
      </>
    )
  }


const GridComponent: React.FC<{ creatorInfo: any; }> = ({ creatorInfo }) => {
  const navigate = useNavigate();

  const initialArray = Array.from({ length: 8 }, () => 0);
  const [ followState, setFollowState ] = useState(initialArray);

  const handleFollow = async (email: string, index: number) => {
    const userData = localStorage.getItem('user');
    const userEmail = userData?JSON.parse(userData).email:'';
    let formData = new FormData();
    formData.append('email', email);
    const query = `${API}/api/follower`;
    try {
      if(email == userEmail){
        toast.error('自分に従うことはできません');
        return;
      }
      await checkToken();
      const res = await axios.post(query, formData, headers());
      if (res.status === 200) {
        toast.success(res.data.msg);
        if(res.data.state == 1){
          const updatedFollowState = [...followState]; // Create a copy of the state array
          updatedFollowState[index] = 1; // Update the specific element
          setFollowState(updatedFollowState); 
        }
      } else {
        console.log(res.status);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

    return (
      <Grid container spacing={5} className='justify-center items-center'>
        {creatorInfo.map((item:any, index:number) => (
          index < 8 ?(
          <Grid item xs='auto' key={index}>
          <div className="w-[361px] card-hover my-[15px] cursor-pointer" >
              <div className="flex flex-col px-[20px] py-[30px]">
                  <div className="flex flex-row ">
                      <img 
                        src = {`${API}/api/avatar/${item._id}`}
                        className="rounded-[25px] w-[100px] h-[100px]" 
                        onClick={() => {navigate(`/creator/detail/${item._id}`)}}/>
                      <div className="flex flex-col pl-[10px]" style={{justifyContent:'end', rowGap:'5px'}}>
                        <div className="flex flex-wrap" style={{rowGap:'5px', columnGap:'5px'}} onClick={() => {navigate(`/creator/detail/${item._id}`)}}>
                        {
                          item.skills.map((skill:string, index:number) =>(
                            <span key={index} className="px-[10px] py-[3px] text-[#fff] text-[14px] bg-[#F59ABF] rounded-[20px] text-center" style={{fontWeight:fontBold}}>{skill}</span>
                          ))
                        }
                        </div>
                          <div className="flex flex-row ">
                              <a href={`https://www.youtube.com/${item.youtubeAccount}`} target="_blank"><img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.youtube} style={{zIndex:20}}/></a>
                              <a href={`https://17.live/${item.liveAccount}`} target="_blank"><img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.seventeen} /></a>
                              <a href={`https://twitter.com/${item.twitterAccount}`} target="_blank"><img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.twitter} /></a>
                              <a href={`https://www.instagram.com/${item.instagramAccount}`} target="_blank"><img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.instagram} /></a>
                          </div>
                      </div>
                  </div>
              <span className="mt-[30px] text-[#511523] text-[24px]" style={{fontWeight:fontBold}} onClick={() => {navigate(`/creator/detail/${item._id}`)}}>{item.username}</span>
              <div className="flex flex-row"
                onClick={() => {
                  handleFollow(item.email, index);
                }}>
                  <img className="w-[20px]" src={staticFiles.icons.ic_user_plus} />
                  <span className="text-[14px] text-[#838688]">フォロワー数 {(item.follower.length + followState[index]).toLocaleString()}人</span>
              </div>
            </div>
          </div>
        </Grid>):null
          
        ))}
      </Grid>
    );
};

const SlickCarousel : React.FC<{ creatorInfo: any; }> = ({ creatorInfo }) => {
  const match_768 = useMediaQuery('(min-width:768px)');
  const match_1024 = useMediaQuery('(min-width:1025px)');
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: match_1024?3:2,
      slidesToScroll: 1,
      rows: 1,
      pauseOnHover: true,
    };
  const slideNumber = 10;

  return (
    <div className="mx-[2vw] my-[10px]" style={{whiteSpace:'normal'}}>
      <Slider {...settings}>
        {creatorInfo.map((item:any, index:number) =>(
          index < slideNumber ? (
          <div className="flex ml-[-10px] " key={index}>
            <div className="flex flex-row rounded-[20px] mx-[50px] my-[30px] image-hover-reverse " style={{boxShadow:'0px 0px 20px 5px #E5BAA7'}}>
              <img src = {`${API}/api/avatar/${item._id}`} className="w-[40%]" style={{borderRadius: '20px 0 0 20px', objectFit:'cover', aspectRatio:'1.0'}}/>
              <div className="flex flex-col justify-center px-[20px] py-[10px]">
              <div className="flex flex-wrap" style={{rowGap:'5px', columnGap:'5px'}}>
                {
                  item.skills.map((skill:string, index:number) =>(
                    <span key={index} className="px-[10px] py-[3px] text-[#fff] text-[14px] bg-[#F59ABF] rounded-[20px] text-center" style={{fontWeight:fontBold}}>{skill}</span>
                  ))
                }
                </div>
                <label className ="mb-[12px] text-[22px] text-[#511523]" style={{fontWeight:fontBold}}>{item.username}</label>
                <div className="flex flex-row">
                  <img src={staticFiles.icons.ic_user_plus} />
                  <label className="text-[14px] text-[#838688]">フォロワー数 {item.follower.length.toLocaleString()}人</label>
                </div>
              </div>
            </div>
          </div>
          ) : null
          
          ))}
      </Slider>
    </div>
  );
}