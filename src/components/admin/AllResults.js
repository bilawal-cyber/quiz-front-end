import { React, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, IconButton, List, ListItem, ListSubheader } from '@material-ui/core';
import { Edit, Visibility } from '@material-ui/icons';
import axios from 'axios';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { AddQuestionButton as GetResultButton } from "../Buttons";
import ClassIcon from "@material-ui/icons/Class";
import Mcqs from '../common/Mcqs';
import TrueFalse from '../common/TrueFalse';
import LevelOne from '../player/LevelOne';
import { ProgressBar } from '../common/progressBar';



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
  overflow:'auto',maxHeight:'calc(100vh - 210px)'
}
const progressBar = {
  position: 'absolute',
  top: '50%',
  //left: 50%;
  left: 'calc(50% - 32px)',
  width: '64px',
  height: '64px',
  zIndex :'9999'
}


export const AllResults = ({ base_url }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [openViewModel, setOpenViewModel] = useState(false)
  const [singleUserAnswers, setSingleUserAnswers] = useState([])
  const [result, setResult] = useState({})
  const [openResultModel,SetOpenResultModel] = useState(false)
  const [loader,setLoader] = useState(true)

  const handleClose = () => { setOpenViewModel(false)}
  const closeResultModel=()=>{SetOpenResultModel(false)}

  useEffect(()=>{
    if(result.levelOne){
      SetOpenResultModel(true)
    }
  },[result])

  useEffect(() => {
    axios.get(base_url + '/all/users')
      .then((res) =>{
         setUsers(res.data) 
         setLoader(false)
      })
      .catch(err => console.log(err))
  }, [])
  const getResults = (email) => {
    setLoader(true)
    axios.get(base_url + `/user/all/records?email=${email}`)
      .then((res) => {
        setSingleUserAnswers(res.data)
        setLoader(false)
        setOpenViewModel(true)
      })
      .catch(err => console.log(err))
  }
  const getSingleResult = (id) => {
    setLoader(true)
    axios.get(base_url + `/userData?id=${id}`)
      .then(res => {
        // console.log(res.data)
        let Mcqs = res.data[0].userAnwers.filter(u => u.userAns)
        let TrueFalse = res.data[0].userAnwers.filter(u => !u.userAns)
        let score = res.data[0].score

        axios.get(base_url + '/getQuestionsForResult').then(res => {
          let levelOne=[]
          res.data.levelOne.forEach(oq=>{  
            if(Mcqs.filter(q=>q.question_id._id===oq._id).length>0){
              levelOne.push(oq)
            }
          })
          levelOne.map((q) => {
              let answers = q.answers.map((a) => {
                let selected = Mcqs.filter(u => u.userAns._id === a._id )
                return { ...a, userAns: selected.length > 0 };  //adding user Answer
              });
            return { ...q, answers };
          });
          let levelTwo = res.data.levelTwo.map((q) => {
            let selected = TrueFalse.filter(e => e.question_id._id === q._id)[0]
            return { ...q, userAns: selected.is_correct ? q.correct_answer : !q.correct_answer }
          });
          setLoader(false)
          setResult({ levelOne: levelOne, levelTwo: levelTwo, score: score })
        }).catch(err => console.log('2', err))
      })
      .catch(err => console.log(err))

  }
  var key = 0
  let quiz_id = 1
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
                users.map(email => (
                  <StyledTableRow key={email}>
                    <StyledTableCell scope="row">
                      {key += 1}
                    </StyledTableCell>
                    <StyledTableCell>
                      {email}
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton edge="end" aria-label="View" onClick={() => { getResults(email) }} >
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
          (singleUserAnswers.length) ?
            <Box p={3}
              sx={{ borderRadius: 16, width: 500 }} style={ModelBox}>
              {
                singleUserAnswers.map(r => (
                  <List key={r._id}
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        {r.createdAt}
                        {r.score}
                      </ListSubheader>

                    }
                  >
                    <ListItem>
                      Score {r.score}
                    </ListItem>
                    <ListItem>
                      <GetResultButton
                        text={"see result"}
                        icon={<ClassIcon />}
                        onClick={() => getSingleResult(r._id)}
                      />
                    </ListItem>

                  </List>
                ))
              }
            </Box> : <div></div>
        }
      </Modal>
      <Modal
        open={openResultModel}
        onClose={closeResultModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
        (result.levelOne) ?
          <Box p={3}
            sx={{ borderRadius: 16 }} style={ModelBox}>
              <h5>Score: {result.score}</h5>
            {
              result.levelOne.map((ob) => (
                <Mcqs 
                key={ob._id}
                 handleChange={()=>{}} 
                 ob={ob}
                 answers={ob.answers}
                 identity={'2'}
                 /> 
                ))
            }
           {
             result.levelTwo.map((ob) => (
              <TrueFalse
              ob={ob}
              handleChange={()=>{}}
              key={ob._id}
              identity={'2'}
              />
          ))
           }
         </Box>:<div></div>
         }
      </Modal>
      {
        loader && <ProgressBar />
      }
    </>
  )
}
