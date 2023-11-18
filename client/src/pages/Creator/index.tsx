import { Grid, Hidden, InputAdornment, TextField, Typography } from "@mui/material"
import { fontBold, staticFiles } from "../../components/Constants"
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const FindCreator = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
    const navigate = useNavigate();
    return(
        <>
        <div style={{whiteSpace:'nowrap'}}>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-[1150px]" style={{position:'absolute', top:0, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className=" w-full " >
                <div className="h-[220px]"></div>
                <div className="pl-[2vw]">
                    <div className="flex flex-row">
                        <div className="flex flex-col w-[30%]" style={{zIndex:2}}>
                            <p className="text-[30px] text-[#511523] font-m1c" style={{letterSpacing:'-2px', fontWeight:fontBold}}>クリエイターを探す</p>
                            <div className="ml-[65px]">
                            <div className="flex flex-row mt-[75px]">
                                <div className="mr-[5px]">
                                <img src = {staticFiles.images.creator_logo} className="max-w-[200px] aspect-logo" />
                                </div>
                                <span className="text-[#511523] text-[30px]" style={{fontWeight:fontBold}}>にいる</span><span className="text-[30px] text-[#B9324D]" style={{fontWeight:fontBold}}>インフルエンサー</span>
                            </div>
                            <p className="text-[#001219] text-[16px] bg-[#fff] mt-[45px] w-[96%]" style={{whiteSpace:'nowrap', fontWeight:fontBold}}>ミルコマでは様々なSNSのインフルエンサーが在籍！</p>
                            <div className="flex flex-row text-[#fff] text-[15px] text-center mt-[25px]">
                                <span className="bg-[#FC6761] rounded-[20px] w-[100px]" style={{boxShadow:"0px 2px 3px 1px #FCBEBB", fontWeight:fontBold}}>17ライバー</span>
                                <span className="bg-[#7ABDC4] rounded-[20px] w-[100px] mx-2" style={{boxShadow:"0px 2px 3px 1px #DAD8D3", fontWeight:fontBold}}>TikToker</span>
                                <span className="bg-[#F4827F] rounded-[20px] w-[100px] mx-2" style={{boxShadow:"0px 2px 3px 1px #F7C9C2", fontWeight:fontBold}}>Youtuber</span>
                                <span className="bg-[#FD8E5C] rounded-[20px] w-[100px] " style={{boxShadow:"0px 2px 3px 1px #FABDA7", fontWeight:fontBold}}>Youtuber</span>
                            </div>
                            <div className="flex flex-col w-[500px] bg-[#E38A86] rounded-[50px] mt-[45px] h-[65px]" style={{boxShadow:"5px 5px 3px 0px #fff"}}>
                                <div className="flex flex-row mt-2 items-center justify-center">
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                    <img src={staticFiles.icons.ic_white_dot} className="w-[7px] mx-2" />
                                </div>
                                
                                <div className="flex flex-row text-[#fff] pl-[20px]" style={{whiteSpace:'nowrap', fontWeight:fontBold}} >
                                    <span className="text-[20px] ">リクエスターの</span>
                                    <span className="text-[25px] mx-[10px]">  や り た い  </span>
                                    <span className="text-[20px]">に合わせた</span>       
                                </div>
                            
                            </div>
                            <div className="flex flex-row w-[407px] bg-[#E38A86] rounded-[50px] text-[#fff] h-[53px] ml-[140px] pl-[50px]" style={{marginTop:"-10px", boxShadow:"5px 5px 3px 0px #fff"}}>
                                <span className="text-[22px] mt-[5px]">インフルエンサーを</span><span className="text-[24px] mt-[5px]">お探しします</span>
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-row pl-[185px] w-full">
                            <VerticalSlide />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                    <p className="text-[#511523] text-[30px] mt-[230px] mb-[40px]" style={{fontWeight:fontBold}}>まずは知っているインフルエンサーを検索！</p>
                    <TextField
                        id="search"
                        type="search"
                        label="キーワードで探す"
                        value={searchTerm}
                        onChange={handleChange}
                        className="bg-[#FCF9F8] rounded-lg flex justify-center w-[45%]"
                        sx={{marginBottom:"70px", height:"46px"}}
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
            <p className="text-[30px] pt-[85px] pb-[40px] px-[50px]" style={{fontWeight:fontBold}} >
            最近在籍したインフルエンサー
            </p>
            <SlickCarousel />
            <div className="flex flex-row justify-between pt-[85px] pb-[40px] px-[50px]">
                <p className="text-[30px]" style={{fontWeight:fontBold}}>登録中のインフルエンサー</p>
                <span className="text-[20px] mr-[100px] w-[286px] h-[40px] border rounded-[50px] text-center" style={{fontWeight:fontBold}}>登録数:6,820人</span>
            </div>
            <div className = "px-[2vw]">
                <GridComponent count={8} />
            </div>
            <div className="flex flex-row justify-center items-center w-full my-[95px]">
                <button className="btn-hover py-[11px]" onClick={() => {navigate('/creator/find')}} style={{fontWeight:fontBold}}>一覧を見る</button>
            </div>
        </div>
        </>
    )
}

