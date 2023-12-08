import React, { useState, useEffect } from "react"
import { CardElement } from "../../components/Card";
import { fontBold, fontSize20, fontSize30, staticFiles } from "../../components/Constants";
import { Grid, TextareaAutosize, useMediaQuery, TextField, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { setStep, setCategory, setQuestion, setInit } from "../../slices/creator"
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormatExample, headers, showSentence } from "../../utils/appHelper";
import { API } from "../../axios";
import axios from "axios";
import { toast } from "react-toastify";

const cardData: CardElement[] = [
    {
      name: "商品紹介",
      description:"自社の商品を実際に使ってもらいながら \n 宣伝・紹介する",
      imagePath: staticFiles.images.introduction1,
      buttonName:"選択"
    },
    {
      name: "自社サービスの宣伝",
      description:"自社の事業・Webサービスなどの\n無形サービスを宣伝・紹介する",
      imagePath: staticFiles.images.introduction2,
      buttonName:"選択"
    },
    {
      name: "店舗の宣伝",
      description:"自店で飲食を行っているなど、店舗集客のために宣伝する",
      imagePath: staticFiles.images.introduction3,
      buttonName:"選択"
    },
    {
      name: "イベント告知",
      description:"イベントを行う際にSNSで\n紹介・告知を行いたい",
      imagePath: staticFiles.images.introduction1,
      buttonName:"選択"
    },
  ];

const btn_group1:{id: number; name: string;}[] = [
    {
        id:0,
        name : "広告運用したい"
    },
    {
        id:1,
        name : "SNSにアップしたい"
    },
    {
        id:2,
        name : "実店舗などに使う"
    },
    {
        id:3,
        name : "その他"
    },
    {
        id:4,
        name : ""
    },
];
const btn_group2:{id: number; name: string;}[] = [
    {
        id:0,
        name : "1ヶ月"
    },
    {
        id:1,
        name : "2ヶ月"
    },
    {
        id:2,
        name : "3ヶ月"
    },
    {
        id:3,
        name : "相談したい"
    },
    {
        id:4,
        name : ""
    },
];
  
export const CreatorStep = () => {
    // const [ selectTab, setSelectTab ] = useState<number>(0);
    const selectTab = useSelector((state:any) => state.creator.step);
    const selectColor:string = "#E38A86";
    const unselectColor:string = "#D9D9D9";
    const dispatch = useDispatch();
    
    const {userId} = useParams();
    const query = `${API}/api/getCreatorProfile/${userId}`;
    const [ creatorInfo, setCreatorInfo] = useState<any>({});
    const getCreatorInfo = async () => {
      const res = await axios.post(query, {});
      setCreatorInfo(res.data.data);
    }
    useEffect(() => {
      getCreatorInfo();
    }, []);
    console.log("userData", creatorInfo);

    const match_768 = useMediaQuery('(min-width:768px)');
    const match_1024 = useMediaQuery('(min-width:1025px)');
    return (
        <>
        <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-[480px]" style={{position:'absolute', top:-120, left:0, filter:'blur(10px)', zIndex:-10}}></div>
        <div className="h-[200px]"></div>
        <IntroComponent data = { creatorInfo }/>
        <div className="px-[2vw] flex justify-center items-center flex-col mt-[70px]">
            <p className="text-[#554744] text-[16px]">インフルエンサーを指名して依頼します。</p>
            <p className="text-[#554744] text-[16px]">インフルエンサーを確認してリクエストしてください</p>
            <div className="flex w-[60%] mt-[41px]" style={{flexDirection:match_1024?'row':'column'}}>
                <img className="h-[80px]" src={staticFiles.images.tab_active_default} style={{position:"absolute", zIndex:-1, width:match_1024?'20%':'60%'}}/>
                <img className="h-[80px]" 
                    src={ selectTab > 0 ? staticFiles.images.tab_active : staticFiles.images.tab_inactive} 
                    style={{position:"absolute", zIndex:-2, marginLeft:match_1024?'18.5%':'', marginTop:match_1024?'':'100px', width:match_1024?'20%':'60%'}}
                    />
                <img className="h-[80px]" src={ selectTab > 1? staticFiles.images.tab_active : staticFiles.images.tab_inactive} 
                style={{position:"absolute", zIndex:-3, marginLeft:match_1024?'37%':'', marginTop:match_1024?'':'200px', width:match_1024?'20%':'60%'}}/>
                <div className="flex-1 text-center py-[29px]" >
                    <span className="py-1 px-5 bg-[#fff] rounded-[25px] font-medium" style={{color: selectColor, fontWeight:fontBold}}>STEP1</span>
                    <span className="px-3 text-[#fff] text-[14px]" style={{fontWeight:fontBold}}>ジャンルを選ぶ</span>
                </div>
                <div className="flex-1 text-center py-[29px]" style={{marginTop:match_1024?'':'15px'}}>
                    <span className="py-1 px-5 bg-[#fff] rounded-[25px] font-medium" style={selectTab > 0 ? {color: selectColor, fontWeight:fontBold}: {color: unselectColor, fontWeight:fontBold} }>STEP2</span>
                    <span className="px-3 text-[#fff] text-[14px]" style={{fontWeight:fontBold}}>詳細を入力</span>
                </div>
                <div className="flex-1 text-center py-[29px]" style={{marginTop:match_1024?'':'15px'}}>
                    <span className="py-1 px-5 bg-[#fff] rounded-[25px] font-medium text-[14px]" style={selectTab > 1 ? {color: selectColor, fontWeight:fontBold}: {color: unselectColor, fontWeight:fontBold} }>STEP3</span>
                    <span className="px-3 text-[#fff] text-[14px]">完了</span>
                </div>
            </div>
            <div className="flex flex-col w-[83%] rounded-[25px] bg-[#FFFFFF] py-[70px] my-[90px]" style={{boxShadow: "0px 0px 15px 1px #EE7D90", }}>
                {selectTab === 0 ? <Step1 elements={cardData} space={4} /> : selectTab === 1? <Step2 /> : selectTab === 2 ? <Step3 data = { creatorInfo } /> : <Step4 />}
            </div>
        </div>
        </>
    );
}

