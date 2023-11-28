import { Badge, Box, Button, CardMedia, Container, InputAdornment, Stack, TextField, TextareaAutosize, Typography } from "@mui/material"
import { btnBackground, btnBackgroundHover, fontBold, staticFiles } from "../../components/Constants"
import { useRef, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { API } from "../../axios";
import { headers } from "../../utils/appHelper";

interface Profile {
    avatar: string;
    username: string;
    company: string;
    role: string;
    liveAccount: string;
    youtubeAccount: string;
    tiktokAccount: string;
    instagramAccount: string;
    description: string;
    skills: string[]; 
  }

interface IFile {
    url: string,
    name: string,
}

export const Profile = () =>{
    const [ file, setFile ] = useState(null);
    const [ skill, setSkill ] = useState('');
    const [ profile, setProfile ] = useState<Profile>({
        avatar: '',
        username: 'asdf',
        company: '',
        role: '',
        liveAccount: '',
        youtubeAccount: '',
        tiktokAccount: '',
        instagramAccount: '',
        description: '',
        skills: [],
    });

    /** Avatar Upload */
    const [ fileName, setFileName ] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        fileInputRef.current?.click();
      };
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        // Handle the selected file here
        if(file){
            setFileName(file);
            console.log(file);
        }
      };


    /** Verification Document Upload */
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const fileUpload = async () => {
       if(currentFile){
        let formData = new FormData();
        formData.append("file", currentFile);
        console.log(currentFile);

        const query = `${API}/api/uploadVerify`;
        try{
            const res = await axios.post(query, formData, {headers});
            if(res.status === 200 ){
                console.log('return', res.data)
            }else{
                console.log(res)
            }
        }
        catch(error:any){
            const result = error.response.data.msg;
        }
        }
      };

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
      };

    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" spacing={2} sx={{paddingX:'50px'}}>
            <Typography sx={{fontSize:'25px', fontWeight:fontBold, color:'#511523'}}>プロフィール</Typography>
                <Box display='flex' flexDirection='row' sx={{columnGap:'100px', position:'relative', }}>
                
                {/** Personal Data */}
                    <Box display='flex' flexDirection='column' sx={{rowGap:'20px', width:'40%'}}>
                        <Typography sx={{fontSize:'18px', fontWeight:fontBold}}>アバター</Typography>
                        <Box display='flex' flexDirection='row' sx={{alignItems:'end', columnGap:'20px'}}>
                            <CardMedia 
                                component="img"
                                sx={{width:'200px', height:'200px'}}
                                image = {fileName? URL.createObjectURL(fileName):staticFiles.images.profile}/>
                            <input
                                ref={fileInputRef}
                                type="file"
                                style={{ display: 'none' }}
                                accept=".png, .jpg, .jpeg, .ico, .svg"
                                onChange={handleFileChange}
                            />                    
                            <Button
                                size="medium"
                                sx={{
                                    backgroundColor:btnBackground, 
                                    borderRadius:'36px', 
                                    width:'130px',
                                    height:'35px',
                                    color: '#FFFFFF',
                                    fontWeight:fontBold,
                                    "&:hover": {
                                        backgroundColor: btnBackgroundHover
                                    },
                                    }}
                                    onClick={handleButtonClick}
                                >
                                アップロード
                            </Button>
                            <Button
                                size="medium"
                                sx={{
                                    backgroundColor:'#FFF', 
                                    borderRadius:'36px', 
                                    width:'130px', color:'#000000',
                                    border:'2px solid rgba(0,0,0,0.1)',
                                    height:'35px',
                                    fontWeight:fontBold,
                                    "&:hover": {
                                        backgroundColor: '#FCF4F4'
                                    },
                                    }}
                                onClick={()=>{setFileName(null)}}>
                                取り除く
                            </Button>
                        </Box>
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>ユーザー名: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="ユーザー名"
                                value={profile.username}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'16px',}}
                                onChange={(e)=>{setProfile({...profile, username:e.target.value})}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <PersonIcon />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>   
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>会社名: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="会社名"
                                value={profile.company}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'16px',}}
                                onChange={(e)=>{setProfile({...profile, company:e.target.value})}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <BusinessIcon />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>  
                        <Box display='flex' flexDirection='row' justifyContent='start' sx={{columnGap:'150px'}}>
                            <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'start', width:'50%'}}>
                                <Typography sx={{fontSize:'18px', whiteSpace:'nowrap'}}>本人確認書類: </Typography>
                                <label className="btn btn-default p-0 ">
                                    <input type="file" onChange={selectFile} />
                                </label>
                            </Box>
                            <Button
                                size="medium"
                                sx={{
                                    backgroundColor:btnBackground, 
                                    borderRadius:'36px', 
                                    paddingX:'30px',
                                    height:'35px',
                                    color: '#FFFFFF',
                                    fontWeight:fontBold,
                                    whiteSpace:'nowrap',
                                    "&:hover": {
                                        backgroundColor: btnBackgroundHover
                                    },
                                    }}
                                disabled={!currentFile}
                                onClick={fileUpload}
                                >
                                    アップロード
                                </Button>
                        </Box>
                    </Box>
                
                {/** Social Network and Skils  */}
                    <Box display='flex' flexDirection='column' sx={{width:'40%', rowGap:'20px'}}>
                    {/** SNS */}
                    <Box display='flex' flexDirection='column' sx={{rowGap:'20px', padding:'20px', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'10px'}}>
                        <Typography sx={{paddingX:'10px', fontSize:'18px', fontWeight:fontBold, marginBottom:'20px', marginTop:'-32px', backgroundColor:'#FFF', width:'fit-content'}}> SNS </Typography>
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>17.Live: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="17.Live"
                                value={profile.liveAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'16px',}}
                                onChange={(e)=>{setProfile({...profile, liveAccount:e.target.value})}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_item} />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>  
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>Youtube: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Youtube"
                                value={profile.youtubeAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'16px',}}
                                onChange={(e)=>{setProfile({...profile, youtubeAccount:e.target.value})}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_youtube2} />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>  
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>TikTok: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Tiktok"
                                value={profile.tiktokAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'16px',}}
                                onChange={(e)=>{setProfile({...profile, tiktokAccount:e.target.value})}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_tiktok} />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </Box> 
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>Instagram: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Instagram"
                                value={profile.instagramAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'16px',}}
                                onChange={(e)=>{setProfile({...profile, instagramAccount:e.target.value})}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_instagram} />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </Box> 
                        <Box display='flex' flexDirection='row' justifyContent='end'>
                            <Button size="medium"
                                sx={{
                                    backgroundColor:btnBackground, 
                                    borderRadius:'36px', 
                                    width:'30%',
                                    height:'35px',
                                    color: '#FFFFFF',
                                    fontWeight:fontBold,
                                    "&:hover": {
                                        backgroundColor: btnBackgroundHover
                                    },
                                    }}
                                >セーブ</Button>
                        </Box>
                    </Box>
                    {/** Skills */}
                    <Box display='flex' flexDirection='column' sx={{rowGap:'20px', padding:'20px', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'10px', marginTop:'20px'}}>
                        <Typography sx={{paddingX:'10px', fontSize:'18px', fontWeight:fontBold, marginTop:'-32px', backgroundColor:'#FFF', width:'fit-content'}}>スキル</Typography>
                        <Box display='flex' flexDirection='column' sx={{columnGap:'10px', justifyContent:'center', rowGap:'10px'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>私自身の紹介</Typography>
                            <TextareaAutosize 
                                value={profile.description}
                                onChange={(e)=>{setProfile({...profile, description:e.target.value})}}
                                style={{width:'100%', border:'1px solid rgba(0,0,0,0.1)', padding:'10px 20px 10px 20px', }}
                                minRows={3}
                                />
                         </Box> 
                         <Box display='flex' flexDirection='row' flexWrap='wrap' sx={{columnGap:'10px', rowGap:'5px', marginTop:'10px'}}>
                            {profile.skills.map((skill, index) => (
                                <>
                                <Box sx={{backgroundColor:'#F59ABF', borderRadius:'30px', paddingX:'10px', paddingY:'5px'}}>
                                    {skill}
                                </Box>
                                <span 
                                    style={{marginTop:'-10px', marginLeft:'-22px', height:'20px', cursor:'pointer'}}
                                    onClick={() => {
                                        const newSkills = [...profile.skills]; 
                                        newSkills.splice(index, 1); 
                                        setProfile((prevProfile) => {
                                          return {...prevProfile, skills: newSkills};
                                        });
                                      }}
                                >
                                    <CloseIcon sx={{ 
                                        color: '#000', fontSize: '20px', fontWeight:fontBold, backgroundColor:'#FAEAD1', borderRadius:'20px',
                                        "&:hover": {
                                            color: '#B9324D',
                                            backgroundColor:'rgba(255,255,255,0.5)',
                                        },
                                        }}/>
                                </span>
                            </>
                            ))}
                        </Box>
                         <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'16px', fontWeight:fontBold, whiteSpace:'nowrap'}}>スキル: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="スキル"
                                value={skill}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'16px',}}
                                onChange={(e)=>{setSkill(e.target.value)}}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setProfile((prevProfile) => {
                                            const newSkills = [...prevProfile.skills, skill];
                                            return { ...prevProfile, skills: newSkills };
                                          });
                                        setSkill('');
                                    }
                                  }}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        
                        <Box display='flex' flexDirection='row' justifyContent='end'>
                            <Button size="medium"
                                sx={{
                                    backgroundColor:btnBackground, 
                                    borderRadius:'36px', 
                                    width:'30%',
                                    height:'35px',
                                    color: '#FFFFFF',
                                    fontWeight:fontBold,
                                    "&:hover": {
                                        backgroundColor: btnBackgroundHover
                                    },
                                    }}
                                >セーブ</Button>
                        </Box>
                    </Box>     
                </Box>

                </Box>
            </Stack>
        </Container>
    )
}