const VerticalSlide = () => {
    let data = [
      {
        id: 0,
        title: '17.Live受け取ったギフト No.1',
        mail: '@hikarusannnouragawa',
        name: 'ひかる社長の密着日記 ',
        avatar: staticFiles.images.avatar,
        follow:'116,900',
        heart: '3.9M',
      },
      {
        id: 1,
        title: '17.Live受け取ったギフト No.1',
        mail: '@hikarusannnouragawa',
        name: 'ひかる社長の密着日記 ',
        avatar: staticFiles.images.avatar,
        follow:'116,900',
        heart: '3.9M',
      },
      {
        id: 2,
        title: '17.Live受け取ったギフト No.1',
        mail: '@hikarusannnouragawa',
        name: 'ひかる社長の密着日記 ',
        avatar: staticFiles.images.avatar,
        follow:'116,900',
        heart: '3.9M',
      },
      {
        id: 3,
        title: '17.Live受け取ったギフト No.1',
        mail: '@hikarusannnouragawa',
        name: 'ひかる社長の密着日記 ',
        avatar: staticFiles.images.avatar,
        follow:'116,900',
        heart: '3.9M',
      },
      {
        id: 4,
        title: '17.Live受け取ったギフト No.1',
        mail: '@hikarusannnouragawa',
        name: 'ひかる社長の密着日記 ',
        avatar: staticFiles.images.avatar,
        follow:'116,900',
        heart: '3.9M',
      },
    ];
    return(
      <>
        <div className="border-[#E7BBC7] border-[5px] rounded-[25px] h-[473px] w-[100%] " style={{position:"absolute", zIndex: -1}}></div>
        <div className = "slider-content w-[100%] h-[570px]" style={{position:"absolute", marginLeft:"113px", marginTop:"50px"}}></div>
        <img src={staticFiles.images.blog} className = "w-[348px] rounded-[20px] mt-[90px]" style={{position:'absolute', marginLeft:"55px", boxShadow:'0px 0px 15px 3px #E5BAA7', zIndex:2}}/>
          <div className="ml-[450px] mt-[180px]" style={{zIndex:5, width:'1000px'}}>
            <Carousel 
              autoPlay={true}
              showArrows={false}
              showIndicators={true}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              stopOnHover={false}
              axis='vertical'
              renderIndicator={(clickHandler, isSelected, index, label) => {
                if (isSelected) {
                  return (
                    <li
                      className="custom-indicator1 selected"
                      aria-label={`Selected: ${label} ${index + 1}`}
                      title={`Selected: ${label} ${index + 1}`}
                    />
                  );
                }
                return (
                  <li
                    className="custom-indicator1"
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
              {data.map((item, index) => (
                <div className="flex flex-col w-[450px] p-[10px]">
                  <span key={index} className="py-[6px] w-[320px] bg-gradient-to-br from-[#F4B7A5] to-[#F7CF91] text-[#fff] text-[19px] rounded-[20px]" style={{whiteSpace:'nowrap', textAlign:'center', fontWeight:fontBold}}>{item.title}</span>
                  <div className="flex flex-row mt-[30px]">
                    <img src={item.avatar} className="max-h-[65px] max-w-[65px]"/>
                    <div className="flex flex-col ml-[20px] mb-[35px]">
                      <label className="text-[#838688] text-[15px]" style={{whiteSpace:'nowrap', textAlign:'left'}}>{item.mail}</label>
                      <label className="text-[27px] text-[#001219]" style={{whiteSpace:'nowrap'}}>{item.name}</label>
                    </div>
                  </div>
                  <div className="flex flex-row text-[#511523] text-[18px] justify-center items-center" style={{whiteSpace:'nowrap'}}>
                    <img src={staticFiles.icons.ic_user_plus} className="max-w-[22px] max-h-[20px]"/>
                    <label className="ml-[5px] mr-[65px] text-[18px]">フォロワー数 {item.follow}人</label>
                    <img src={staticFiles.icons.ic_heart} className="max-w-[25px]"/>
                    <label className="text-[18px] ml-[5px]">いいね数 {item.heart}</label>
                  </div>
                  <button className="w-[206px] h-[41px] mt-[40px] rounded-[27px] btn-color">詳しく見る</button>
                </div>
              ))}
          </Carousel>
        </div>
      </>
    )
  }

const GridComponent: React.FC<{ count: number }> = ({ count }) => {
    const navigate = useNavigate();
    return (
      <Grid container spacing={5} className='justify-center items-center'>
        {Array.from({ length: count }).map((_, i) => (
          <Grid item xs='auto' key={i}>
            <div className="w-[361px] card-hover my-[15px] cursor-pointer" onClick={() => {navigate('/creator/find')}}>
            {/* <img
              src={staticFiles.images.introduction1}
              className='w-[252px] mx-6 my-2 rounded-[20px] cursor-pointer image-hover'
              style={{ background: 'white' }}
              alt={`Image ${i}`}
            /> */}
            <div className="flex flex-col px-[20px] py-[30px]">
            <div className="flex flex-row ">
                <img src={staticFiles.images.model} className="rounded-[25px] w-[100px]"/>
                <div className="flex flex-col pl-[10px]">
                    <span className="mt-[30px] w-[96px] h-[31px] text-[#fff] text-[15px] bg-[#F59ABF] rounded-[20px] text-center" style={{fontWeight:fontBold}}>コスメ</span>
                    <div className="flex flex-row mt-[10px]">
                        <img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.youtube} />
                        <img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.seventeen} />
                        <img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.twitter} />
                        <img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.instagram} />
                    </div>
                </div>
            </div>
            <span className="mt-[30px] text-[#511523] text-[27px]" style={{letterSpacing:'-4px', fontWeight:fontBold}}>なまえ なまえ なまえ</span>
            <div className="flex flex-row">
                <img className="w-[20px]" src={staticFiles.icons.ic_user_plus} />
                <span className="text-[15px] text-[#838688]">フォロワー数 116,900人</span>
            </div>
            </div>
            </div>
          </Grid>
        ))}
      </Grid>
    );
};