const creatorData = {
    avatar: staticFiles.images.avatar,
    email: '@hikarusannnouragawa',
    description: 'ひかる社長の密着日記',
    follower: 12345678,
    heart: 3900000,
}

const IntroComponent: React.FC<{ data: any; }> = ({ data }) => {
    const selectTab = useSelector((state:any) => state.creator.step);
    const match_768 = useMediaQuery('(min-width:768px)');
    const match_1024 = useMediaQuery('(min-width:1025px)');
    console.log('data - ', data);
    const [ creator, setCreator ] = useState<any>(null);
    useEffect(() => {
        if(data._id !== undefined) setCreator(data);
    },[data._id])
    return(
        <>
        { creator && creator?._id && (
              <div className="px-[2vw]">
              <p className="text-[28px] text-[#001219] mt-[20px]" style={{letterSpacing:'-4px', fontWeight:fontBold}}>クリエイター指名</p>
              <p className="text-[16px] text-[#511523]" style={{letterSpacing:'-1px', fontWeight:fontBold}}>インフルエンサーを指名して依頼する</p>
              {selectTab < 2 ? (    
              <div className="flex flex-row items-center w-full justify-center">
                  <div className="flex flex-col w-[60%] mt-[137px]">
                      <div className="flex flex-row">
                          <span className="w-[12px] h-[36px] rounded-[20px] bg-[#F6D7CF]"></span>
                          <label className="text-[22px] text-[#001219] mx-[14px] mb-[23px]" style={{fontWeight:fontBold}}>依頼したいインフルエンサー</label>
                      </div>
                      <div className="flex" style={{whiteSpace:'nowrap', flexDirection:match_1024?'row':'column'}}>
                          <div className="flex flex-row">
                              <img src = {`${API}/api/avatar/${creator._id}`} className="w-[71px] h-[71px]" style={{borderRadius:'10px'}}/>
                              <div className="flex flex-col justify-center ml-[22px]">
                                  <label className="text-[#838688] text-[14px]">{creator.email}</label>
                                  <label className="text-[#001219] text-[26px]" style={{fontWeight:fontBold}}>{creator.username}</label>
                              </div>
                          </div>
                          <div className="flex flex-row mb-[10px] items-center" style={{marginLeft:match_1024?'126px':'', marginTop:'10px'}}>
                              <img src={staticFiles.icons.ic_user_plus_brown} className="w-[28px] h-[25px]" />
                              <label className="text-[#511523] text-[18px] mx-[10px]" style={{letterSpacing:'-3px'}}>総フォロワー数 {creator.follower.length.toLocaleString()}人</label>
                              <img src={staticFiles.icons.ic_heart} className="w-[25px] h-[25px] ml-[84px]" />
                              <label className="text-[#511523] text-[18px] ml-[5px]">総いいね数 {NumberFormatExample(creator.heart.length)}</label>
                          </div>
                      </div>
                  </div>
              </div>
              ): null
              }
          </div>    
        )}
        
        </>
    )
}

