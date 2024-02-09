import { Card, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { CardElement, IntroCard } from "../../components/Card";
import { fontBold, fontSize18, fontSize20, fontSize26, fontSize28, fontSize30, scrollTop, staticFiles } from "../../components/Constants";
import { HomeGrid } from "../../components/Grid";
import { stat } from "fs";
import { HomeSlider } from "../../components/Slider";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { API } from "../../axios";
import axios from "axios";
import { NumberFormatExample } from "../../utils/appHelper";

const cardData: CardElement[] = [
    {
      name: "商品紹介",
      description:"自社の商品を実際に使ってもらいながら \n 宣伝・紹介する",
      imagePath: staticFiles.images.introduction1,
      buttonName:"詳しく見る"
    },
    {
      name: "自社サービスの宣伝",
      description:"自社の事業・Webサービスなどの\n無形サービスを宣伝・紹介する",
      imagePath: staticFiles.images.introduction2,
      buttonName:"詳しく見る"
    },
    {
      name: "店舗の宣伝",
      description:"自店で飲食を行っているなど、店舗集客のために宣伝する",
      imagePath: staticFiles.images.introduction3,
      buttonName:"詳しく見る"
    },
    {
      name: "イベント告知",
      description:"イベントを行う際にSNSで\n紹介・告知を行いたい",
      imagePath: staticFiles.images.introduction1,
      buttonName:"詳しく見る"
    },
  ];
  
export const Home = () =>{
  scrollTop();
  const match_768 = useMediaQuery('(min-width:768px)');
  const match_1024 = useMediaQuery('(min-width:1025px)');
  const [ selectShowDirection, SetSelectShowDirection ] = useState(0); // 0:virtical, 1:horizontal
  const selectColor = '#511523';
  const unSelectColor = '#FFFFFF';
  const [ creatorInfo, setCreatorInfo] = useState<any>([]);
  const getCreatorInfo = async () => {
    const res = await axios.post(`${API}/api/getCreatorInfo`, {});
    setCreatorInfo(res.data.data);
  }
  useEffect(() => {
    getCreatorInfo();
  }, []);
  
    return(
        <div className="px-[2vw]">
        <div className={`${match_1024 ? "h-[200px]" : (match_768 ? 'h-[10px]' : "mt-[-50px]")}`}></div>
        <HomeSlider />
        <img src={staticFiles.images.ellipse_right} style={{position:"absolute", zIndex:-1, top:"200px", right:0}} width={550} />
        <p className="mt-[100px] my-5" style={{fontWeight:fontBold, fontSize:match_1024?fontSize28:fontSize20}}>おすすめインフルエンサー</p>
        <VerticalSlide creatorInfo={creatorInfo} />
        <img src={staticFiles.images.ellipse_two} style={{position:"absolute", zIndex:-1, top:"1450px", left:0}} width={650} />
        <p className="mt-[100px] my-5" style={{fontWeight:fontBold, fontSize:match_1024?fontSize28:fontSize20}}>宣伝したいものから探す</p>
        <IntroCard elements={cardData} space={3} />
        <p className="mt-[100px] pb-5" style={{fontWeight:fontBold, fontSize:match_1024?fontSize28:fontSize20}}>最近公開された広告・動画</p>
        <label className="ml-[8vw] px-3 py-2 rounded-[20px] cursor-pointer" 
          style={{fontWeight:fontBold, backgroundColor:selectShowDirection == 0 ? selectColor:unSelectColor, color:selectShowDirection == 0? unSelectColor:selectColor}}
          onClick={() => {SetSelectShowDirection(0)}}
          >
            縦動画</label>
        <label className="px-3 py-2 mx-3 rounded-[20px] cursor-pointer" 
          style={{fontWeight:fontBold, backgroundColor:selectShowDirection == 1? selectColor:unSelectColor, color:selectShowDirection == 1? unSelectColor:selectColor}}
          onClick={() => {SetSelectShowDirection(1)}}>
            横動画</label>
        <div className='my-5 flex w-full'>
        <HomeGrid state = {selectShowDirection}/>        
        </div>
        <p className="mt-[100px] my-5" style={{fontWeight:fontBold, fontSize:match_1024?fontSize28:fontSize20}}>ミルコマとは？</p>
        <img src={staticFiles.images.ellipse_three} style={{position:"absolute", zIndex:-1, top:"2800px", right:0}} width={700} />
        <div className={`${match_1024 ? "flex-row mx-[20px]" : "flex-col"} flex items-center justify-center`} style={{columnGap:'146px'}}>
          <div className="flex flex-col justify-center items-center " style={{fontWeight:fontBold}}>
            <span className="py-8 pink-color" style={{fontSize:match_768?fontSize26:fontSize18}}>選ばれてNo.1！</span>
            <p className="py-1 " style={{fontSize:match_768?fontSize26:fontSize18}}>インフルエンサーと企業をつないで</p>
            <p className="pb-10 " style={{fontSize:match_768?fontSize26:fontSize18}}>売り上げを伸ばす</p>
            <img className="" width={460} src={staticFiles.images.logo} />
            <p style={{fontSize:match_768?'23px':fontSize18, color:'#001219', marginTop:'31px', fontWeight:fontBold}}>クラウドソーシングサービス「ミルコマ」</p>
          </div>

          <div style={{marginTop:match_1024?'':'20px'}}>
            <img src={staticFiles.images.homeImage} width={890} className={`${match_1024 ? "" : "mt-8"} rounded-[35px] image-rotate cursor-pointer`} />
          </div>
        </div>
        
        <div className={`${match_1024 ? "h-[333px]" : "h-[150px]" } justify-center items-center flex text-3xl mt-[87px] border-grey mx-[165px]`} style={{fontWeight:fontBold, marginBottom:match_1024?'245px':'50px'}}>
          ここに紹介をかく
        </div>
        </div>
    )
}

const VerticalSlide: React.FC<{ creatorInfo: any; }> = ({ creatorInfo }) => {
  const match_768 = useMediaQuery('(min-width:768px)');
  const match_1024 = useMediaQuery('(min-width:1025px)');
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
    <div className="flex justify-center items-center " style={{flexDirection:match_1024?'row':'column'}}>
      <div className = "home-slider-content rounded-[20px] min-h-[590px] px-[20px] py-[20px]" style={{width:match_1024?"60%":"80%"}}>
        <img src={staticFiles.images.blog} className = "w-[348px] rounded-[20px]" style={{position:match_1024?'absolute':'relative', margin:match_1024?'30px 0px 40px -150px':'auto', boxShadow:'0px 0px 15px 3px #E5BAA7'}}/>
        <div style={{marginLeft:match_1024?'35%':'0px', marginTop:match_1024?'120px ':'50px'}}>
        {creator.length > 0 ? (
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
            {creatorInfo.map((item:any, index:number) => (
              <div className="flex flex-col w-[450px] p-[10px]">
                  <span key={index} className="py-[6px] w-[356px] bg-gradient-to-br from-[#F4B7A5] to-[#F7CF91] text-[#fff] text-[16px] rounded-[20px]" style={{whiteSpace:'nowrap', fontWeight:fontBold, textAlign:'center'}}>
                      17.Live受け取ったギフト No.1
                  </span>
                <div className="flex flex-row mt-[30px]">
                  <img src = {`${API}/api/avatar/${item._id}`} className="max-h-[65px] max-w-[65px]"/>
                  <div className="flex flex-col ml-[20px] mb-[35px]">
                    <label className="text-[#838688] text-[14px]" style={{whiteSpace:'nowrap', textAlign:'left'}}>{item.email}</label>
                    <label className="text-[24px] text-[#001219]" style={{whiteSpace:'nowrap', fontWeight:fontBold}}>{item.username}</label>
                  </div>
                </div>
                <div className="flex flex-row text-[#511523] text-[16px] justify-center items-center" style={{whiteSpace:'nowrap'}}>
                  <img src={staticFiles.icons.ic_user_plus} className="max-w-[22px] max-h-[20px]"/>
                  <label className="ml-[5px] mr-[65px] text-[16px]">フォロワー数 {item.follower.length.toLocaleString()}人</label>
                  <img src={staticFiles.icons.ic_heart} className="max-w-[25px]"/>
                  <label className="text-[16px] ml-[5px]">いいね数 {NumberFormatExample(item.heart.length)}</label>
                </div>
                <button className="w-[206px] h-[41px] mt-[40px] rounded-[27px] btn-color" style={{fontWeight:fontBold}}>詳しく見る</button>
              </div>
            ))}
        </Carousel>
        ):null
        }
      </div>
      </div>
    </div>
    </>
  )
}