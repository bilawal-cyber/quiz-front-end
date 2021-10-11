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
const ModelBox={
  background: "#d1d9ff",
  border: "1px solid rgb(19, 47, 76)",
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
}

export default function AllQuestions({ base_url }) {
  const classes = useStyles();
  const [questionList, setQuestionList] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState([])
  const [errors, setErrors] = useState([]); //validation error storage
  const [openViewModel, setOpenViewModel] = useState(false);
  const [openEditModel,setOpenEditModel] = useState(false);
  const [currentButton,setCurrentButton] = useState('')
  // const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpenViewModel(false); setOpenEditModel(false)};
  useEffect(() => {
    axios.get(base_url + '/getQuestions?admin=true')
      .then(res => setQuestionList(res.data))
      .catch(err => console.log(err))
  }, [])
  useEffect(()=>{
     if(currentButton==='View'){
       setOpenViewModel(true)}
     else if(currentButton==='edit'){
       setOpenEditModel(true)}
  },[currentQuestion])
  const getSingleQuestion = (id,req) => {
    setCurrentButton(req)
    axios.get(base_url + `/getSingleQuestion?_id=${id}`)
      .then(res => setCurrentQuestion(res.data))
      .catch(err => console.log(err))
  }
  const getQuestion = (v) => {
    setCurrentQuestion({...currentQuestion[0],question:v})
  }
  
  var id = 0

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
                  {id += 1}
                </StyledTableCell>
                <StyledTableCell>
                  {row.question}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton edge="end" aria-label="Edit" onClick={() => { getSingleQuestion(row._id,'edit') }} >
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="Delete" onClick={() => { getSingleQuestion(row._id,'delete') }} >
                    <Delete />
                  </IconButton>
                  <IconButton edge="end" aria-label="View" onClick={() => { getSingleQuestion(row._id,'View') }} >
                    <Visibility />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    {(currentQuestion.length)?
        <>
          <Modal
      open={openViewModel}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box   p={3}
      sx={{ borderRadius: 16 }} style={ModelBox} 
      mt={1}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {currentQuestion[0].question}
        </Typography>
         <List>
         {
            currentQuestion[0].answers.length?
            currentQuestion[0].answers.map(a=>(
              <ListItem key={a._id}>
                <ListItemText>
                  {a.option}
                </ListItemText>
              </ListItem>
  )):
            <ListItem>
                              <ListItemText>
                         {currentQuestion[0].correct_answer.toString()}
                </ListItemText>

            </ListItem>
         }
         </List>
      </Box>
    </Modal>
        {/* <Modal
        open={openEditModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box   p={3}
        sx={{ borderRadius: 16 }} style={ModelBox} 
        mt={1}>
        <AddQuestion
        getLevel={()=>{console.log('2')}}
        getQuestion={getQuestion}
        level={currentQuestion[0].type}
        validationErrors={errors}
        setErrors={setErrors}
        question={currentQuestion[0].question}
        update={true}
        />
        </Box>
      </Modal> */}
        </>
     :"" 
     }
{
  (currentButton==='edit' && currentQuestion[0])?
  <Box  p={3}
  sx={{ borderRadius: 16 }} style={box} 
  mt={1}>
  <AddQuestion
     getLevel={()=>{console.log('2')}}
     getQuestion={getQuestion}
     level={currentQuestion[0].type}
     validationErrors={errors}
     setErrors={setErrors}
     question={currentQuestion[0].question}
     update={true}
     />
  </Box>:''
}
    </>
  );
}







// const AllQuestions = ({base_url}) => {

//     const [questionList,setQuestionList] = useState([])
//     const [currentQuestion,setCurrentQuestion] = useState([])
//     const [errors, setErrors] = useState([]); //validation error storage
//     useEffect(()=>{
//         axios.get(base_url+'/getQuestions?admin=true')
//                 .then(res=>setQuestionList(res.data))
//                     .catch(err=>console.log(err))
//     },[])
//     const editQuestion = (id) =>{
//         axios.get(base_url+`/getSingleQuestion?_id=${id}`)
//                     .then(res=>setCurrentQuestion(res.data))
//                             .catch(err=>console.log(err))        
//     }
//     const getQuestion=(v)=>{
//         setCurrentQuestion((prevState) => [...prevState, { question:v }])
//     }
//     const box={
//         background: "#d1d9ff",
//         border:"1px solid rgb(19, 47, 76)"
//       }

//     return (
//         <div>
//             {
//                 <Box   p={3} 
//                 sx={{ borderRadius: 16, width:1000 }} style={box} mt={1}>
//                             <MaterialTable
//                             style={{background:'#d1d9ff'}}
//                              icons={tableIcons}
//       title="Positioning Actions Column Preview"
//       columns={[
//         { title: 'Name', field: 'name' },
//         { title: 'Surname', field: 'surname' },
//         { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//         {
//           title: 'Birth Place',
//           field: 'birthCity',
//           lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//         },
//       ]}
//       data={[
//         { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//       ]}
//       actions={[
//         {
//           icon: Edit,
//           tooltip: 'Edit Question',
//           onClick: (event, rowData) => alert("You saved " + rowData.name)
//         },
//         {
//           icon: Clear,
//           tooltip: 'Delete Question',
//           onClick: (event, rowData) => alert("You want to delete " + rowData.name),
//         }
//       ]}
//       options={{
//         actionsColumnIndex: -1
//       }}
//     />
//                 </Box>
//             }
//              {/* <Box 
//                   p={3} 
//                  sx={{ borderRadius: 16,width:400 }} style={box} mt={1}
//                 >
//                    {
//                        questionList.map(q=>(
//                         <List key={q._id}>
//                         <ListItem>
//                       <ListItemAvatar>
//                         <Avatar>
//                           <FolderIcon />
//                         </Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={q.question}
//                         secondary={q.type}
//                       />
//                       <ListItemSecondaryAction>
//                         <IconButton edge="end" aria-label="delete" onClick={()=>editQuestion(q._id)} >
//                           <DeleteIcon/>
//                         </IconButton>
//                         <IconButton edge="end" aria-label="Edit" onClick={()=>editQuestion(q._id)} >
//                           <EditIcon />
//                         </IconButton>
//                       </ListItemSecondaryAction>
//                     </ListItem>
//                         </List>
//                        ))
//                    }
//                 </Box> */}
//                 {/* {
//                     currentQuestion.length ?
//                     <Box  p={3} 
//                     sx={{ borderRadius: 16,width:400 }} style={box} mt={1}>
//                     <AddQuestion
//                     getLevel={()=>console.log('pending')}
//                     getQuestion={()=>{}}
//                     level={currentQuestion[0].type}
//                     validationErrors={errors}
//                     setErrors={setErrors}
//                     question={currentQuestion[0].question}
//                     edit={true}
//                     />
//         </Box>:''

//                 } */}
//         </div>
//     )
// }

// export default AllQuestions