const Step1: React.FC<{
    elements: CardElement[];
    space: number;
  }> = ({ elements, space }) => {
    const match_768 = useMediaQuery('(min-width:768px)');
    const selectTab = useSelector((state:any) => state.creator.step);
    const dispatch = useDispatch();
    const handleNext = (e:any)=>{
        
        // dispatch(setCategory({category:e.target.value}));
    }
   
    return(
        <>
            <div className="flex flex-row mb-[55px] ml-[75px]">
                <div className="h-[63px] w-[14px] rounded-[50px] bg-[#F6D7CF]"></div>
                <div className="flex flex-col justify-center mt-[2px] px-[15px]">
                    <p className="text-[14px]">STEP1</p>
                    <p style={{fontWeight:fontBold, fontSize:match_768?fontSize30:fontSize20}}>依頼したいジャンルを選んで下さい</p>
                </div>
            </div>
            <div className={`${match_768 ? "flex-row" : "flex-col"} flex mx-10 justify-evenly items-center `}>
                <Grid container spacing={space} className='justify-center'>
                {elements.map((el, index) => (
                    <Grid item xs="auto" key={el.imagePath} > 
                    <div className={` w-[318px] bg-cover bg-center justify-between card-aspect rounded-[20px] card-padding`} style={{backgroundImage: `url(${el.imagePath})`}}>
                        <div className="card-content p-5">
                        <label className="font-m1c text-[18px] font-medium" style={{fontWeight:fontBold}}>{el.name}</label>
                        <p className="mt-1 text-[12px]">{el.description}</p>
                        <button onClick={() => {
                            dispatch(setStep({step:1})); 
                            dispatch(setCategory({title:el.name, description:el.description, category:el.imagePath}));
                            }} className="w-full h-[41px] mt-4 rounded-[27px] btn-color"
                            style={{fontWeight:fontBold}}
                            >{el.buttonName}</button>
                        </div>
                    </div>
                    </Grid>
                ))
                }
                </Grid>
            </div>
        </>
    );
}


