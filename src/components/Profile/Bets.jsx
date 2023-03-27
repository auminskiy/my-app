import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Collapse, Divider, IconButton, TablePagination, Typography } from '@mui/material';
import DataService from '../../Firebase/firestore';
import useStore from '../../store/useStore';
import { Timestamp } from '@firebase/firestore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import auth from '../../Firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';



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



const Bets = () => {

  

 const auth = getAuth();
 const user = auth.currentUser;

  
 console.log(user.email)


    const getBets = useStore((state) => state.getBets)
    const bets = useStore((state) => state.bets)
 
    useEffect(() => {
        getBets();
    }, [getBets])
   console.log(bets)

   let userBets =  bets.filter(function(userBet) {
    return userBet.user == `${user.email}`;
});
console.log(userBets)
 
  const betsWithDate = userBets.map((el) => ({
    ...el,
    createdAt: el.createdAt.toDate()
  }));
  console.log(betsWithDate);


  
  let sortByDate = betsWithDate.sort(function(a, b) {
    return b.createdAt - a.createdAt;
  });
  console.log(sortByDate);

 
  //pagination

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //раскрывашка

  const [open, setOpen] = React.useState(false);
  

  return (
    <Box sx={{width:'100%', backgroundColor:'blackSL.color',
    color:'blackSL.backgroundColor', minHeight: '100vh'}}>
        <Typography sx={{display: 'flex',
    flexWrap: 'wrap', marginBottom: 3, marginLeft: 3, marginTop: 3, }}><CurrencyExchange />&nbsp;Bets</Typography>
        <Divider sx={{marginBottom: 3, width:'100%'}}/>
    <TableContainer  component={Paper} >
    <Table size='small' sx={{justifyContent: "center", minWidth: 500,}} aria-label="customized table">
      <TableHead>
        <TableRow >
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell align="right">Date</StyledTableCell>
          <StyledTableCell align="right">Type</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right">Stake</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
        </TableRow>
        
      </TableHead>
      
      <TableBody>
      {betsWithDate
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <React.Fragment>
          <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
            <StyledTableCell component="th" scope="row">
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="right">{row.createdAt.toString().split('G')[0]}</StyledTableCell>
            <StyledTableCell align="right">
              {row.market.length === 1
              ? <p>Ordinar</p>
            : <p>Express</p>
              }
              </StyledTableCell>
              
            <StyledTableCell align="right">{row.price}</StyledTableCell>
            <StyledTableCell align="right">{parseFloat(row.stake).toFixed(2)}</StyledTableCell>
            <StyledTableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((prev) => ({...prev, [row.id]: !prev[row.id]}))}
            
          >
            {open[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
          </StyledTableRow>
          
           <TableRow key={row.id}>
           <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
             <Collapse  in={open[row.id]} timeout="auto" unmountOnExit>
               <Box sx={{ margin: 1 }}>
                 <Typography variant="h6" gutterBottom component="div">
                   bet info
                 </Typography>
                 <Divider/>
                 <Table size="small" aria-label="purchases">
                   <TableHead>
                     <TableRow>
                       <TableCell>Date</TableCell>
                       <TableCell>Market / Price</TableCell>
                       <TableCell align="right">Stake</TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     
                       <TableRow key={row.market.name}>
                         <TableCell component="th" scope="row">
                         {row.createdAt.toString().split('G')[0]}
                         </TableCell>
                         <TableCell >

                         { row.market.map((type, index) => {
                         
                              return(
                                <span key={index}>
                         <TableCell>{type.name}</TableCell>
                         <TableCell align="right">{type.price}</TableCell>
                              </span>
                              )})}
                           </TableCell> 
                        
                        
                        <TableCell align="right">
                           {parseFloat(row.stake).toFixed(2)}
                         </TableCell>
                       </TableRow>
                       
                   </TableBody>
                 </Table>
               </Box>
             </Collapse>
           </TableCell>
         </TableRow>

         </React.Fragment>
        ))}
        
      </TableBody>
    </Table>
  </TableContainer>
  <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={betsWithDate.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
  </Box>
  )
}
export default Bets;
