import { Badge, Box, Button, CardMedia, Container, InputAdornment, Stack, TextField, TextareaAutosize, Typography } from "@mui/material"
import { btnBackground, btnBackgroundHover, fontBold, staticFiles } from "../../components/Constants"
import { useEffect, useRef, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { API } from "../../axios";
import { headers } from "../../utils/appHelper";
import { toast } from "react-toastify";
import { error } from "console";
import { useDispatch } from "react-redux";
import { setPage } from "../../slices/page";

interface Profile {
    avatar:string;
    username: string;
    company: string;
    role: string;
    liveAccount: string;
    youtubeAccount: string;
    tiktokAccount: string;
    instagramAccount: string;
    twitterAccount: string;
    description: string;
    skills: string[]; 
  }

interface IFile {
    url: string,
    name: string,
}

export const Profile = () =>{
    
    const getProfile = async () => { 
        const res = await axios.post(`${API}/api/getUserProfile`, {}, {headers});
        setProfile(res.data);
    }
    const dispatch = useDispatch();
    dispatch(setPage({page:6}));
    const [ file, setFile ] = useState(null);
    const [ skill, setSkill ] = useState('');
    const [ profile, setProfile ] = useState<Profile>({
        avatar:'',
        username: '',
        company: '',
        role: '',
        liveAccount: '',
        youtubeAccount: '',
        tiktokAccount: '',
        instagramAccount: '',
        twitterAccount: '',
        description: '',
        skills: [],
    });
    const sessionData = sessionStorage.getItem('user');
    const userData = sessionData? JSON.parse(sessionData) : null;
    useEffect(() =>{
        getProfile();
    },[]);

    /** Avatar and Basic Data */
    const [ avatar, setAvatar ] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        fileInputRef.current?.click();
      };
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        // Handle the selected file here
        if(file){
            setAvatar(file);
            setProfile({...profile, avatar:file.name});
        }
      };

    const handleBasicDataSubmit = async () =>{
        let formData = new FormData();
        if(avatar){
            formData.append('avatar', avatar);
        }
        console.log('userData - ', profile);
        if(profile.username === '' || profile.company === ''){
            toast.error('すべてのフィールドを挿入する必要があります。');
            return;
        }
        formData.append('id', userData.id);
        formData.append('username', profile.username);
        formData.append('company', profile.company);
        const query = `${API}/auth/updateProfile`;
        try{
            const res = await axios.post(query, formData, {headers});
            if(res.status === 200){
                toast.success(res.data.msg);
            }else{
                toast.error(res.data.msg);
            }
        }catch(error){
            console.log(error);
        }
    }

    /** Verification Document Upload */
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const fileUpload = async () => {
       if(currentFile){
        let formData = new FormData();
        formData.append("file", currentFile);
        const query = `${API}/auth/uploadVerify/${userData.id}`;
        try{
            const res = await axios.post(query, formData, {headers});
            if(res.status === 200 ){
                console.log('return', res.data);
                toast.success(res.data.msg);
            }else{
                console.log(res)
                toast.error(res.data.msg);
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

    /** Reset Password */
    const [ showState1, setShowState1 ] = useState(true);
    const [ showState2, setShowState2 ] = useState(true);
    const [ password, setPassword ] = useState({
        pswd1:'',
        pswd2:''
    });

    const handleResetPassword = async() => {
        const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        if(!password.pswd1 || !password.pswd2){
            toast.error('パスワードを入力する必要があります');
            return;
        } else if(!password.pswd1.match(regExp) || !password.pswd2.match(regExp)){
            toast.error('有効なパスワードを入力して下さい。 大文字 1 つ、小文字 1 つ、特殊文字 1 つ、スペースなし');
            return;
        } else if(password.pswd1 !== password.pswd2){
            toast.error('パスワードは一致する必要があります');
            return;
        }
        let formData = new FormData();
        formData.append('password', password.pswd1);
        const query = `${API}/auth/changePassword/${userData.email}`;
        try {
            const res = await axios.post(query, formData, {headers});
            if(res.status === 200){
                toast.success("パスワードの変更が成功しました!");
              }else{
                console.log(res.status);
            }
        } catch (error:any) {
            const result = error.response.data.msg;
            toast.error(result);
        }  
    }

    /** Update SNS Data */
    const handleUpdateSNS = async () => {
        let formData = new FormData();
        if(!profile.liveAccount || !profile.youtubeAccount || !profile.tiktokAccount || !profile.instagramAccount || !profile.twitterAccount){
            toast.error('すべてのSNSデータを挿入する必要があります。');
            return;
        }
        formData.append('id', userData.id);
        formData.append('liveAccount', profile.liveAccount);
        formData.append('youtubeAccount', profile.youtubeAccount);
        formData.append('tiktokAccount', profile.tiktokAccount);
        formData.append('instagramAccount', profile.instagramAccount);
        formData.append('twitterAccount', profile.twitterAccount);
        const query = `${API}/auth/changeSNS`;
        try{
            const res = await axios.post(query, formData, {headers});
            if(res.status === 200){
                toast.success(res.data.msg);
            }else{
                console.log(res.status);
            }
        }catch(err){
            console.error(err);
        }
    }

    /** Update Skills */
    const handleUpdateSkill = async () => {
        let formData = new FormData();
        formData.append('id', userData.id);
        formData.append('detail', profile.description);
        profile.skills.forEach((skill) => {
            formData.append('skills', skill);
          });
        const query = `${API}/auth/changeSkills`;
        try{
            const res = await axios.post(query, formData, {headers});
            if(res.status === 200){
                toast.success(res.data.msg);
            }else{
                console.log(res.status);
            }
        }catch(error){
            console.error(error);
        }
    }
    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{paddingTop:'50px', paddingBottom:'75px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" spacing={2} sx={{paddingX:'50px'}}>
            <Typography sx={{fontSize:'22px', fontWeight:fontBold, color:'#511523'}}>プロフィール</Typography>
                <Box display='flex' flexDirection='row' sx={{columnGap:'100px', position:'relative', }}>
                
                {/** Personal Data */}
                    <Box display='flex' flexDirection='column' sx={{rowGap:'20px', width:'40%'}}>
                        

                    {/** Basic Data */}
                        <Box display='flex' flexDirection='column' sx={{rowGap:'20px', padding:'20px', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'10px', marginTop:'20px'}}>
                        <Typography sx={{paddingX:'10px', fontSize:'16px', fontWeight:fontBold, marginTop:'-32px', backgroundColor:'#FFF', width:'fit-content'}}>基本データ</Typography>
                        
                        <Typography sx={{fontSize:'16px', fontWeight:fontBold}}>アバター</Typography>
                        <Box display='flex' flexDirection='row' sx={{alignItems:'end', columnGap:'20px'}}>
                            <CardMedia 
                                component="img"
                                sx={{width:'40%'}}
                                image = {avatar?URL.createObjectURL(avatar):`${API}/api/avatar/${userData.id}`}
                                />
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
                                    paddingX:'20px', 
                                    paddingY:'5px',
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
                                    paddingX:'20px', 
                                    paddingY:'5px', color:'#000000',
                                    border:'2px solid rgba(0,0,0,0.1)',
                                    fontWeight:fontBold,
                                    "&:hover": {
                                        backgroundColor: '#FCF4F4'
                                    },
                                    }}
                                onClick={()=>{setAvatar(null)}}>
                                取り除く
                            </Button>
                        </Box>
                            <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                                <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>メールアドレス: </Typography>
                                <TextField
                                    type="text"
                                    variant="standard"
                                    placeholder="メールアドレス"
                                    value={userData.email}
                                    sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
                                    disabled={true}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                           <EmailIcon />
                                        </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>   
                            <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                                <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>ユーザー名: </Typography>
                                <TextField
                                    type="text"
                                    variant="standard"
                                    placeholder="ユーザー名"
                                    value={profile.username}
                                    sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
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
                                <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>会社名: </Typography>
                                <TextField
                                    type="text"
                                    variant="standard"
                                    placeholder="会社名"
                                    value={profile.company}
                                    sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
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
                                    onClick={handleBasicDataSubmit}
                                    >セーブ
                                </Button>
                            </Box>        
                        </Box>
                        <Box display='flex' flexDirection='column' sx={{rowGap:'20px', padding:'20px', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'10px', marginTop:'20px'}}>
                        <Typography sx={{paddingX:'10px', fontSize:'16px', fontWeight:fontBold, marginTop:'-32px', backgroundColor:'#FFF', width:'fit-content'}}>本人確認書類</Typography>
                            <Box display='flex' flexDirection='row' justifyContent='start' sx={{columnGap:'150px'}}>
                                <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'start',}}>
                                    {/* <Typography sx={{fontSize:'16px', whiteSpace:'nowrap'}}>本人確認書類: </Typography> */}
                                    <label className="btn btn-default p-0 ">
                                        <input type="file" onChange={selectFile} />
                                    </label>
                                </Box>
                            </Box>
                            <Box display='flex' flexDirection='row' justifyContent='end'>
                                <Button
                                    size="medium"
                                    sx={{
                                        backgroundColor:btnBackground, 
                                        borderRadius:'36px', 
                                        paddingX:'20px',
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
                    {/** Reset Password */}
                        <Box display='flex' flexDirection='column' sx={{rowGap:'20px', padding:'20px', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'10px', marginTop:'20px'}}>
                            <Typography sx={{paddingX:'10px', fontSize:'16px', fontWeight:fontBold, marginTop:'-32px', backgroundColor:'#FFF', width:'fit-content'}}>パスワードの変更</Typography>
                            <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                                <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>パスワード: </Typography>
                                <TextField
                                    type={showState1?"password":"text"}
                                    placeholder="パスワード"
                                    variant='standard'
                                    value = {password.pswd1}
                                    sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
                                    onChange = {(e) => {setPassword({...password, pswd1:e.target.value})}}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={()=>{setShowState1(!showState1)}}>
                                            {
                                                showState1 ? <VisibilityOffIcon /> : <VisibilityIcon />
                                            }
                                        </InputAdornment>
                                        ),
                                    }}
                                    />
                            </Box>
                            <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                                <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>パスワードの確認: </Typography>
                                <TextField
                                    type={showState2?"password":"text"}
                                    placeholder="パスワードの確認"
                                    variant='standard'
                                    value = {password.pswd2}
                                    sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
                                    onChange = {(e) => {setPassword({...password, pswd2:e.target.value})}}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={()=>{setShowState2(!showState2)}}>
                                            {
                                                showState2 ? <VisibilityOffIcon /> : <VisibilityIcon />
                                            }
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
                                    onClick = {handleResetPassword}
                                    >変化する
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                
                {/** Social Network and Skils  */}
                    <Box display='flex' flexDirection='column' sx={{width:'40%', rowGap:'20px'}}>
                    {/** SNS */}
                    <Box display='flex' flexDirection='column' sx={{marginTop:'20px',rowGap:'20px', padding:'20px', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'10px'}}>
                        <Typography sx={{paddingX:'10px', fontSize:'16px', fontWeight:fontBold, marginTop:'-32px', backgroundColor:'#FFF', width:'fit-content'}}> SNS </Typography>
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>17.Live: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="17.Live"
                                value={profile.liveAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
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
                            <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>Youtube: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Youtube"
                                value={profile.youtubeAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
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
                            <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>TikTok: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Tiktok"
                                value={profile.tiktokAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
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
                            <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>Instagram: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Instagram"
                                value={profile.instagramAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
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
                        <Box display='flex' flexDirection='row' sx={{columnGap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>Twitter: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Twitter"
                                value={profile.twitterAccount}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
                                onChange={(e)=>{setProfile({...profile, twitterAccount:e.target.value})}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <img width={25} src={staticFiles.icons.ic_twitter} />
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
                                onClick={handleUpdateSNS}
                                >セーブ</Button>
                        </Box>
                    </Box>
                    {/** Skills */}
                    <Box display='flex' flexDirection='column' sx={{rowGap:'20px', padding:'20px', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'10px', marginTop:'20px'}}>
                        <Typography sx={{paddingX:'10px', fontSize:'16px', fontWeight:fontBold, marginTop:'-32px', backgroundColor:'#FFF', width:'fit-content'}}>スキル</Typography>
                        <Box display='flex' flexDirection='column' sx={{columnGap:'10px', justifyContent:'center', rowGap:'10px'}}>
                            <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>私自身の紹介</Typography>
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
                                        color: '#000', fontSize: '18px', fontWeight:fontBold, backgroundColor:'#FAEAD1', borderRadius:'20px',
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
                            <Typography sx={{fontSize:'14px', fontWeight:fontBold, whiteSpace:'nowrap'}}>スキル: </Typography>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="スキル"
                                value={skill}
                                sx={{backgroundColor:'rgba(0,0,0,0.05)', paddingX:'10px', paddingY:'5px', width:'80%', fontSize:'14px',}}
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
                                onClick={handleUpdateSkill}
                                >セーブ
                            </Button>
                        </Box>
                    </Box>     
                </Box>

                </Box>
            </Stack>
        </Container>
    )
}