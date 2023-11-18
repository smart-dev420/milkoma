import React, { useState, useEffect } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { staticFiles } from "./Constants";

export const HomeSlider = () => {
  const [goToSlide, setGoToSlide] = useState(1);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showNavigation, setShowNavigation] = useState(true);
//   const [carouselConfig, setCarouselConfig] = useState(config.slow);
  const [ selectItem, setSelectItem ] = useState<number>(0);

  const startAutoSlide = () => {
        // Adjust the duration as needed (in milliseconds)
      };
  const slider:any[] = [
    {
      "sl1": staticFiles.images.slide1,
      "sl3": staticFiles.images.slide2,
      "sl2": staticFiles.images.slide3,
    },
    {
      "sl1": staticFiles.images.slide3,
      "sl3": staticFiles.images.slide1,
      "sl2": staticFiles.images.slide2,
    },
    {
      "sl1": staticFiles.images.slide2,
      "sl3": staticFiles.images.slide3,
      "sl2": staticFiles.images.slide1,
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectItem((selectItem) => (selectItem + 1) % slider.length);
      }, 3000);// Adjust the duration as needed (in milliseconds)
  }, []);

  return (
<>
<div style={{height:"auto"}} className="flex items-center flex-row mt-[260px] mb-[18%]">
<div style={{position:"absolute", width:"35%", zIndex: 1, opacity: "0.4"}}>
<img src={slider[selectItem].sl1} />
</div>
<div style={{position:"absolute", width:"43%", marginLeft:"26.5%", zIndex: 2}}>
<img src={slider[selectItem].sl2} className="mt-[45px]"/>
<div className="justify-center items-center flex flex-row mt-[30px]">
  <img className="cursor-pointer" src={ selectItem === 0? staticFiles.icons.ic_slider : staticFiles.icons.ic_dot} onClick={()=>{setSelectItem(0)}}/>
  <img className="cursor-pointer px-2" src={ selectItem === 2? staticFiles.icons.ic_slider : staticFiles.icons.ic_dot} onClick={()=>{setSelectItem(2)}}/>
  <img className="cursor-pointer" src={ selectItem === 1? staticFiles.icons.ic_slider : staticFiles.icons.ic_dot} onClick={()=>{setSelectItem(1)}}/>
  
  </div>
</div>
<div style={{position:"absolute", width:"35%", zIndex: 1, marginLeft: "61%", opacity: "0.4"}}>
<img src={slider[selectItem].sl3} />
</div>
</div>

</>
  );
};
