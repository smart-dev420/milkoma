import { Box, Grid, useMediaQuery } from "@mui/material"
import { fontBold, staticFiles } from "../../components/Constants"
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormatExample, showSentence } from "../../utils/appHelper";

export const CreatorDetail = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const creatorData = {
        gift: '17.Live受け取ったギフト No.1',
        avatar: staticFiles.images.avatar,
        email: '@hikarusannnouragawa',
        description: 'ひかる社長の密着日記',
        personalData: 'ひかる社長の部下です！勝手に社長の日々を載せていきます！ファンから社員になりました！（笑）@@@20代限定で転職相談受付中🥰',
        skill: ['複数商品の宣伝','動画撮影','ライブコマース配信'],
        follower: 12345678,
        heart: 3900000,
        mirucoma:'エイベックス・アーティストアカデミー大阪校出身。スクール生として千里セルシーボーカルコンテスト、ヴォーカルクイーンコンテストなどに出演して歌とダンスを披露した。ミルコマおすすめのインフルエンサーです。'
    }
    const match_768 = useMediaQuery('(min-width:768px)');
    const match_1024 = useMediaQuery('(min-width:1025px)');
    return(
        <div className="w-full mb-[115px]">
            <div className="h-[210px]"></div>
            <div className="px-[2vw]">
                <div className="flex flex-col mx-[125px]">
                <div className="flex" style={{columnGap:'75px', flexDirection:match_1024?'row':'column'}}>
                
                {/** SNS Data */}
                    <Box flex={2} className="flex flex-row bg-gradient-to-br from-[#FDF6E0] to-[#F8D8C2] rounded-[20px]" style={{boxShadow:"0px 0px 35px 5px #FCEFD9", position:'relative'}}>
                        <img src={staticFiles.images.blog} className="w-[68%] rounded-[20px]" />
                        <div className="flex flex-col items-center w-[32%] text-[19px] text-[#511523]" style={{justifyContent:'center', alignItems:'center'}}>
                            <label className="mt-[24px] mb-[30px]" style={{fontWeight:fontBold}}>動画・画像</label>
                            <GridItems sp={2} lg={6} path={staticFiles.images.blog1} sm="w-[102px] my-[5px]" />
                            <label className="mt-[179px] mb-[30px]" style={{fontWeight:fontBold}}>ジャンル</label>
                            <div className="flex flex-wrap text-[#fff] text-[15px] text-center" style={{columnGap:'5px'}}>
                                <span className="w-[96px] h-[31px] bg-[#F59ABF] rounded-[20px]" style={{fontWeight:fontBold}}>コスメ</span>
                                <span className="w-[96px] h-[31px] bg-[#E38A86] rounded-[20px]" style={{fontWeight:fontBold}}>ブログ</span>
                            </div>
                            <label className="mt-[34px]" style={{fontWeight:fontBold}}>活動しているSNS</label>
                            <div className="flex flex-wrap mt-[30px] mb-[25px]" style={{columnGap:'8px'}}>
                                <img src={staticFiles.images.youtube} className="w-[50px] h-[50px] rounded-[15px] log-shadow cursor-pointer image-hover"/>
                                <img src={staticFiles.images.seventeen} className="w-[50px] h-[50px] rounded-[15px] log-shadow cursor-pointer image-hover"/>
                                <img src={staticFiles.images.twitter} className="w-[50px] h-[50px] rounded-[15px] log-shadow cursor-pointer image-hover"/>
                                <img src={staticFiles.images.instagram} className="w-[50px] h-[50px] rounded-[15px] log-shadow cursor-pointer image-hover"/>
                            </div>
                        </div>
                    </Box>
                    <Box flex={1} className="flex flex-col mt-[120px] w-[100%]">
                        <label className="w-[356px] py-[10px] bg-gradient-to-br from-[#F4B7A5] to-[#F7CF91] text-center text-[#fff] rounded-[20px]" style={{boxShadow:"0px 0px 20px 2px #F7CD93", fontWeight:fontBold}}>
                            {creatorData.gift}
                        </label>
                        <div className="flex flex-row mt-[50px]">
                            <img src={creatorData.avatar} className="w-[65px] h-[65px]" />
                            <div className="flex flex-col ml-[20px]">
                                <label className="text-[15px] text-[#838688]">{creatorData.email}</label>
                                <label className="text-[27px] text-[#001219]" style={{fontWeight:fontBold}}>{creatorData.description}</label>
                            </div>
                        </div>
                        <div className="flex flex-row text-[19px] text-[#511523] items-center mt-[20px] mb-[26px]" style={{whiteSpace:'nowrap'}}>
                            <img src={staticFiles.icons.ic_user_plus_brown} className="w-[26px]"/>
                            <label className="px-[5px]">総フォロワー数 {creatorData.follower.toLocaleString()}人</label>
                            <img src={staticFiles.icons.ic_heart} className="w-[23px] ml-[63px] mr-[5px]" />
                            <label>総いいね数 {NumberFormatExample(creatorData.heart)}</label>
                        </div>
                        <div className="text-[#511523] text-[18px] w-[534px]">
                           {showSentence(creatorData.personalData)}
                        </div>
                        <label className="text-[19px] text-[#511523] mt-[29px] mb-[11px] ml-[20px]" style={{fontWeight:fontBold}}>できること・特殊な依頼</label>
                        <div className="flex flex-row text-[#554744] text-[14px]" style={{columnGap:'15px', whiteSpace:'nowrap'}}>
                            {creatorData.skill.map((item, index) => (
                                <label className="bg-[#fff] px-[20px] py-[5px] rounded-[20px]" style={{border:'1px solid #554744'}}>{item}</label>
                            ))}
                        </div>
                        <div className="flex flex-row rounded-[20px] bg-[#fff] items-center w-[219px] h-[38px] mt-[30px]" style={{border:'1px solid #EBE4DC', zIndex:2}}>
                            <img className="w-[25px] ml-[14px]" src={staticFiles.images.footer} />
                            <label className="text-[#511523] text-[18px]">ミルコマチョイス！</label>
                        </div>
                        <div className="rounded-[20px] w-[100%] bg-[#fff] pt-[34px] pb-[10px] px-[23px] text-[#511523] text-[18px]" style={{border:'1px solid #EBE4DC', marginTop:'-20px'}}>
                        総フォロワー数 {creatorData.follower.toLocaleString()}人！
                        {creatorData.mirucoma}
                        </div>
                        <div className="flex flex-row justify-center items-center mt-[79px]">
                            <button
                                className="font-m1c hover:bg-[#E28E9C]/[1] bg-[#EE7D90] text-[19px] h-[41px] rounded-[50px] text-white px-[30px] "
                                onClick={() => navigate(`/creator/step/${userId}`)}
                                style={{boxShadow:"0px 0px 3px 2px #EE7D90", fontWeight:fontBold, whiteSpace:'nowrap'}}
                                >
                                    この人に依頼したい
                            </button>
                        </div>
                        
                    </Box>
                </div>
                <p className="mt-[90px] mb-[52px] text-[#001219] text-[30px]" style={{fontWeight:fontBold}}>ミルコマで出した広告動画</p>
                </div>
            </div>
            <GridItems sp={6} lg={8} path={staticFiles.images.blog} sm="w-[298px] mx-[40px] my-[10px]" />
        </div>
    )
}

const GridItems:React.FC<{sp:number, lg:number, path:string, sm: string}> = ({sp, lg, path, sm}) => {
    return(
        <>
        <Grid container spacing={sp} className='justify-center items-center'>
        {
        Array.from({ length: lg }).map((_, i) => (
            <Grid item xs="auto" key={i}>
            <img src={path} className={`${sm} rounded-[20px] cursor-pointer image-hover`} style={{ background: "white" }}  alt={`Image ${i}`} />
            </Grid>
        ))
        }
    </Grid>
    </>
    )
}