const Step2 : React.FC<{}> = () => {
    const match_768 = useMediaQuery('(min-width:768px)');
    const match_1024 = useMediaQuery('(min-width:1025px)');
    const [ question1, setQuestion1 ] = useState<string>(useSelector((state:any) => state.creator.question1));
    const [ question2, setQuestion2 ] = useState<string>(useSelector((state:any) => state.creator.question2));
    const [ question3, setQuestion3 ] = useState<number>(useSelector((state:any) => state.creator.question3));
    const [ clicked, setClicked ] = useState<number>(useSelector((state:any) => state.creator.question2_chk));
    const [ isHovered1, setIsHovered1 ] = useState<number>(-1);
    const [ isHovered2, setIsHovered2 ] = useState<number>(-1);
    const dispatch = useDispatch();
    const handleNext = () => {
        dispatch(setStep({step:2}));
        const val = {
            question1: question1,
            question2: question2,
            question2_chk: clicked,
            question3: question3
        }
        console.log(val);
        dispatch(setQuestion(val));
    }
    const handlePrev = () => {
        dispatch(setStep({step:0}));
    }
    const handleMouseLeave1 = () => {
        setIsHovered1(-1);
    };
    const handleMouseLeave2 = () => {
        setIsHovered2(-1);
    };
    const help1 = '宣伝やレビューなどをしてもらいたい@@@内容を入力してください。@@@(URLがある場合はURLもご記入ください';
    const help2 = 'インフルエンサーが撮影した動画はどのよ@@@うに使いたいですか？@@@目的に応じてミルコマがサポートします。';
    const help3 = '納期を選択できます。@@@内容によってご希望に添えない場合があり@@@ますのでご了承ください。';
    
    useEffect(()=>{

    },[])
    return (
        <>
        <img className="w-[250px]" src={staticFiles.images.ellipse_step} style={{position:"absolute", marginTop:"-70px", borderLeft:"25px",}} />
        <div className="flex flex-row mb-[25px] ml-[75px]" style={{zIndex:2, flexDirection:match_1024?'row':'column'}}>
            <div className="flex flex-row w-[65%]" style={{width:match_1024?'65%':'100%'}}>
                <div className="h-[63px] w-[14px] rounded-[50px] bg-[#F6D7CF]"></div>
                <div className="flex flex-col justify-center mt-[2px] px-[15px] ">
                    <p className="text-[14px]">STEP2</p>
                    <p className="text-[28px]" style={{fontWeight:fontBold}}>詳細を入力して下さい(Q&A)</p>
                </div>
            </div>
            <div className="flex flex-col px-5 text-[24px] pt-[8px]">
                <p className="py-5">選択中のジャンル: <span style={{fontWeight:fontBold}}>商品紹介</span></p>
            </div>
        </div>
        <p className="mb-[40px] ml-[75px] text-[18px] text-[#554744] z-[2]">質問に答えて、詳細を入力してください</p>
        <p className="flex items-center text-[22px] mb-[25px] ml-[75px] text-[#B9324D]">Q1: どのような商品ですか？？ <span className="bg-[#F9E5D1] text-[12px] ml-[4%] px-5 rounded-[20px]">入力</span></p>
        <div className="flex mb-[50px] ml-[75px]" style={{flexDirection:match_1024?'row':'column'}}>
            <div className="flex " style={{width:match_1024?'60%':'90%'}}>
                <TextareaAutosize
                    minRows={3} // Specify the number of rows to display
                    aria-label="Textarea" // Provide an accessible label
                    placeholder=" 例：
                    自社の美容液の紹介をしたい。新商品です。発売予定は12月1日です。
                    商品のURLはhttps://mirucoma.co.jpです。"
                    className="w-full text-[18px] rounded-[15px] p-5"
                    style={{border:"1px solid #EBEBEB"}}
                    value={question1}
                    onChange={(e)=>{setQuestion1(e.target.value)}}
                    />
            </div>
            <div className="flex flex-col text-[16px]" style={{marginTop:match_1024?'':'20px', marginLeft:match_1024?'90px':''}}>
                <div className="flex flex-row mb-[15px]">
                    <img className="w-[30px]" src = {staticFiles.icons.ic_step_help} />
                    <span className="text-[#B9324D] px-[15px]">ヘルプ</span>
                </div>
                {showSentence(help1)}
            </div>
        </div>
        <p className="flex items-center text-[22px] mb-[25px] ml-[75px] text-[#B9324D]">Q2: 動画はどのように使いたいですか？？<span className="bg-[#F9E5D1] text-[12px] ml-[5%] px-5 rounded-[20px]">選択</span></p>
        <div className="flex mb-[50px] ml-[75px]" style={{flexDirection:match_1024?'row':'column'}}>
            <div className="flex flex-col " style={{width:match_1024?'60%':'90%'}}>
                <div className="flex flex-row mb-[15px]">
                    {btn_group1.map((item) => (
                        item.id < 4 ? (
                            <Button 
                            variant="outlined"
                            size="large"
                            style={{
                                backgroundColor: clicked === item.id? '#CE6F82' : isHovered1 === item.id? '#FCF4EC' : 'white',
                                color: clicked === item.id ? 'white' : '#B9324D',
                                borderColor: '#CE6F82',
                                borderRadius: '25px',
                                marginRight: '20px',
                                width: '200px'
                            }}
                            onClick={() => {
                                item.id < 3 ? (setQuestion2(btn_group1[item.id].name)) : (setQuestion2(""))
                                setClicked(item.id);
                            }}
                            onMouseEnter={()=>{setIsHovered1(item.id)}}
                            onMouseLeave={handleMouseLeave1}
                            >
                            {item.name}
                         </Button>
                        ):(<></>)
                        
                    ))}
                </div>
                <TextField
                    placeholder="例 : 自社のHPに使いたい"
                    className="w-full text-[18px] rounded-[15px] h-[56px]"
                    style={{border:"1px solid #EBEBEB"}}
                    value={question2}
                    onChange={(e)=>{setQuestion2(e.target.value)}}
                />
            </div>
            <div className="flex flex-col text-[16px] " style={{marginTop:match_1024?'':'20px', marginLeft:match_1024?'90px':''}}>
                <div className="flex flex-row mb-[15px]">
                    <img className="w-[30px]" src = {staticFiles.icons.ic_step_help} />
                    <span className="text-[#B9324D] px-[15px]">ヘルプ</span>
                </div>
                {showSentence(help2)}
            </div>
        </div>
        <p className="flex items-center text-[22px] mb-[63px] ml-[75px] text-[#B9324D]">Q3: 納期はいつ頃が希望ですか？<span className="bg-[#F9E5D1] text-[12px] ml-[80px] px-5 rounded-[20px]">選択</span></p>
        <div className="flex mb-[70px] ml-[75px] " style={{flexDirection:match_1024?'row':'column'}}>
            <div className="flex flex-col " style={{width:match_1024?'60%':'80%'}}>
                <div className="flex flex-row ">
                    {btn_group2.map((item) => (
                        item.id < 4 ? (
                        <Button 
                            variant="outlined"
                            size="large"
                            style={{
                                backgroundColor: question3 === item.id? '#CE6F82' : isHovered2 === item.id? '#FCF4EC' : 'white',
                                color: question3 === item.id ? 'white' : '#B9324D',
                                borderColor: '#CE6F82',
                                borderRadius: '25px',
                                marginRight: '20px',
                                width: '200px',
                            }}
                            onClick={() => {
                                setQuestion3(item.id);
                            }}
                            onMouseEnter={()=>{setIsHovered2(item.id)}}
                            onMouseLeave={handleMouseLeave2}
                            >
                            {item.name}
                         </Button>) : (<></>)
                    ))}
                </div>
            </div>
            <div className="flex flex-col text-[16px]" style={{marginTop:match_1024?'-30px':'20px', marginLeft:match_1024?'90px':''}}>
                <div className="flex flex-row mb-[15px]">
                    <img className="w-[30px]" src = {staticFiles.icons.ic_step_help} />
                    <span className="text-[#B9324D] px-[15px]">ヘルプ</span>
                </div>
                {showSentence(help3)}
            </div>
        </div>
        <div className="flex flex-row ml-[75px] items-center">
            <div className="flex flex-row w-[40%]" onClick={handlePrev}>
                <img className="w-[20px] cursor-pointer" src={staticFiles.icons.ic_back} />
                <span className="cursor-pointer text-[14px] text-hover ml-[10px]" style={{fontWeight:fontBold}}>ジャンル選択へ戻る</span>
            </div>
            <button onClick={handleNext} className="btn-color w-[324px] py-2 px-5 justify-center items-center flex rounded-[30px]" style={{width:match_1024?'324px':'200px'}}>
                <img className="w-[82px]" src={staticFiles.icons.ic_back_btn} />
            </button>
        </div>
        </>
    )
}

