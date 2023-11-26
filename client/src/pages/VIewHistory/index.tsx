import { Button, Grid, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { staticFiles } from "../../components/Constants";

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
    const navigate = useNavigate();
    const [ selectId, setSelectId ] = useState<string>("");
    const [ page, setPage ] = useState(8);
    
    const existingArrayString = sessionStorage.getItem('searchValue');
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
            return false;
          }
          if(existingArray.length >= 5){
              existingArray.shift();
          }
          existingArray.push(newValue);
          setSearchValue(existingArray);
          const updatedArrayString = JSON.stringify(existingArray);
          sessionStorage.setItem('searchValue', updatedArrayString);
        }
      };
    return(
        <>
            <div className="bg-gradient-to-br from-[#FAEAD1] to-[#F5D0E9] w-full h-[480px]" style={{position:'absolute', top:-120, left:0, filter:'blur(10px)', zIndex:-10}}></div>
            <div className="w-full">
                <div className="h-[220px]"></div>
                <div className="px-[2vw]">
                    <p className="text-[30px] text-[#001219] mt-[20px]" style={{letterSpacing:'-2px'}}>閲覧履歴</p>
                    <p className="text-[19px] text-[#511523]" style={{letterSpacing:'-1px'}}>閲覧したことのあるインフルエンサー</p>
                    <div className="flex flex-col mt-[85px] items-center">
                        <div className="flex flex-row justify-center">
                            <span className="text-[25px] text-[#511523] w-[200px]" style={{letterSpacing:'-2px'}}>キーワード検索</span>
                            <div className="flex flex-col w-[925px]">
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
                                <div className="flex flex-row px-[20px] pt-[20px]">
                                    <span className="mr-[5px] text-[16px] text-[#554744]" style={{whiteSpace:'nowrap'}}>最近の検索</span>
                                    {
                                        searchValue.map((item:any, index:number) => (
                                            <button className="border rounded-[20px] mx-[5px] px-[15px] text-[14px] text-[#554744]" key={index}>{item}</button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full px-[75px] mt-[40px] items-center mt-[80px] mb-[60px]">
                            <label className="text-[25px] text-[#511523] w-[35%]">登録インフルエンサー</label>
                            <label className="text-[18px] text-[#511523] px-[10px]" style={{whiteSpace:"nowrap"}}>並び替え</label>
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
                                marginRight: '20px',
                                width: '207px',
                                fontSize: '18px',
                                height: '44px',
                                whiteSpace:'nowrap'
                            }}
                            onClick={() => {
                                setSelect1(item.id);
                            }}
                            onMouseEnter={()=>{setIsHovered1(item.id)}}
                            onMouseLeave={handleMouseLeave1}
                            >
                            {item.name}
                         </Button>) : (<></>)
                    ))}                            
                    </div>
                        <GridComponent count={page}/>
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

const GridComponent: React.FC<{ count: number }> = ({ count }) => {
    const navigate = useNavigate();
    return (
      <Grid container spacing={5} className='justify-center items-center'>
        {Array.from({ length: count }).map((_, i) => (
          <Grid item xs='auto' key={i}>
            <div className="w-[361px] card-hover my-[15px] cursor-pointer" onClick={() => {navigate('')}}>
            <div className="flex flex-col px-[20px] py-[30px]">
            <div className="flex flex-row ">
                <img src={staticFiles.images.model} className="rounded-[25px] w-[100px]"/>
                <div className="flex flex-col pl-[10px]">
                    <span className="mt-[30px] w-[96px] h-[31px] text-[#fff] text-[15px] bg-[#F59ABF] rounded-[20px] text-center">コスメ</span>
                    <div className="flex flex-row mt-[10px]">
                        <img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.youtube} />
                        <img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.seventeen} />
                        <img className="w-[34px] h-[34px] mx-[5px] item-shadow rounded-[10px]" src={staticFiles.images.twitter} />
                        <img className="w-[34px] h-[34px] item-shadow rounded-[10px]" src={staticFiles.images.instagram} />
                    </div>
                </div>
            </div>
            <span className="mt-[30px] text-[#511523] text-[27px]" style={{letterSpacing:'-4px'}}>なまえ なまえ なまえ</span>
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