const carouselData = [
    {
      id: "1",
      title: "なまえ なまえ なまえ",
      imgPath: staticFiles.images.model,
      follow: "116,900"
    },
    {
      id: "2",
      title: "なまえ なまえ なまえ",
      imgPath: staticFiles.images.model,
      follow: "116,900"
    },
    {
      id: "3",
      title: "なまえ なまえ なまえ",
      imgPath: staticFiles.images.model,
      follow: "116,900"
    },
    {
      id: "4",
      title: "なまえ なまえ なまえ",
      imgPath: staticFiles.images.model,
      follow: "116,900"
    },
    {
      id: "5",
      title: "なまえ なまえ なまえ",
      imgPath: staticFiles.images.model,
      follow: "116,900"
    },
    {
      id: "6",
      title: "なまえ なまえ なまえ",
      imgPath: staticFiles.images.model,
      follow: "116,900"
    },
    {
      id: "7",
      title: "なまえ なまえ なまえ",
      imgPath: staticFiles.images.model,
      follow: "116,900"
    },
  ]


const SlickCarousel = () => {
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      rows: 1,
      pauseOnHover: true,
    };

  return (
    <div className="mx-[2vw] my-[10px]">
      <Slider {...settings}>
        {carouselData.map(item =>(
          <div className="flex ml-[-10px] ">
          <div className="flex flex-row rounded-[20px] mx-[50px] my-[30px] image-hover-reverse " style={{boxShadow:'0px 0px 20px 5px #E5BAA7'}}>
            <img src={item.imgPath} className="w-[30%]" style={{borderRadius: '20px 0 0 20px',}}/>
            <div className="flex flex-col justify-center px-[20px] py-[10px]">
              <label className="bg-[#F59ABF] text-[15px] text-[#fff] rounded-[26px] py-[5px] w-[96px] text-center my-[9px]" style={{fontWeight:fontBold}}>コスメ</label>
              <label className ="mb-[12px] text-[25px] text-[#511523]" style={{fontWeight:fontBold}}>{item.title}</label>
              <div className="flex flex-row">
                <img src={staticFiles.icons.ic_user_plus} />
                <label className="text-[15px] text-[#838688]">フォロワー数 {item.follow}人</label>
              </div>
            </div>
            </div>
          </div>))}
      </Slider>
    </div>
  );
}