const Step3 : React.FC<{data:any}> = ({data}) => {
    const dispatch = useDispatch();
    const question1 = useSelector((state:any) => state.creator.question1);
    const question2 = useSelector((state:any) => state.creator.question2);
    const question3 = btn_group2[useSelector((state:any) => state.creator.question3)].name;
    const category = useSelector((state:any) => state.creator);
    const [open, setOpen] = React.useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<boolean>(false);
    const [ creator, setCreator ] = useState<any>(null);
    useEffect(() => {
        if(data._id !== undefined) setCreator(data);
    },[data._id])

    const content = ""
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsHovered(false);
    };

    const handleHoverEnter = () => {
        setIsHovered(true);
    }
    const handleHoverLeave = () => {
        setIsHovered(false);
    }
    const handleNext = () => {
        dispatch(setStep({step:3}));
    }
    const handlePrev = () => {
        dispatch(setStep({step:1}));
    }
    const match_1024 = useMediaQuery('(min-width:1025px)');
    return(
        <>
        <img className="w-[250px]" src={staticFiles.images.ellipse_step} style={{position:"absolute", marginTop:"-70px", borderLeft:"25px",}} />
        <div className="flex flex-row" style={{zIndex:2}}>
            <div className="flex flex-row mb-[25px] ml-[75px] w-[65%]">
                <div className="h-[63px] w-[14px] rounded-[50px] bg-[#F6D7CF]"></div>
                <div className="flex flex-col justify-center mt-[2px] px-[15px]">
                    <p className="text-[14px]">STEP3</p>
                    <p className="text-[28px]" style={{fontWeight:fontBold}}>確認・お申し込み</p>
                </div>
            </div>
        </div>
        <p className="text-[18px] text-[#554744] ml-[75px]">入力内容を確認の上、「完了」ボタンをクリックしてください。</p>
        
        <div className="flex flex-row items-center w-full ml-[75px] mb-[40px]">
            <div className="flex flex-col w-[60%] mt-[70px]">
                <div className="flex flex-row">
                    <label className="text-[22px] text-[#B9324D] mb-[23px]" >依頼したいインフルエンサー</label>
                </div>
                { creator && creator._id && (
                    <div className="flex " style={{whiteSpace:'nowrap', flexDirection:match_1024?'row':'column', columnGap:'280px'}}>
                    <div className="flex flex-row">
                        <img src = {`${API}/api/avatar/${creator._id}`} className="w-[71px] h-[71px]" style={{borderRadius:'10px'}}/>
                        <div className="flex flex-col justify-center ml-[22px]">
                            <label className="text-[#838688] text-[14px]">{creator.email}</label>
                            <label className="text-[#511523] text-[26px]" style={{fontWeight:fontBold}}>{creator.username}</label>
                        </div>
                    </div>
                    <div className="flex mt-[10px]" style={{flexDirection:match_1024?'row':'column', columnGap:'84px', alignItems:match_1024?'center':'', rowGap:'10px'}}>
                        <div className="flex flex-row">
                            <img src={staticFiles.icons.ic_user_plus_brown} className="w-[28px] h-[25px] "/>
                            <label className="text-[#511523] text-[18px] mx-[10px]" style={{letterSpacing:'-3px'}}>総フォロワー数 {creator.follower.length.toLocaleString()}人</label>
                        </div>
                        <div className="flex flex-row">
                            <img src={staticFiles.icons.ic_heart} className="w-[25px] h-[25px]" />
                            <label className="text-[#511523] text-[18px] ml-[5px]">総いいね数 {NumberFormatExample(creator.heart.length)}</label>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>

        <div className="flex flex-col ml-[75px]">
            <div className="flex flex-row mb-[20px]">
                <p className="text-[22px] text-[#B9324D] w-[30%]">依頼したいジャンル</p>
                <p className="text-[22px] text-[#B9324D] ">Q1.どのような商品か？</p>
            </div>
            <div className="flex" style={{flexDirection:match_1024?'row':'column'}}>
                <div className="flex" style={{flexDirection:match_1024?'column':'row', width:match_1024?'30%':'100%'}}>
                    <img className="w-[318px] rounded-[20px]" src={category.category} />
                    <div className="flex flex-col mx-5 mt-[24px] mb-[80px]">
                        <p className="text-[18px] text-[#511523] " style={{fontWeight:fontBold}}>{category.title}</p>
                        <p className="text-[12px] text-[#554744] w-[65%] mt-[6px]" style={{width:match_1024?'65%':'100%'}}>{category.description}</p>
                    </div>
                </div>
                <div className="flex flex-col" style={{width:match_1024?'60%':'87%'}}>
                    <TextareaAutosize
                        minRows={5} // Specify the number of rows to display
                        aria-label="Textarea" // Provide an accessible label
                        className="w-full text-[18px] rounded-[15px] p-5 mb-[45px]"
                        style={{border:"1px solid #EBEBEB", marginTop:match_1024?'':'20px',}}
                        value={question1}
                        readOnly = {true}
                    />
                    <p className="text-[22px] text-[#B9324D] mb-[20px]">Q2.動画をどのように追加いたいか？</p>
                    <TextField 
                        value={question2}
                        className="w-full text-[18px] rounded-[15px] h-[56px] "
                        style={{border:"1px solid #EBEBEB"}}
                        InputProps={{
                            readOnly: true,
                          }}
                    />
                    <p className="text-[22px] text-[#B9324D] mt-[45px] mb-[20px]">Q3.納期はいつ頃が希望か？</p>
                    <TextField 
                        value={question3}
                        className="w-full text-[18px] rounded-[15px] h-[56px]"
                        style={{border:"1px solid #EBEBEB"}}
                        InputProps={{
                            readOnly: true,
                          }}
                    />
                </div>
            </div>
        </div>
        <div className="flex flex-row ml-[75px] items-center" style={{marginTop:match_1024?'':'30px'}}>
            <div className="flex flex-row w-[50%]" onClick={handlePrev}>
            <img className="w-[20px] cursor-pointer" src={staticFiles.icons.ic_back} />
            <span className="cursor-pointer text-[14px] text-hover ml-[10px]" style={{fontWeight:fontBold}}>内容編集に戻る</span>
            </div>
            <button className="btn-color py-2 px-5 justify-center items-center flex rounded-[30px] text-[20px] text-[#fff]" style={{fontWeight:fontBold, width:match_1024?'324px':'200px'}} onClick={handleClickOpen}>完了</button>
        </div>
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            >
            <DialogTitle sx={{ m: 0, paddingTop: '57px', paddingLeft:'50px', fontSize: '25px', fontWeight:fontBold }} id="customized-dialog-title" className="text-[#511523]">
                お申し込みにあたっての注意事項
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 30,
                    top: 55,
                    color: (theme) => theme.palette.grey[500],
                    fontSize: '32px'
                }}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path id="Vector" d="M13.038,9l4.544-4.545a1.432,1.432,0,0,0,0-2.02L15.56.416a1.434,1.434,0,0,0-2.019,0L9,4.96,4.453.416a1.434,1.434,0,0,0-2.019,0L.417,2.435a1.432,1.432,0,0,0,0,2.02L4.96,9,.417,13.546a1.432,1.432,0,0,0,0,2.019l2.019,2.018a1.431,1.431,0,0,0,2.019,0L9,13.04l4.544,4.543a1.435,1.435,0,0,0,2.022,0l2.019-2.018a1.432,1.432,0,0,0,0-2.019Z" 
                    fill={`${isHovered?'#B9324D':'#a5a5a5'}`}/>
                </svg>
            {/* <CloseIcon sx={{ color: isHovered ? '#B9324D' : '#A5A5A5', fontSize: '30px'}}/> */}
            </IconButton>
            <DialogContent sx={{padding: '50px', marginTop:match_1024?'-25px':'', width:'802px',}}>
                <img className="w-[347px]" src = {staticFiles.images.modalBackground} style={{position:'absolute', right:0, top:200}} />
            <Typography gutterBottom className="" sx={{fontSize: "18px", marginBottom: "20px"}} >
                お申し込みにあたって、あらかじめ以下の内容をご確認ください
            </Typography>
            <Typography gutterBottom className="text-[#B9324D]" sx={{fontSize: "20px"}}>
                ①.この申し込みで、<span style={{textDecoration:'underline', fontWeight:fontBold}}>費用が発生する</span>ことは<span style={{textDecoration:'underline', fontWeight:fontBold}}>ありません</span>
            </Typography>
            <Typography gutterBottom sx={{fontSize: "16px", marginBottom: "20px"}}>
                こちらをお申し込みいただくと、ミルコマがインフルエンサーのご提案や<br />
                お見積もりをご提案させていただきます。<br />
                あくまで<span style={{color:'#B9324D', fontWeight:fontBold}}>ご提案</span>なのでお客様が決定しない限りご請求等はいたしません。<br />
                安心してご利用ください。
            </Typography>
            <Typography gutterBottom className="text-[#B9324D]" sx={{fontSize: "20px"}}>
                ②.<span style={{textDecoration:'underline', fontWeight:fontBold}}>必ず</span>依頼したい方が参加できるとは<span style={{textDecoration:'underline', fontWeight:fontBold}}>限りません</span>
            </Typography>
            <Typography gutterBottom sx={{fontSize: "16px", marginBottom: "20px"}}>
                ご指名いただいたインフルエンサーのスケジュールやご依頼内容によって、<br />
                <span style={{color:'#B9324D', textDecoration:'underline'}}>参加できない</span>場合がありますのでご了承ください<br />
            </Typography>
            <Typography gutterBottom className="text-[#B9324D]" sx={{fontSize: "20px"}}>
                ③.免責事項・ご利用条件
            </Typography>
            <Typography gutterBottom sx={{fontSize: "16px"}}>
                ミルコマの丸投げ依頼を行うにあたって、<br />
                <span style={{color:'#B9324D', textDecoration:'underline'}}>利用規約</span>と<span style={{color:'#B9324D', textDecoration:'underline'}}>プライバシーポリシー</span>にご同意ください。<br />
                ※「依頼する」ボタンを押すことで、上記の内容に同意したものとなります。
            </Typography>
            </DialogContent>
            {/* <DialogActions> */}
            <div className="flex justify-center items-center">
                <button onClick={handleNext} className="my-[40px] btn-color w-[324px] py-2 px-5 rounded-[30px] text-[20px]" style={{fontWeight:fontBold}}>依頼する</button>
            {/* </DialogActions> */}
            </div>
        </Dialog>
        </>
    )
}

