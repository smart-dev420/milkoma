import { Card, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { CardElement, IntroCard } from "../../components/Card";
import { fontBold, staticFiles } from "../../components/Constants";
import { HomeGrid } from "../../components/Grid";
import { stat } from "fs";
import { HomeSlider } from "../../components/Slider";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
  const match_768 = useMediaQuery('(min-width:768px)');
  const [ selectImage, SetSelectImage ] = useState(0);
    return(
        <div className="px-[2vw]">
        <div className={`${match_768 ? "h-[200px]" : "mt-[-50px]"}`}></div>
        <HomeSlider />
        <img src={staticFiles.images.ellipse_right} style={{position:"absolute", zIndex:-1, top:"200px", right:0}} width={550} />
        <div className="mt-[100px]"></div>
        <p className="text-2xl mt-[100px] my-5" style={{fontWeight:fontBold}}>おすすめインフルエンサー</p>
        <VerticalSlide />
        <img src={staticFiles.images.ellipse_two} style={{position:"absolute", zIndex:-1, top:"1450px", left:0}} width={650} />
        <p className="text-2xl mt-[100px] my-5" style={{fontWeight:fontBold}}>宣伝したいものから探す</p>
        <IntroCard elements={cardData} space={3} />
        <p className="text-2xl mt-[100px] pb-5" style={{fontWeight:fontBold}}>最近公開された広告・動画</p>
        <label className="ml-[8vw] px-3 py-2 text-white rounded-[20px] cursor-pointer" style={{fontWeight:fontBold, backgroundColor:'#511523'}}>縦動画</label>
        <label className="px-3 py-2 mx-3 text-btnBrown rounded-[20px] cursor-pointer" style={{fontWeight:fontBold, backgroundColor:'#FFF'}}>横動画</label>
        <div className='my-5 flex w-full'>
        <HomeGrid/>        
        </div>
        <p className="text-2xl mt-[100px] my-5" style={{fontWeight:fontBold}}>ミルコマとは？</p>
        <img src={staticFiles.images.ellipse_three} style={{position:"absolute", zIndex:-1, top:"2800px", right:0}} width={700} />
        <div className={`${match_768 ? "flex-row" : "flex-col"} flex `}>
          <div className="flex flex-col justify-center items-center flex-1" style={{fontWeight:fontBold}}>
            <span className="py-8 pink-color text-f26" >選ばれてNo.1！</span>
            <p className="py-1 text-f26">インフルエンサーと企業をつないで</p>
            <p className="pb-10 text-f26">売り上げを伸ばす</p>
            <img className="" width={460} src={staticFiles.images.logo} />
            <p style={{fontSize:'23px', color:'#001219', marginTop:'31px', fontWeight:fontBold}}>クラウドソーシングサービス「ミルコマ」</p>
          </div>

          <div className="flex-1">
            <img src={staticFiles.images.homeImage} width={890} className={`${match_768 ? "" : "mt-8"} rounded-[35px] image-rotate cursor-pointer`} />
          </div>
        </div>
        
        <div className={`${match_768 ? "h-[333px]" : "h-[150px]" } w-full justify-center items-center flex text-3xl mt-20 border-grey mb-[10px]`} style={{fontWeight:fontBold}}>
        ここに紹介をかく
        </div>
        </div>
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
    <div className="flex flex-row justify-center items-center ">
      <div className = "w-[60%] slider-content flex-row rounded-[20px] h-[590px]">
        <img src={staticFiles.images.blog} className = "w-[348px] rounded-[20px] my-[40px] " style={{position:'absolute', marginLeft:"-100px", boxShadow:'0px 0px 15px 3px #E5BAA7'}}/>
        <div className="mt-[120px] ml-[355px] ">
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
            {data.map((item, index) => (
              <div className="flex flex-col w-[450px] p-[10px]">
                <span key={index} className="py-[6px] w-[356px] bg-gradient-to-br from-[#F4B7A5] to-[#F7CF91] text-[#fff] text-[19px] rounded-[20px]" style={{whiteSpace:'nowrap', fontWeight:fontBold, textAlign:'center'}}>{item.title}</span>
                <div className="flex flex-row mt-[30px]">
                  <img src={item.avatar} className="max-h-[65px] max-w-[65px]"/>
                  <div className="flex flex-col ml-[20px] mb-[35px]">
                    <label className="text-[#838688] text-[15px]" style={{whiteSpace:'nowrap', textAlign:'left'}}>{item.mail}</label>
                    <label className="text-[27px] text-[#001219]" style={{whiteSpace:'nowrap', fontWeight:fontBold}}>{item.name}</label>
                  </div>
                </div>
                <div className="flex flex-row text-[#511523] text-[18px] justify-center items-center" style={{whiteSpace:'nowrap'}}>
                  <img src={staticFiles.icons.ic_user_plus} className="max-w-[22px] max-h-[20px]"/>
                  <label className="ml-[5px] mr-[65px] text-[18px]">フォロワー数 {item.follow}人</label>
                  <img src={staticFiles.icons.ic_heart} className="max-w-[25px]"/>
                  <label className="text-[18px] ml-[5px]">いいね数 {item.heart}</label>
                </div>
                <button className="w-[206px] h-[41px] mt-[40px] rounded-[27px] btn-color" style={{fontWeight:fontBold}}>詳しく見る</button>
              </div>
            ))}
        </Carousel>
      </div>
      </div>
    </div>
    </>
  )
}