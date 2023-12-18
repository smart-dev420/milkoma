import { Container, Stack, Tabs, Tab, Box, Typography, TableContainer, TableHead, TableRow, TableFooter, TablePagination, Button } from "@mui/material"
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

import React from "react";
import { API } from "../../axios";
import axios from "axios";
import { headers } from "../../utils/appHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../slices/page";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
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
    const getAdminData = async () => {
        const query = `${API}/api/getAdmin`;
        const res = await axios.post(query, {}, headers());
        setAdmin(res.data.admin);
    }

    React.useEffect(() => {
        getAdminData();
        if(admin == false){
          navigate('/mypage');
        }
    }, [])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(setPage({page:7}));
    // Tab change event
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    // Page change event
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [ clients, setClients ] = React.useState<any[]>([]);
    const [ creators, setCreators ] = React.useState<any[]>([]);
    const [ flag, setFlag ] = React.useState<boolean>(false);

    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - clients.length) : 0;
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setCurrentPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(0);
    };

    // Get users data from Database
    const getClientsInfo = async () => {
      const query = `${API}/api/getAllUsersInfo`;
      const res = await axios.post(query, {}, headers());
      console.log('res - ', res.data);
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
  
    React.useEffect(() =>{
      getClientsInfo();
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
              // Create a new array by mapping through the previous clients array
              return prevCreators.map((creator, index) => {
                // If the current index matches the index to update, modify the 'verify' field
                if (index === selectedIndex) {
                  return { ...creator, verify: true }; // Update the 'verify' field
                }
                return creator; // Return the unchanged client for other indices
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



    return(
        <Container maxWidth = "xl" className="rounded-tl-[25px] rounded-bl-[25px] bg-[#ffffff] h-full" sx={{ paddingTop:'30px', paddingBottom:'40px', boxShadow:'0px 0px 20px 2px #d78e8927', marginRight:'0px'}}>
            <Stack direction="column" sx={{paddingX:'26px', width:'100%' }}>
            <Box sx={{ width: '100%', }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="クライアントリスト" icon={<PersonIcon />} iconPosition="start" {...a11yProps(0)} />
                        <Tab label="リクエスタリスト" icon={<PeopleIcon />} iconPosition="start" {...a11yProps(1)} />
                        <Tab label="契約状況一覧" icon={<ListAltIcon />} iconPosition="start" {...a11yProps(2)} />
                        <Tab label="契約価格表" icon={<ListAltIcon />} iconPosition="start" {...a11yProps(3)} />
                    </Tabs>
                </Box>
              {/** Clients Table */}
                <CustomTabPanel value={value} index={0}>
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
                        {(clients.length > 0 && rowsPerPage > 0
                          ? clients.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
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
                                  {!row.verify && (
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
                                onClick={() => handleVerify(row.userid, index, 0)}
                              >
                                Verify
                              </Button>
                              <Button variant="outlined" 
                                sx={{color:'#e73636',
                                    border:'1px solid #e73636', marginX:'5px', 
                                      "&:hover": {
                                        border: '1px solid #e73636',
                                    },
                                }} startIcon={<DeleteForeverIcon sx={{marginBottom:'5px'}}/>}
                                onClick={() => handleUserDelete(row.userid, index, 0)}
                                >
                                Delete
                              </Button>
                            </TableCell>
                          </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
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
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
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
                        {(creators.length > 0 && rowsPerPage > 0
                          ? creators.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
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
                                  {!row.verify && (
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
                                onClick={() => handleVerify(row.userid, index, 1)}
                              >
                                Verify
                              </Button>
                              <Button variant="outlined" 
                                sx={{color:'#e73636',
                                    border:'1px solid #e73636', marginX:'5px', 
                                      "&:hover": {
                                        border: '1px solid #e73636',
                                    },
                                }} startIcon={<DeleteForeverIcon sx={{marginBottom:'5px'}}/>}
                                onClick={() => handleUserDelete(row.userid, index, 1)}
                                >
                                Delete
                              </Button>
                            </TableCell>
                          </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
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
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
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
                    Item Three
                </CustomTabPanel>
              {/** Contract Price Table */}
                <CustomTabPanel value={value} index={3}>
                      Price
                </CustomTabPanel>
                </Box>
            </Stack>
        </Container>
    )
}