const Step4 : React.FC<{}> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleHome = () => {
        navigate('/'); 
        dispatch(setInit()); 
    }
    const {userId} = useParams();
    const data = useSelector((state:any) => state.creator);
    const onSubmit = async () => {
        
        console.log("data", data);
        const formData = {
            creatorEmail:userId,
            category: data.title,
            description: data.description,
            step1: data.question1,
            step2: data.question2,
            step3: btn_group2[data.question3].name,
            status: 0,
        };
        const query = `${API}/api/insertContract`;
        try {
            const res = await axios.post(query, formData, {headers});
            if(res.status === 200){
                console.log('return' , res.data)
                toast.success(res.data.msg);
                navigate('/'); 
                dispatch(setInit()); 
              }else{
                console.log(res)
                // context.alertError(res.data.err)
            }
        } catch (error:any) {
            const result = error.response.data.msg;
            toast.error(result);
        }
    }
    const match_1024 = useMediaQuery('(min-width:1025px)');
    return(
        <>
        <img className="w-[250px]" src={staticFiles.images.ellipse_step} style={{position:"absolute", marginTop:"-70px", borderLeft:"25px",}} />
        <div className="flex flex-col ml-[75px]">
        <div className="flex flex-row " style={{zIndex:2}}>
            <div className="flex flex-row mb-[25px] w-[65%]">
                <div className="h-[63px] w-[14px] rounded-[50px] bg-[#F6D7CF]"></div>
                <div className="flex flex-col justify-center mt-[2px] px-[15px]">
                    <p className="text-[14px]">STEP3</p>
                    <p className="text-[28px]" style={{fontWeight:fontBold}}>お申し込みしました・これからの流れ</p>
                </div>
            </div>
        </div>
        <p className="text-[#554744] text-[18px]">ミルコマディレクターが最適なインフルエンサーとお見積もりを行います。</p>
        <div className="flex flex-row mt-[75px]" style={{marginLeft:match_1024?'40px':''}}>
            <div className="flex flex-col" style={{fontWeight: '400', zIndex:'1'}}>
                <p className="text-[18px] text-[#B9324D] mb-[26px]" style={{fontWeight:fontBold}}>①.メールとマイページにお知らせします</p>
                <p className="my-1 text-[#554744] text-[14px]">今後の流れは<span className="text-[#B9324D] underline" >マイページ</span>で状況を確認できます。</p>
                <p className="text-[#554744] text-[14px]">また、お知らせはマイページとメールにて行います。</p>

                <p className="text-[18px] text-[#B9324D] mb-[26px] mt-[30px]">②.ご不明点がある場合は<span className="underline" style={{fontWeight:fontBold}}>メッセージ</span>にてご質問いたします</p>
                <p className="my-1 text-[#554744] text-[14px]">ご提案にあたり、お客様のご依頼で不明点がある場合はメッセージにて</p>
                <p className="text-[#554744] text-[14px]">ご質問いたします。</p>
                <p className="text-[#554744] text-[14px]">恐縮ではありますが、その際はマイページにてご回答ください、</p>

                <p className="text-[18px] text-[#B9324D] mb-[26px] mt-[30px]">③.内容によってはお断りさせていただきます。</p>
                <p className="my-1 text-[#554744] text-[14px]">性的コンテンツや、暴力系、FXやカジノなどの内容では、</p>
                <p className="text-[#554744] text-[14px]">丸投げ依頼の利用用途によってお断りさせていただく場合があります。</p>
                <p className="text-[#554744] text-[14px]">あらかじめご了承ください</p>

            </div>
            {match_1024?(
                <div className="flex justify-center items-center px-[80px]">
                    <img src={staticFiles.images.finish} className="w-[592px]" />
                </div>):(
                <img src={staticFiles.images.finish} style={{position:'absolute', right:0, width:'400px', opacity:'0.5', marginRight:'15%'}} />
            )}
            
        </div>
            <button onClick={onSubmit} className="btn-color py-2 px-5 rounded-[30px] text-[20px]" style={{fontWeight:fontBold, width:match_1024?'324px':'200px', marginLeft:match_1024?'10%':'27%', marginTop:match_1024?'':'20px'}}>マイページへ</button>
        </div>
        </>
    )
}
