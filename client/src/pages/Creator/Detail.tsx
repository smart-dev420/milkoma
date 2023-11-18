import { Grid } from "@mui/material"
import { fontBold, staticFiles } from "../../components/Constants"
import { useNavigate } from "react-router-dom";

export const CreatorDetail = () => {
    const navigate = useNavigate();
    return(
        <div className="w-full mb-[115px]">
            <div className="h-[210px]"></div>
            <div className="px-[2vw]">
                <div className="flex flex-col mx-[125px]">
                <div className="flex flex-row">
                    <div className="flex flex-row bg-gradient-to-br from-[#FDF6E0] to-[#F8D8C2] w-[917px] rounded-[20px]" style={{boxShadow:"0px 0px 35px 5px #FCEFD9"}}>
                        <img src={staticFiles.images.blog} className="w-[611px] rounded-[20px]" />
                        <div className="flex flex-col items-center w-full text-[19px] text-[#511523]">
                            <label className="mt-[24px] mb-[30px]" style={{fontWeight:fontBold}}>動画・画像</label>
                            <GridItems sp={2} lg={6} path={staticFiles.images.blog1} sm="w-[102px] my-[5px]" />
                            <label className="mt-[179px] mb-[30px]" style={{fontWeight:fontBold}}>ジャンル</label>
                            <div className="flex flex-row text-[#fff] text-[15px] text-center">
                                <span className="w-[96px] h-[31px] bg-[#F59ABF] rounded-[20px] mr-[5px]" style={{fontWeight:fontBold}}>コスメ</span>
                                <span className="w-[96px] h-[31px] bg-[#E38A86] rounded-[20px]" style={{fontWeight:fontBold}}>ブログ</span>
                            </div>
                            <label className="mt-[34px]" style={{fontWeight:fontBold}}>活動しているSNS</label>
                            <div className="flex flex-row mt-[30px] mb-[25px]">
                                <img src={staticFiles.images.youtube} className="w-[50px] h-[50px] mx-[4px] rounded-[8px] log-shadow"/>
                                <img src={staticFiles.images.seventeen} className="w-[50px] h-[50px] mx-[4px] rounded-[8px] log-shadow"/>
                                <img src={staticFiles.images.twitter} className="w-[50px] h-[50px] mx-[4px] rounded-[8px] log-shadow"/>
                                <img src={staticFiles.images.instagram} className="w-[50px] h-[50px] mx-[4px] rounded-[8px] log-shadow"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-[75px] mt-[120px] ">
                        <label className="w-[356px] py-[10px] bg-gradient-to-br from-[#F4B7A5] to-[#F7CF91] text-center text-[#fff] rounded-[20px]" style={{boxShadow:"0px 0px 20px 2px #F7CD93", fontWeight:fontBold}}>
                            17.Live受け取ったギフト No.1
                        </label>
                        <div className="flex flex-row mt-[50px]">
                            <img src={staticFiles.images.avatar} className="w-[65px]" />
                            <div className="flex flex-col ml-[20px]">
                                <label className="text-[15px] text-[#838688]">@hikarusannnouragawa</label>
                                <label className="text-[27px] text-[#001219]" style={{fontWeight:fontBold}}>ひかる社長の密着日記 </label>
                            </div>
                        </div>
                        <div className="flex flex-row text-[19px] text-[#511523] items-center mt-[20px] mb-[26px]">
                            <img src={staticFiles.icons.ic_user_plus} className="w-[26px]"/>
                            <label className="px-[5px]">総フォロワー数 12,345,678人</label>
                            <img src={staticFiles.icons.ic_heart} className="w-[23px] ml-[63px] mr-[5px]" />
                            <label>総いいね数 3.9M</label>
                        </div>
                        <div className="text-[#511523] text-[18px] w-[534px]">
                            <p>
                                ひかる社長の部下です！勝手に社長の日々を載せていきます！ファンから社員になりました！（笑）
                            </p>
                            <p>
                                20代限定で転職相談受付中🥰
                            </p>
                        </div>
                        <label className="text-[19px] text-[#511523] mt-[29px] mb-[11px] ml-[20px]" style={{fontWeight:fontBold}}>できること・特殊な依頼</label>
                        <div className="flex flex-row text-[#554744] text-[14px]">
                            <label className="bg-[#fff] px-[20px] py-[5px] rounded-[20px]" style={{border:'1px solid #554744'}}>複数商品の宣伝</label>
                            <label className="bg-[#fff] px-[20px] py-[5px] rounded-[20px] mx-[15px]" style={{border:'1px solid #554744'}}>動画撮影</label>
                            <label className="bg-[#fff] px-[20px] py-[5px] rounded-[20px]" style={{border:'1px solid #554744'}}>ライブコマース配信</label>
                        </div>
                        <div className="flex flex-row rounded-[20px] bg-[#fff] items-center w-[219px] h-[38px] mt-[30px]" style={{border:'1px solid #EBE4DC', zIndex:10}}>
                            <img className="w-[25px] ml-[14px]" src={staticFiles.images.footer} />
                            <label className="text-[#511523] text-[18px]">ミルコマチョイス！</label>
                        </div>
                        <div className="rounded-[20px] w-[580px] h-[162px] bg-[#fff] pt-[30px] px-[15px] text-[#511523] text-[18px]" style={{border:'1px solid #EBE4DC', marginTop:'-20px'}}>
                        総フォロワー数 116,900人！エイベックス・アーティストアカデミー大阪校出身。スクール生として千里セルシーボーカルコンテスト、ヴォーカルクイーンコンテストなどに出演して歌とダンスを披露した。ミルコマおすすめのインフルエンサーです。
                        </div>
                        <div className="flex flex-row justify-center items-center mt-[79px]">
                            <button
                                className="font-m1c hover:bg-[#E28E9C]/[1] bg-[#EE7D90] text-[19px] h-[41px] rounded-[50px] text-white px-[30px] "
                                onClick={() => navigate('/creator/step')}
                                style={{boxShadow:"0px 0px 3px 2px #EE7D90", fontWeight:fontBold, whiteSpace:'nowrap'}}
                                >この人に依頼したい
                            </button>
                        </div>
                        
                    </div>
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
