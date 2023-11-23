// import React, { useState, useEffect } from "react";
// import Carousel from "react-spring-3d-carousel";
// import { config } from "react-spring";
// import { staticFiles } from "./Constants";

// export const HomeSlider = () => {
//   const [goToSlide, setGoToSlide] = useState(1);
//   const [offsetRadius, setOffsetRadius] = useState(2);
//   const [showNavigation, setShowNavigation] = useState(true);
// //   const [carouselConfig, setCarouselConfig] = useState(config.slow);
//   const [ selectItem, setSelectItem ] = useState<number>(0);

//   const startAutoSlide = () => {
//         // Adjust the duration as needed (in milliseconds)
//       };
//   const slider:any[] = [
//     {
//       "sl1": staticFiles.images.slide1,
//       "sl3": staticFiles.images.slide2,
//       "sl2": staticFiles.images.slide3,
//     },
//     {
//       "sl1": staticFiles.images.slide3,
//       "sl3": staticFiles.images.slide1,
//       "sl2": staticFiles.images.slide2,
//     },
//     {
//       "sl1": staticFiles.images.slide2,
//       "sl3": staticFiles.images.slide3,
//       "sl2": staticFiles.images.slide1,
//     }
//   ];
  
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setSelectItem((selectItem) => (selectItem + 1) % slider.length);
//       }, 3000);// Adjust the duration as needed (in milliseconds)
//   }, []);

//   return (
// <>
// <div style={{height:"auto"}} className="flex items-center flex-row mt-[260px] mb-[18%]">
//   <div style={{position:"absolute", width:"35%", zIndex: 1, opacity: "0.4"}}>
//     <img src={slider[selectItem].sl1} />
//   </div>
//   <div style={{position:"absolute", width:"43%", marginLeft:"26.5%", zIndex: 2}}>
//     <img src={slider[selectItem].sl2} className="mt-[45px]"/>
//     <div className="justify-center items-center flex flex-row mt-[30px]" style={{columnGap:'10px'}}>
//       <div style={{width:'13px', height:'13px', borderRadius:'50%', backgroundColor:'#000'}}></div>
//       <div style={{width:'13px', height:'13px', borderRadius:'50%', backgroundColor:'#000'}}></div>
//       <div style={{width:'13px', height:'13px', borderRadius:'50%', backgroundColor:'#000'}}></div>
//       {/* <img className="cursor-pointer" src={ selectItem === 0? staticFiles.icons.ic_slider : staticFiles.icons.ic_dot} onClick={()=>{setSelectItem(0)}}/>
//       <img className="cursor-pointer px-2" src={ selectItem === 2? staticFiles.icons.ic_slider : staticFiles.icons.ic_dot} onClick={()=>{setSelectItem(2)}}/>
//       <img className="cursor-pointer" src={ selectItem === 1? staticFiles.icons.ic_slider : staticFiles.icons.ic_dot} onClick={()=>{setSelectItem(1)}}/>
//        */}
//     </div>
//   </div>
//   <div style={{position:"absolute", width:"35%", zIndex: 1, marginLeft: "61%", opacity: "0.4"}}>
//     <img src={slider[selectItem].sl3} />
//   </div>
// </div>

// </>
//   );
// };

import React, { useState, useEffect } from "react";
import { staticFiles } from "./Constants";

export const HomeSlider = () => {
  const [selectItem, setSelectItem] = useState<number>(0);
  const [inProgress, setInProgress] = useState<number>(0);

  const slider = [
    {
      sl1: staticFiles.images.slide1,
      sl2: staticFiles.images.slide2,
      sl3: staticFiles.images.slide3,
    },
    {
      sl1: staticFiles.images.slide2,
      sl2: staticFiles.images.slide3,
      sl3: staticFiles.images.slide1,
    },
    {
      sl1: staticFiles.images.slide3,
      sl2: staticFiles.images.slide1,
      sl3: staticFiles.images.slide2,
    },
  ];

  let timer:NodeJS.Timeout | null = null;
  let interval:NodeJS.Timeout | null = null;
  useEffect(() => {
     timer = setInterval(() => {
      setSelectItem((selectItem) => (selectItem + 1) % slider.length);
    }, 3000);

    return () => {
      clearInterval(timer!); // Clear the interval on component unmount
    };
  }, []);
  useEffect(() => {
    // Change the dot color gradually over time
    setInProgress(0);
     interval = setInterval(() => {
      setInProgress((inProgress) => (inProgress + 0.2));
    }, 10);

    return () => {
      clearInterval(interval!); // Clear the interval on component unmount
    };
  }, [selectItem]);

  const getDotStyles = (index: number) => {
    // Define the styles for the dots
    const activeColor = "#000";
    const inactiveColor = "#888";
    const activeWidth = "60px";
    const inactiveWidth = "13px";

    if (index === selectItem) {
      return {
        width: activeWidth,
        height: '13px',
        borderRadius: "13px",
        backgroundColor: inactiveColor,
        transition: "width 0.5s, transform 0.5s, background-color 0.5s",
        transform: "scale(1.2)",
      };
    } else {
      return {
        // width: inactiveWidth,
        height: inactiveWidth,
        borderRadius: "13px",
        backgroundColor: inactiveColor,
        transition: "width 0.5s, transform 0.5s",
      };
    }
  };

  return (
    <>
      <div
        style={{ height: "auto" }}
        className="flex items-center flex-row mt-[260px] mb-[18%]"
      >
        <div
          style={{
            position: "absolute",
            width: "35%",
            zIndex: 1,
            opacity: "0.4",
          }}
        >
          <img src={slider[selectItem].sl1} />
        </div>
        <div
          style={{
            position: "absolute",
            width: "43%",
            marginLeft: "26.5%",
            zIndex: 2,
          }}
        >
          <img src={slider[selectItem].sl2} className="mt-[45px]" />
          <div
            className="justify-center items-center flex flex-row mt-[30px]"
            style={{ columnGap: "10px" }}
          >
            {/* {slider.map((_, index) => (
              <div
                key={index}
                style={getDotStyles(index)}
                onClick={() => setSelectItem(index)}
              >
                <div style={{backgroundColor:index == selectItem?'#000':'#888', borderRadius:'15px', height:'13px', width:index == selectItem?inProgress+'px':'13px'}}></div>
              </div>
            ))} */}
              <div
                style={getDotStyles(0)}
                // onClick={() => setSelectItem(0)}
              >
                <div style={{backgroundColor:selectItem == 0?'#000':'#888', borderRadius:'15px', height:'13px', width:selectItem == 0?inProgress+'px':'13px'}}></div>
              </div>
              <div
                style={getDotStyles(2)}
                // onClick={() => setSelectItem(2)}
              >
                <div style={{backgroundColor:selectItem == 2?'#000':'#888', borderRadius:'15px', height:'13px', width:selectItem == 2?inProgress+'px':'13px'}}></div>
              </div>
              <div
                style={getDotStyles(1)}
                // onClick={() => {setSelectItem(1);clearInterval(timer!);clearInterval(interval!);}}
              >
                <div style={{backgroundColor:selectItem == 1?'#000':'#888', borderRadius:'15px', height:'13px', width:selectItem == 1?inProgress+'px':'13px'}}></div>
              </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            width: "35%",
            zIndex: 1,
            marginLeft: "61%",
            opacity: "0.4",
          }}
        >
          <img src={slider[selectItem].sl3} />
        </div>
      </div>
    </>
  );
};