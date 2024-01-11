import { Container, Stack, Tabs, Tab, Box, Typography, TableContainer, TableHead, TableRow, TableFooter, TablePagination, Button, TextField } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DownloadIcon from '@mui/icons-material/Download';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';

import React from "react";
import { API } from "../../axios";
import axios from "axios";
import { headers } from "../../utils/appHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../slices/page";
import { fontBold } from "../../components/Constants";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
    
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export const Admin = () => {
    const [ admin, setAdmin ] = React.useState<boolean>();
    const loginStatus = useSelector((state:any) => state.auth.isLoggedIn);
    const getAdminData = async () => {
        const query = `${API}/api/getAdmin`;
        const res = await axios.post(query, {}, headers());
        setAdmin(res.data.admin);
    }

    React.useEffect(() => {
        if(loginStatus) getAdminData();
        if(admin == false){
          navigate('/mypage');
        }
    }, [])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(setPage({page:8}));
    // Tab change event
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    // Page change event
    const [currentClientPage, setCurrentClientPage] = React.useState(0);
    const [clientRowsPerPage, setClientRowsPerPage] = React.useState(5);
    const [currentCreatorPage, setCurrentCreatorPage] = React.useState(0);
    const [creatorRowsPerPage, setCreatorRowsPerPage] = React.useState(5);
    const [currentContractPage, setCurrentContractPage] = React.useState(0);
    const [contractRowsPerPage, setContractRowsPerPage] = React.useState(5);
    const [currentContractPaymentPage, setCurrentContractPaymentPage] = React.useState(0);
    const [contractPaymentRowsPerPage, setContractPaymentRowsPerPage] = React.useState(5);
    const [ clients, setClients ] = React.useState<any[]>([]);
    const [ creators, setCreators ] = React.useState<any[]>([]);
    const [ contracts, setContracts ] = React.useState<any[]>([]);
    const [ creatorInfo, setCreatorInfo ] = React.useState('');
    const [ contractPayments, setContractPayments] = React.useState<any[]>([]);
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyClientRows =
    currentClientPage > 0 ? Math.max(0, (1 + currentClientPage) * clientRowsPerPage - clients.length) : 0;
  
    const emptyCreatorRows =
    currentCreatorPage > 0 ? Math.max(0, (1 + currentCreatorPage) * creatorRowsPerPage - creators.length) : 0;

    const emptyContractRows = 
    currentContractPage > 0 ? Math.max(0, (1 + currentContractPage) * contractRowsPerPage - contracts.length) : 0;

    const emptyContractPaymentRows = 
    currentContractPaymentPage > 0 ? Math.max(0, (1 + currentContractPaymentPage) * contractPaymentRowsPerPage - contractPayments.length) : 0;

    const handleChangeClientPage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setCurrentClientPage(newPage);
    };

    const handleChangeCreatorPage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setCurrentClientPage(newPage);
    };

    const handleChangeContractPage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setCurrentContractPage(newPage);
    };

    const handleChangeContractPaymentPage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setCurrentContractPaymentPage(newPage);
    };
  
    const handleChangeClientRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setClientRowsPerPage(parseInt(event.target.value, 10));
      setCurrentClientPage(0);
    };

    const handleChangeCreatorRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setCreatorRowsPerPage(parseInt(event.target.value, 10));
      setCurrentCreatorPage(0);
    };

    const handleChangeContractRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setContractRowsPerPage(parseInt(event.target.value, 10));
      setCurrentContractPage(0);
    };

    const handleChangeContractPaymentRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setContractPaymentRowsPerPage(parseInt(event.target.value, 10));
      setCurrentContractPaymentPage(0);
    };

    // Get users data from Database
    const getClientsInfo = async () => {
      const query = `${API}/api/getAllUsersInfo`;
      const res = await axios.post(query, {}, headers());
      let usersInfo: any[] = [];
      for(const item of res.data){
        usersInfo.push({
          userid: item._id,
          avatar: item._id,
          name: item.username,
          email: item.email,
          company: item.company,
          role: item.role,
          verify: item.verify,
          verify_doc: item.verify_doc,
        });
      }
      const clientsInfo = usersInfo.filter((item) => item.role === 'client');
      const creatorsInfo = usersInfo.filter((item) => item.role === 'creator');
      setClients(clientsInfo);
      setCreators(creatorsInfo);
    }

    // Get All Contract 
    const getAllContracts = async () => {
      const query = `${API}/api/getAllContracts`;
      try{
        const res = await axios.post(query, {}, headers());
        const info = res.data.sort((a:any, b:any) => a.status - b.status);
        setContracts(info);
        setContractPayments(info.filter((item:any) => {return item.status === 0 || item.status === 1}).sort((a:any, b:any) => {return a.billed === b.billed ? 0 : a.billed ? -1 : 1;}));
      } catch(err) {
        console.log(err);
      }
    }
    React.useEffect(() =>{
      if(loginStatus){
        getClientsInfo();
        getAllContracts();
      }
    }, [])
    
    // Verify user
    const handleVerify = async (id:string, selectedIndex:number, tab:number) => {
      const query = `${API}/api/userVerify/${id}`;
      try{
        const res = await axios.post(query, {}, headers());
        if(res.status === 200){
          toast.success(res.data.msg);
          if(tab === 0){
            setClients(prevClients => {
              // Create a new array by mapping through the previous clients array
              return prevClients.map((client, index) => {
                // If the current index matches the index to update, modify the 'verify' field
                if (index === selectedIndex) {
                  return { ...client, verify: true }; // Update the 'verify' field
                }
                return client; // Return the unchanged client for other indices
              });
            });
          }
          else if (tab === 1){
            setCreators(prevCreators => {
              // Create a new array by mapping through the previous creators array
              return prevCreators.map((creator, index) => {
                // If the current index matches the index to update, modify the 'verify' field
                if (index === selectedIndex) {
                  return { ...creator, verify: true }; // Update the 'verify' field
                }
                return creator; // Return the unchanged creator for other indices
              });
            });
          }

        } else { console.log(res)}
      } catch (e) {
        console.error(e);
      }
    }

    // Delete user
    const handleUserDelete = async (id:string, indexToRemove:number, tab: number) => {
      const query = `${API}/api/userDelete/${id}`;
      try{
        const res = await axios.post(query, {}, headers());
        if(res.status === 200){
          toast.success(res.data.msg);
          if(tab === 0){
            setClients(prevClients => {
              // Create a new array by filtering out the item at the specified index
              return prevClients.filter((_, index) => index !== indexToRemove);
            });
          } else if(tab === 1){
            setCreators(prevCreators => {
              // Create a new array by filtering out the item at the specified index
              return prevCreators.filter((_, index) => index !== indexToRemove);
            });
          }
        } else { console.log(res) }
      } catch(err){
        console.error(err);
      }
    }

    // Filter by Email
    const handleSearch = (email: string, tab: number) => {
      if(email){
        if(tab === 0){
          setClients(clients.filter((item, index) => item.email == email));
        } else {
          setCreators(creators.filter((item, index) => item.email == email));
        }
      } else {
        getClientsInfo();
      }
    }

    // Verify Doc Download
    const handleDocDownload = async (fileName:string) => {
        try {
          const token = localStorage?.getItem('token');
          const headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
          };
        const response = await axios.get(`${API}/api/verifyDownload/${fileName}`, {
          responseType: 'blob',
          headers,
        });

        // Create a temporary URL to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        // Handle errors
        console.error('File download error:', error);
      }
    }

    // Confirm contract
    const handleConfirmContract = async (id: string, selectedIndex:number) => {
      const query = `${API}/api/contractConfirm/${id}`;
      try{
        const res = await axios.post(query, {}, headers());
        if(res.status === 200){
          toast.success(res.data.msg);
          setContracts(prevContracts => {
            // Create a new array by mapping through the previous contracts array
            return prevContracts.map((contract, index) => {
              // If the current index matches the index to update, modify the 'status' field
              if (index === selectedIndex) {
                return { ...contract, status: 1, confirm:true }; // Update the 'status' field
              }
              return contract; // Return the unchanged contract for other indices
            });
          });
        }
      } catch(err){
        console.error(err);
      }
    }
    
    // Cancel contract
    const handleCancelContract = async (id: string, selectedIndex:number) => {
      const query = `${API}/api/contractCancel/${id}`;
      try{
        const res = await axios.post(query, {}, headers());
        if(res.status === 200){
          toast.success(res.data.msg);
          setContracts(prevContracts => {
            // Create a new array by mapping through the previous contracts array
            return prevContracts.map((contract, index) => {
              // If the current index matches the index to update, modify the 'status' field
              if (index === selectedIndex) {
                return { ...contract, status: -1, confirm:false }; // Update the 'status' field
              }
              return contract; // Return the unchanged contract for other indices
            });
          });
        }
      }catch(err){
        console.error(err);
      }
    }

    // Add Creator
    const handleAddCreator = async (id: string, selectedIndex:number) => {
      const query = `${API}/api/addCreator/${id}`;
      try{
        if(creatorInfo === ''){
          toast.error('クリエイターを選択する必要があります');
          return;
        }
        const res = await axios.post(query, {creator_email: creatorInfo}, headers());
        if(res.status === 200){
          if(res.data === false){
            toast.error('クリエイターを選択する必要があります');
            return;
          }
          toast.success(res.data.msg);
          setContracts(prevContracts => {
            // Create a new array by mapping through the previous contracts array
            return prevContracts.map((contract, index) => {
              // If the current index matches the index to update, modify the 'creatorEmail' field
              if (index === selectedIndex) {
                return { ...contract, creatorEmail: creatorInfo }; // Update the 'creatorEmail' field
              }
              return contract; // Return the unchanged contract for other indices
            });
          });
        }
      } catch(err){
        console.error(err);
      }
    }

    // Search Contract
    const handleContractSearch = (email: string, tab: number) => {
      if(email){
        if(tab === 0){
          setContracts(contracts.filter((item, index) => item.clientEmail == email));
        } else {
          setContracts(contracts.filter((item, index) => item.creatorEmail == email));
        }
      } else {
        getAllContracts();
      }
    }

    // Search Contract Payment
    const handleContractPaymentSearch = (email: string, tab: number) => {
      if(email){
        if(tab === 0){
          setContractPayments(contractPayments.filter((item, index) => item.clientEmail == email).sort((a:any, b:any) => {return a.billed === b.billed ? 0 : a.billed ? -1 : 1;}));
        } else {
          setContractPayments(contractPayments.filter((item, index) => item.creatorEmail == email).sort((a:any, b:any) => {return a.billed === b.billed ? 0 : a.billed ? -1 : 1;}));
        }
      } else {
        getAllContracts();
      }
    }

    // Contract Payment
    const handleContractPayment = async (id: string) => {
      const query = `${API}/api/contractPayment/${id}`;
      try{
        const contract_data = contractPayments.filter((item, index) => item._id === id);
        const res = await axios.post(query, { price: contract_data[0].creatorPrice, fee: contract_data[0].fee }, headers());
        if(res.status === 200){
          toast.success(res.data.msg);
        }
      } catch(err){
        console.error(err);
      }
    }

    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{ paddingTop:'30px', paddingBottom:'40px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" sx={{paddingX:'26px', width:'100%' }}>
            <Box sx={{ width: '100%', }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="クライアントリスト" icon={<PersonIcon />} iconPosition="start" {...a11yProps(0)} />
                        <Tab label="リクエスタリスト" icon={<PeopleIcon />} iconPosition="start" {...a11yProps(1)} />
                        <Tab label="契約状況一覧" icon={<ListAltIcon />} iconPosition="start" {...a11yProps(2)} />
                        <Tab label="契約価格表" icon={<CurrencyYenIcon />} iconPosition="start" {...a11yProps(3)} />
                    </Tabs>
                </Box>
              {/** Clients Table */}
                <CustomTabPanel value={value} index={0}>
                    <Box display='flex' flexDirection='row' alignItems='center' sx={{columnGap:'5px', marginBottom:'10px' }}>
                    <Typography sx={{fontSize:'20px'}}>メール: </Typography>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={clients.map((client) => client.email)}
                      size="small"
                      sx={{ width: 400, border: '1px solid #000000', }}
                      onChange={(e, value) => { handleSearch(value, 0)}} // Use onChange to capture selected value
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                    </Box>
                    {/* リクエスタの電子メールを入力してください */}
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>アバター</StyledTableCell>
                        <StyledTableCell align="center">名前</StyledTableCell>
                        <StyledTableCell align="center">メール</StyledTableCell>
                        <StyledTableCell align="center">会社名</StyledTableCell>
                        <StyledTableCell align="center">検証状態</StyledTableCell>
                        <StyledTableCell align="center">アクション</StyledTableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        {(clients.length > 0 && clientRowsPerPage > 0
                          ? clients.slice(currentClientPage * clientRowsPerPage, currentClientPage * clientRowsPerPage + clientRowsPerPage)
                          : clients
                        ).map((row, index) => (
                          <StyledTableRow key={row.name}>
                            <TableCell component="th" scope="row" style={{ width: 65, height: 65 }}>
                            <img className=" rounded-[30px]" 
                                  src = {`${API}/api/avatar/${row.avatar}`}/>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                              {row.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                              {row.email}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                              {row.company}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                              <Box display='flex' sx={{flexDirection:row.verify?'column':'row'}}>
                                <Typography sx={{fontSize:'14px', backgroundColor:row.verify?'green':'#ee7d90', paddingX:'20px', paddingY:'10px', borderRadius:'10px', color:'#FFFFFF'}}>{row.verify?'検証済み':'検証されていません'}</Typography>
                                  {!row.verify && row.verify_doc != '' && (
                                    <IconButton aria-label="download" onClick={()=>handleDocDownload(row.verify_doc)}>
                                    <DownloadIcon />
                                  </IconButton>
                                  )}
                              </Box>
                            </TableCell>
                            <TableCell style={{ width: 200 }} align="center">
                              <Button variant="outlined" 
                                sx={{color:'green', border:'1px solid green', 
                                      marginX:'5px',
                                      "&:hover": {
                                                  border: '1px solid green',
                                              }, 
                                    }} startIcon={<HowToRegIcon sx={{marginBottom:'5px'}}/>}
                                onClick={() => handleVerify(row.userid, index + currentClientPage * clientRowsPerPage, 0)}
                              >
                                検証
                              </Button>
                              <Button variant="outlined" 
                                sx={{color:'#e73636',
                                    border:'1px solid #e73636', marginX:'5px', 
                                      "&:hover": {
                                        border: '1px solid #e73636',
                                    },
                                }} startIcon={<DeleteForeverIcon sx={{marginBottom:'5px'}}/>}
                                onClick={() => handleUserDelete(row.userid, index + currentClientPage * clientRowsPerPage, 0)}
                                >
                                削除します
                              </Button>
                            </TableCell>
                          </StyledTableRow>
                        ))}
                        {emptyClientRows > 0 && (
                          <TableRow style={{ height: 53 * emptyClientRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={clients.length}
                            rowsPerPage={clientRowsPerPage}
                            page={currentClientPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangeClientPage}
                            onRowsPerPageChange={handleChangeClientRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage="ページごとの行数" 
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </CustomTabPanel>
              {/** Creator Table */}  
                <CustomTabPanel value={value} index={1}>
                    <Box display='flex' flexDirection='row' alignItems='center' sx={{columnGap:'5px', marginBottom:'10px' }}>
                        <Typography sx={{fontSize:'20px'}}>メール: </Typography>
                        <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          options={creators.map((creator) => creator.email)}
                          size="small"
                          sx={{ width: 400, border: '1px solid #000000',}}
                          onChange={(e, value) => { handleSearch(value, 1)}} // Use onChange to capture selected value
                          renderInput={(params) => <TextField {...params} label="" />}
                        />
                    </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>アバター</StyledTableCell>
                        <StyledTableCell align="center">名前</StyledTableCell>
                        <StyledTableCell align="center">メール</StyledTableCell>
                        <StyledTableCell align="center">会社名</StyledTableCell>
                        <StyledTableCell align="center">検証状態</StyledTableCell>
                        <StyledTableCell align="center">アクション</StyledTableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        {(creators.length > 0 && creatorRowsPerPage > 0
                          ? creators.slice(currentCreatorPage * creatorRowsPerPage, currentCreatorPage * creatorRowsPerPage + creatorRowsPerPage)
                          : creators
                        ).map((row, index) => (
                          <StyledTableRow key={row.name}>
                            <TableCell component="th" scope="row" style={{ width: 65, height: 65 }}>
                            <img className=" rounded-[30px]" 
                                  src = {`${API}/api/avatar/${row.avatar}`}/>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                              {row.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                              {row.email}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                              {row.company}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                              <Box display='flex' sx={{flexDirection:row.verify?'column':'row'}}>
                                <Typography sx={{fontSize:'14px', backgroundColor:row.verify?'green':'#ee7d90', paddingX:'20px', paddingY:'10px', borderRadius:'10px', color:'#FFFFFF'}}>{row.verify?'検証済み':'検証されていません'}</Typography>
                                  {!row.verify && row.verify_doc != '' && (
                                    <IconButton aria-label="download" onClick={()=>handleDocDownload(row.verify_doc)}>
                                    <DownloadIcon />
                                  </IconButton>
                                  )}
                              </Box>
                            </TableCell>
                            <TableCell style={{ width: 200 }} align="center">
                              <Button variant="outlined" 
                                sx={{color:'green', border:'1px solid green', 
                                      marginX:'5px',
                                      "&:hover": {
                                                  border: '1px solid green',
                                              }, 
                                    }} startIcon={<HowToRegIcon sx={{marginBottom:'5px'}}/>}
                                onClick={() => handleVerify(row.userid, index + currentCreatorPage * creatorRowsPerPage, 1)}
                              >
                                検証
                              </Button>
                              <Button variant="outlined" 
                                sx={{color:'#e73636',
                                    border:'1px solid #e73636', marginX:'5px', 
                                      "&:hover": {
                                        border: '1px solid #e73636',
                                    },
                                }} startIcon={<DeleteForeverIcon sx={{marginBottom:'5px'}}/>}
                                onClick={() => handleUserDelete(row.userid, index + currentCreatorPage * creatorRowsPerPage, 1)}
                                >
                                削除します
                              </Button>
                            </TableCell>
                          </StyledTableRow>
                        ))}
                        {emptyCreatorRows > 0 && (
                          <TableRow style={{ height: 53 * emptyCreatorRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={creators.length}
                            rowsPerPage={creatorRowsPerPage}
                            page={currentCreatorPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangeCreatorPage}
                            onRowsPerPageChange={handleChangeCreatorRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage="ページごとの行数" 
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>         
                </CustomTabPanel>
              {/** Contract Status Table */}
                <CustomTabPanel value={value} index={2}>
                  <Box display='flex' flexDirection='row' alignItems='center' sx={{columnGap:'5px', marginBottom:'10px' }}>
                    <Typography sx={{fontSize:'20px'}}>クライアント: </Typography>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={clients.map((client) => client.email)}
                      size="small"
                      sx={{ width: 250, border: '1px solid #000000', marginRight:'30px'}}
                      onChange={(e, value) => { handleContractSearch(value, 0)}} // Use onChange to capture selected value
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                    <Typography sx={{fontSize:'20px'}}>リクエスター: </Typography>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={creators.map((creator) => creator.email)}
                      size="small"
                      sx={{ width: 250, border: '1px solid #000000', }}
                      onChange={(e, value) => { handleContractSearch(value, 1)}} // Use onChange to capture selected value
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                    </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>契約名</StyledTableCell>
                        <StyledTableCell align="center">クライアント</StyledTableCell>
                        <StyledTableCell align="center">リクエスター</StyledTableCell>
                        <StyledTableCell align="center">製品の種類</StyledTableCell>
                        <StyledTableCell align="center">使用方法</StyledTableCell>
                        <StyledTableCell align="center">配送日</StyledTableCell>
                        <StyledTableCell align="center">進捗状況</StyledTableCell>
                        <StyledTableCell align="center">契約している状態</StyledTableCell>
                        <StyledTableCell align="center">アクション</StyledTableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        {(contracts.length > 0 && contractRowsPerPage > 0
                          ? contracts.slice(currentContractPage * contractRowsPerPage, currentContractPage * contractRowsPerPage + contractRowsPerPage)
                          : contracts
                        ).map((row, index) => (
                          <StyledTableRow key={row._id} >
                            <TableCell component="th" scope="row" style={{ width: 80, fontSize:'12px' }}>
                              {row.category}
                            </TableCell>
                            <TableCell style={{ width: 50 }} align="left">
                              {row.clientEmail}
                            </TableCell>
                            <TableCell style={{ width: 150 }} align="left">
                              {row.creatorEmail == 'admin' ? (
                                <Box display='flex' flexDirection='row' justifyContent='center'>
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    options={creators.map((creator) => creator.email)}
                                    sx={{ width: 210, height:'40px', border: '1px solid #000000' }}
                                    size="small"
                                    onChange={(e, value) => setCreatorInfo(value)} // Use onChange to capture selected value
                                    renderInput={(params) => <TextField {...params} label="リクエスタの割り当て" />}
                                />

                                <IconButton 
                                  sx={{
                                    color:'green',
                                    marginX:'5px',
                                    width:50, height:50,
                                  "&:hover": {
                                              border: '1px solid green',
                                          }, 
                                  }}
                                  onClick={()=>{handleAddCreator(row._id, index + currentContractPage * contractRowsPerPage)}}
                                  aria-label="add">
                                  <DoneOutlineIcon />
                                </IconButton>
                              </Box>
                              ):row.creatorEmail}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="left">
                              {row.step1}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="center">
                              {row.step2}
                            </TableCell>
                            <TableCell style={{ width: 80 }} align="center">
                              {row.step3 > 0 ? row.step3 + 'ヶ月': '相談したい'}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="center">
                              {row.status >= 0 ? (
                                <BorderLinearProgress variant="determinate" value={25 * row.status} />
                                ):(
                                <Typography sx={{color:'#ee7d90', fontWeight:fontBold, fontSize:'12px'}}>中止されました</Typography>
                              )}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="center">
                              <Typography sx={{fontSize:'12px', backgroundColor:row.confirm?'green':'#ee7d90', paddingX:'10px', paddingY:'2px', borderRadius:'10px', color:'#FFFFFF'}}>
                                {row.confirm?'締結':'締結なし'}
                              </Typography>
                            </TableCell>
                            <TableCell style={{ width: 250 }} align="center">
                              <Button variant="outlined" 
                                sx={{color:'green', border:'1px solid green', 
                                      marginX:'5px',
                                      "&:hover": {
                                                  border: '1px solid green',
                                              }, 
                                    }} startIcon={<DoneOutlineIcon sx={{marginBottom:'5px'}}/>}
                                disabled = {row.status > 0 && true}
                                onClick={() => handleConfirmContract(row._id, index + currentContractPage * contractRowsPerPage)}
                              >
                                確認
                              </Button>
                              <Button variant="outlined" 
                                sx={{color:'#ee7d90', border:'1px solid #ee7d90', 
                                      marginX:'5px',
                                      "&:hover": {
                                                  border: '1px solid #ee7d90',
                                              }, 
                                    }} startIcon={<CancelIcon sx={{marginBottom:'5px'}}/>}
                                disabled = {row.status == -1 && true}
                                onClick={() => handleCancelContract(row._id, index + currentContractPage * contractRowsPerPage)}
                              >
                                取り消す
                              </Button>
                            </TableCell>
                          </StyledTableRow>
                        ))}
                        {emptyContractRows > 0 && (
                          <TableRow style={{ height: 53 * emptyContractRows }}>
                            <TableCell colSpan={9} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={9}
                            count={contracts.length}
                            rowsPerPage={contractRowsPerPage}
                            page={currentContractPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangeContractPage}
                            onRowsPerPageChange={handleChangeContractRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage="ページごとの行数" 
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>   
                </CustomTabPanel>
              {/** Contract Price Table */}
                <CustomTabPanel value={value} index={3}>
                <Box display='flex' flexDirection='row' alignItems='center' sx={{columnGap:'5px', marginBottom:'10px' }}>
                    <Typography sx={{fontSize:'20px'}}>クライアント: </Typography>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={clients.map((client) => client.email)}
                      size="small"
                      sx={{ width: 250, border: '1px solid #000000', marginRight:'30px'}}
                      onChange={(e, value) => { handleContractPaymentSearch(value, 0)}} // Use onChange to capture selected value
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                    <Typography sx={{fontSize:'20px'}}>リクエスター: </Typography>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={creators.map((creator) => creator.email)}
                      size="small"
                      sx={{ width: 250, border: '1px solid #000000', }}
                      onChange={(e, value) => { handleContractPaymentSearch(value, 1)}} // Use onChange to capture selected value
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                    </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>契約名</StyledTableCell>
                        <StyledTableCell align="center">クライアント</StyledTableCell>
                        <StyledTableCell align="center">リクエスター</StyledTableCell>
                        <StyledTableCell align="center">製品の種類</StyledTableCell>
                        <StyledTableCell align="center">使用方法</StyledTableCell>
                        <StyledTableCell align="center">インフルエンサー費用</StyledTableCell>
                        <StyledTableCell align="center">ディレクター費用</StyledTableCell>
                        <StyledTableCell align="center">合計金額</StyledTableCell>
                        <StyledTableCell align="center">アクション</StyledTableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        {(contractPayments.length > 0 && contractPaymentRowsPerPage > 0
                          ? contractPayments.slice(currentContractPaymentPage * contractPaymentRowsPerPage, currentContractPaymentPage * contractPaymentRowsPerPage + contractPaymentRowsPerPage)
                          : contractPayments
                        ).map((row, index) => (
                          <StyledTableRow key={row._id} >
                            <TableCell component="th" scope="row" style={{ width: 80, fontSize:'12px' }}>
                              {row.category}
                            </TableCell>
                            <TableCell style={{ width: 50 }} align="left">
                              {row.clientEmail}
                            </TableCell>
                            <TableCell style={{ width: 150 }} align="left">
                              {row.creatorEmail}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="left">
                              {row.step1}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="left">
                              {row.step2}
                            </TableCell>
                            <TableCell style={{ width: 150 }} align="left">
                              {!row.billed ? (
                              <Box display='flex' flexDirection='row' alignItems='center' sx={{columnGap:'5px'}}>
                              <TextField
                                size="small"
                                sx={{ border: '1px solid #000' }}
                                value={row.creatorPrice}
                                onChange={(e) => {
                                  const updatedPayments = [...contractPayments];
                                  updatedPayments[index + currentContractPaymentPage * contractPaymentRowsPerPage].creatorPrice = e.target.value;
                                  setContractPayments(updatedPayments);
                                }}
                              />
                              円
                              </Box>
                              ):
                              row.creatorPrice.toLocaleString()+'円'}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="left">
                              {!row.billed ? (
                                <Box display='flex' flexDirection='row' alignItems='center' sx={{columnGap:'5px'}}>
                                <TextField
                                  size="small"
                                  sx={{ border: '1px solid #000' }}
                                  value={row.fee}
                                  onChange={(e) => {
                                    const updatedPayments = [...contractPayments];
                                    updatedPayments[index + currentContractPaymentPage * contractPaymentRowsPerPage].fee = e.target.value;
                                    setContractPayments(updatedPayments);
                                  }}
                                />
                                円
                                </Box>
                                ):
                                row.fee.toLocaleString()+'円'}
                            </TableCell>
                            <TableCell style={{ width: 80 }} align="left">
                              {(parseFloat(row.creatorPrice) + parseFloat(row.fee)).toLocaleString()} 円
                            </TableCell>
                          
                            <TableCell style={{ width: 150 }} align="center">
                              <Button variant="outlined" 
                                sx={{color:'green', border:'1px solid green', 
                                      marginX:'5px',
                                      "&:hover": {
                                                  border: '1px solid green',
                                              }, 
                                    }} startIcon={<DoneOutlineIcon sx={{marginBottom:'5px'}}/>}
                                disabled = {row.billed}
                                onClick={() => handleContractPayment(row._id)}
                              >
                                料金適用
                              </Button>
                              {/* <Button variant="outlined" 
                                sx={{color:'#ee7d90', border:'1px solid #ee7d90', 
                                      marginX:'5px',
                                      "&:hover": {
                                                  border: '1px solid #ee7d90',
                                              }, 
                                    }} startIcon={<CancelIcon sx={{marginBottom:'5px'}}/>}
                                disabled = {row.status == -1 && true}
                                onClick={() => handleCancelContract(row._id, index + currentContractPage * contractRowsPerPage)}
                              >
                                確認
                              </Button> */}
                            </TableCell>
                          </StyledTableRow>
                        ))}
                        {emptyContractPaymentRows > 0 && (
                          <TableRow style={{ height: 53 * emptyContractPaymentRows }}>
                            <TableCell colSpan={9} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={9}
                            count={contractPayments.length}
                            rowsPerPage={contractPaymentRowsPerPage}
                            page={currentContractPaymentPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangeContractPaymentPage}
                            onRowsPerPageChange={handleChangeContractPaymentRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage="ページごとの行数" 
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer> 
                </CustomTabPanel>
                </Box>
            </Stack>
        </Container>
    )
}