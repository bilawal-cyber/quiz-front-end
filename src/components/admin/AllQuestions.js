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
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../../index.css'
import BarChat from './BarChat';
import PieChart from './PieChart'


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
var orignalCurrentQuestion='';
var questionListCopy=''
export default function AllQuestions({ base_url }) {
  const classes = useStyles();
  const [questionList, setQuestionList] = useState([])//all questions
  const [currentQuestion, setCurrentQuestion] = useState({}) //single question opened
  const [errors, setErrors] = useState([]); //validation error storage
  const [openViewModel, setOpenViewModel] = useState(false); //charts
  const [openEditModel, setOpenEditModel] = useState(false); //update question
  const [currentButton, setCurrentButton] = useState('') //clicked action button
  const [TrueFalse, setTrueFalse] = useState({ opOne: false, opTwo: false }); //true false checkbox bindings in edit model
  const [chartData,setchartData] = useState([]) //view model chart
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenViewModel(false); setOpenEditModel(false)
  };
  useEffect(() => { //all questions
    axios.get(base_url + '/getQuestions?admin=true')
      .then(res =>{setQuestionList(res.data);questionListCopy=res.data})
      .catch(err => console.log(err))
  }, [])
  useEffect(() => { 
    if (currentButton === 'edit') { //asyn data loaded model
      setOpenEditModel(true)
    }
    if(currentQuestion.ready){ //update question on state ready
      updateFromServer()
    }
  }, [currentQuestion])
  useEffect(()=>{ //asyn data loaded model
    if (chartData.length>0) {
      setOpenViewModel(true)
    }
  },[chartData])
  
  const getSingleQuestion = (id, req) => {
    setCurrentButton(req)
      axios.get(base_url + `/getSingleQuestion?_id=${id}`)
      .then(res =>{
        let question=res.data[0] 
        setCurrentQuestion(question)
        if(req==='View'){
        getAllAnswers(id,question)
        }
        else{ //make copy of question for update track
        orignalCurrentQuestion=question
        if(orignalCurrentQuestion.type==='2'){
        (orignalCurrentQuestion.correct_answer)?setTrueFalse({ opOne: true, opTwo: false }):setTrueFalse({ opOne: false, opTwo: true })
        }
        }
    })
       .catch(err => console.log(err))
  }
  const getAllAnswers=(question_id,question)=>{
    axios.get(base_url+`/view/question?_id=${question_id}`)
    .then(res=>AnalysisData(res.data,question))
    .catch(err=>console.log(err))
  }
  const AnalysisData = (data,currentQuestion) =>{ //chart visualization calculations
    let visual = []  
    if(currentQuestion.answers.length>0){
      currentQuestion.answers.forEach(ans=>{
      visual.push({option:ans.option,count:data.filter(a=>a.userAns===ans._id).length})
      })
      setchartData(visual)
    }else{
      let visual ={true:0,false:0}
      data.forEach(a=>{
        a.is_correct?visual[currentQuestion.correct_answer]+=1:visual[!currentQuestion.correct_answer]=+1
      })
      setchartData([visual])
    }
  }
  const delSingleQuestion = (id) =>{
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.get(base_url+`/del/question?_id=${id}`)
            .then(res=>console.log(res))
              .catch(err=>console.log(err))
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
     
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
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
          let currentOption =  currentQuestion.answers.filter((a) => a._id === id)[0]
          if(!currentOption.is_new){
          axios.get(base_url+`/del/options?_id=${id}`)
          .then(res=>{
            setCurrentQuestion((prevState) => {
              let options = prevState.answers.filter((a) => a._id !== id)
              return { ...prevState, answers: options }
              });
          })
              .catch(err=>console.log(err))
          }else{
            setCurrentQuestion((prevState) => {
              let options = prevState.answers.filter((a) => a._id !== id)
              return { ...prevState, answers: options }
              });
          }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ],
      overlayClassName:'sweet-alert-index'
    });

    
  };
  const handleTrueFalse = (v) => {
    if(v.target.value === "opOne")
      {
        setTrueFalse({ opOne: true, opTwo: false });
        setCurrentQuestion(prev=>(
          {...prev,correct_answer:true}
        ))
      } else{
        setTrueFalse({
          opOne: false,
          opTwo: true,
        });
        setCurrentQuestion(prev=>(
          {...prev,correct_answer:false}
        ))
      }
  };
  const validate = () => {
    if (errors) {
      setErrors((prev) => {
        prev.splice(0, 1);
      });
    }
    if (!currentQuestion.question) {
      setErrors([
        { name: "frontEndEmptyQuestion", message: "please fill out question" },
      ]);
      return false;
    }
    if (currentQuestion.type === "2") {
      if (!TrueFalse.opOne && !TrueFalse.opTwo) {
        setErrors([
          { name: "frontEndTrueFalse", message: "please choose right option" },
        ]);
        return false;
      }
    }

    //MCQS validation
    if (currentQuestion.type === "1") {
      // data.answers = [...options];
      if (currentQuestion.answers.length <= 1) {
        setErrors([
          {
            name: "frontEndOptionsLenght",
            message: "atleast two option are required",
          },
        ]);
        return false;
      }

      if (currentQuestion.answers.filter((a) => !a.option).length) {
        setErrors([
          { name: "frontEndOptions", message: "please fill all options" },
        ]);
        return false;
      }

      if (currentQuestion.answers.filter((a) => a.is_correct).length === 0) {
        setErrors([
          { name: "frontEndCheck", message: "please check the correct one" },
        ]);
        return false;
      }
    }
    return true;
  };
  const updateQuestion = (type) =>{
    if(validate()){
      if(orignalCurrentQuestion.question!==currentQuestion.question){
        setCurrentQuestion(prev=>({...prev,is_change:true}))
    }
    orignalCurrentQuestion.answers.forEach(answer => {
        let current  = currentQuestion.answers.filter(a=>a._id===answer._id)[0]
        if(current){
          let changedId= answer.option!==current.option || answer.is_correct!==current.is_correct? current._id : ''
            setCurrentQuestion(prev=>{
                  let option=prev.answers.map((op) => {
                    return op._id===changedId ? { ...op, is_change: true } : op
                  })
                  return {...prev,answers:option,ready:true}
            })
        }
    });  
    }
  }
  const updateFromServer=()=>{
    axios.post(base_url+'/updateQuestion',currentQuestion)
    .then(res=>{
      questionListCopy[questionListCopy.findIndex(e=>e._id===currentQuestion._id)]=currentQuestion
      setQuestionList(questionList)
      setCurrentQuestion({})
      setOpenEditModel(false)
    })
        .catch(err=>console.log(err))
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
                    <IconButton edge="end" aria-label="Delete" onClick={() => { delSingleQuestion(row._id) }} >
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
               <>
               {
                  currentQuestion.answers.length>0 ?
                    <BarChat barChartData={chartData}/> 
                    :
                    <PieChart piechartData={chartData[0]}/>
                }
               </>
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
                  <AddQuestionButton onClick={() => updateFromServer()} text={"update"} />
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

