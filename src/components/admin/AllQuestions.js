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
import AddQuestion from '../common/AddQuestion';
import AddOptions from '../common/addOptions';
import { Addicon, AddQuestionButton } from "../Buttons";
import AddTrueFalse from '../common/AddTrueFalse';

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
  border: "1px solid rgb(19, 47, 76)"
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
var orignalCurrentQuestion='abc';
export default function AllQuestions({ base_url }) {
  const classes = useStyles();
  const [questionList, setQuestionList] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [errors, setErrors] = useState([]); //validation error storage
  const [openViewModel, setOpenViewModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [currentButton, setCurrentButton] = useState('')
  const [TrueFalse, setTrueFalse] = useState({ opOne: false, opTwo: false });
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenViewModel(false); setOpenEditModel(false)
  };
  useEffect(() => {
    axios.get(base_url + '/getQuestions?admin=true')
      .then(res => setQuestionList(res.data))
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    if (currentButton === 'View') {
      setOpenViewModel(true)
    }
    else if (currentButton === 'edit') {
      setOpenEditModel(true)
    }
  }, [currentQuestion])
  
  const getSingleQuestion = (id, req) => {
    setCurrentButton(req)
    axios.get(base_url + `/getSingleQuestion?_id=${id}`)
      .then(res =>{ setCurrentQuestion(res.data[0])
      orignalCurrentQuestion=res.data[0]
      // console.log('1',orignalCurrentQuestion)
    })
      .catch(err => console.log(err))
  }
  const getQuestion = (v) => {
    setCurrentQuestion({ ...currentQuestion, question: v })
  }
  const id = new Date().getTime()
  const addInputField = () => {
    const newOption = {
      _id: id,
      is_correct: false,
      option: "",
      is_new:true
    };
    setCurrentQuestion(prev => {
      let newOp = [...prev.answers, { ...newOption }]
      return { ...prev, answers: newOp }
    });
  };
  const removeInputField = (id) => {
    setCurrentQuestion((prevState) => {
      let options = prevState.answers.filter((a) => a._id !== id)
      return { ...prevState, answers: options }
    });
  };
  const handleTrueFalse = (v) => {
    v.target.value === "opOne"
      ? setTrueFalse({ opOne: true, opTwo: false })
      : setTrueFalse({
        opOne: false,
        opTwo: true,
      });
  };
  const updateQuestion = (type) =>{
    if(orignalCurrentQuestion.question!==currentQuestion.question){
        setCurrentQuestion(prev=>({...prev,is_change:true}))
    }
    orignalCurrentQuestion.answers.forEach(answer => {
        let current  = currentQuestion.answers.filter(a=>a._id===answer._id)[0]
        // let newOp  = currentQuestion.answers.filter(a=>a._id!==answer._id)[0]
        if(current){
          let changedId= answer.option!==current.option? current._id : ''
            setCurrentQuestion(prev=>{
                  let option=prev.answers.map((op) => {
                    return op._id===changedId ? { ...op, is_change: true } : op
                  })
                  return {...prev,answers:option}
            })
        }
    });
  }

  var tableId = 0

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
                <StyledTableCell>Question</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionList.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell scope="row">
                    {tableId += 1}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.question}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton edge="end" aria-label="Edit" onClick={() => { getSingleQuestion(row._id, 'edit') }} >
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="Delete" onClick={() => { getSingleQuestion(row._id, 'delete') }} >
                      <Delete />
                    </IconButton>
                    <IconButton edge="end" aria-label="View" onClick={() => { getSingleQuestion(row._id, 'View') }} >
                      <Visibility />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {(Object.keys(currentQuestion).length !== 0) ?
        <>
          <Modal
            open={openViewModel}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box p={3}
              sx={{ borderRadius: 16 }} style={ModelBox}
              mt={1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {currentQuestion.question}
              </Typography>
              <List>
                {
                  currentQuestion ?
                    currentQuestion.answers.map(a => (
                      <ListItem key={a._id}>
                        <ListItemText>
                          {a.option}
                        </ListItemText>
                      </ListItem>
                    )) :
                    <ListItem>
                      <ListItemText>
                        {currentQuestion.correct_answer.toString()}
                      </ListItemText>

                    </ListItem>
                }
              </List>
            </Box>
          </Modal>
          <Modal
            open={openEditModel}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box p={3}
              sx={{ borderRadius: 16 }} style={ModelBox}
              mt={1}>
              <AddQuestion
                getLevel={() => { console.log('2') }}
                getQuestion={getQuestion}
                level={currentQuestion.type}
                validationErrors={errors}
                setErrors={setErrors}
                question={currentQuestion.question}
                update={true}
              />
              {currentQuestion.type === "1" ? (
                <Box
                  style={box}
                  className={classes.root}
                  mt={1}
                  p={3}
                  sx={{ borderRadius: 16, width: 500 }}
                  justifyContent="center"
                >
                  <Addicon onClickAdd={addInputField} />
                  <List>
                    <AddOptions
                      options={currentQuestion.answers}
                      // setProgessBarShow={setProgessBarShow}
                      onClick={removeInputField}
                      setOptions={setCurrentQuestion}
                      update={true}
                    />
                    {(currentQuestion.answers && currentQuestion.answers.length) > 0 ? (
                      <AddQuestionButton onClick={()=>updateQuestion(currentQuestion.type)} text={"update"} />
                    ) : (
                      "Add options"
                    )}
                  </List>
                </Box>
              ) : (
                ""
              )}
              {currentQuestion.type === "2" ? (
                <>
                  <AddTrueFalse TrueFalse={TrueFalse} handleTrueFalse={handleTrueFalse} />
                  <AddQuestionButton onClick={() => console.log('here')} text={"update"} />
                </>
              ) : (
                ""
              )}

            </Box>
          </Modal>
        </>
        : ""
      }
    </>
  );
}

