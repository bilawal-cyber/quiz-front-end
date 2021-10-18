import { React, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { Edit, Visibility } from '@material-ui/icons';
import axios from 'axios';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#d1d9ff',
      color: 'black',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
      background: "#d1d9ff",
    },
  });
const box = {
    background: "#d1d9ff",
    border: "1px solid rgb(19, 47, 76)",
  }

  const ModelBox = {
    background: "#d1d9ff",
    border: "1px solid rgb(19, 47, 76)",
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
  }


export const AllResults = ({base_url}) => {
    const classes = useStyles();
    const [users,setUsers] = useState([])
    const [openViewModel,setOpenViewModel] = useState(false)
    const [singleUserAnswers,setSingleUserAnswers] = useState([])
    
    
    const handleClose=()=>{setOpenViewModel(false)}


    useEffect(()=>{
        axios.get(base_url+'/all/users')
                .then((res)=>setUsers(res.data))
                        .catch(err=>console.log(err))
    },[])
    const getResults=(email)=>{
        axios.get(base_url+`/user/all/records?email=${email}`)
                    .then((res)=>{
                        setSingleUserAnswers(res.data)
                        setOpenViewModel(true)   
                    })
                            .catch(err=>console.log(err))
    }
    var key = 0
    let quiz_id=1
    return (
        <>
                <Box
        style={box}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>id</StyledTableCell>
                <StyledTableCell>Emails</StyledTableCell>
                <StyledTableCell>View Results</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            
                {
                    users.map(email=>(
                        <StyledTableRow key={email}>
                  <StyledTableCell scope="row">
                    {key+=1}
                  </StyledTableCell>
                  <StyledTableCell>
                    {email}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton edge="end" aria-label="View" onClick={() => {getResults(email)}} >
                      <Visibility />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                    ))
                }
    
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
                <Modal
                open={openViewModel}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              {
                  singleUserAnswers.length>0?
                  <Box p={3}
                  sx={{ borderRadius: 16 }} style={ModelBox}
                  mt={1}>
                      {
                          
                          singleUserAnswers.map(a=>(
                            <List>
                            <ListItem>
                            <ListItemText
                            primary={"quiz score"+' '+quiz_id++}
                            />
                            <ListItemText
                            primary={a.score}
                            />
                            </ListItem>
                            </List>
                          ))
                      }
                
                </Box>:''
              }
              </Modal>
        </>
    )
}
