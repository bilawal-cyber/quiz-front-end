import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import AddQuestion from './AddQuestion'
import AddOptions from './addOptions';
import {Addicon,AddQuestionButton} from '../Buttons';
import axios  from 'axios';
import { Grid } from '@material-ui/core';
import  LinearProgress  from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));






export default function AdminGrid() {

  const id= new Date().getTime()
    const [options, setOptions] = useState(
      [
          {
              index : id ,
              is_correct: false,
              option: ''
          },
      ]
      );

    const [Question, setQuestion] = useState('');

    // const [finalState,setFinalState] = useState({})

    const base_url='http://127.0.0.1:5000/api';

    const [level, setLevel] = useState('');
//choose option
    const getLevel=(value)=>{
      console.log(value);

        (value==='1') ?
            setLevel('1')
        :
            setLevel('2');
        
    }

    const [progressBarShow,setProgessBarShow] = useState(false)

//catch question and store 
    const getQuestion=(v)=>{
        setQuestion(v)
    }


//add options
  const addInputField = () => {
    // const id= new Date().getTime()
    const newOption = {
        index : id ,
        is_correct: false,
        option: ''
    }
    setOptions(prevState=>([
        ...prevState,{...newOption}
    ]));
  }


//remove options
  const removeInputField= (id) =>{
        setOptions(prevState=>(
            prevState.filter(f=>f.index !== id)
        ))
            
                
  }

  
//combine answer and questions

  const finalCall=()=>{
        const type = level;
        const data = {
            type : type,
            question : Question,
            answers : [
                ...options
            ]
        }
        // setFinalState(data)  

        axios.post(base_url+'/createQuestion',data)
            .then((res)=>console.log(res))
                .catch((error)=>console.log(error))



  }

  const handleTrueFalse=()=>{
    console.log('yes')
  }


    const box={
      background: "#d1d9ff",
      border:"1px solid rgb(19, 47, 76)"
    }


  const classes = useStyles();

 

  return (
                <Grid item>
                <Box  p={3} justifyContent="center"
                 sx={{ borderRadius: 16, width: 500 }} style={box} 
                >
                    <AddQuestion getLevel={getLevel} getQuestion={getQuestion} level={level} />
                    {level==='2'?
                     
                         <FormGroup aria-label="position" row>
                           <FormControlLabel
                             value="true"
                             control={<Checkbox  style={{color:"#4b636e"}} 
                             onChange={handleTrueFalse}
                             checked={true}
                             />
                            }
                             label="True"
                             labelPlacement="start"
                           />
                             <FormControlLabel
                             value="false"
                             control={<Checkbox  style={{color:"#4b636e"}}
                              onChange={handleTrueFalse}/>}
                             label="False"
                             labelPlacement="start"
                           />
                         </FormGroup> : ''
                     
                }
                </Box>
                {
                  progressBarShow &&
                  <LinearProgress style={{padding:"2px", borderRadius:"16px"}}/>
                }
                
                        {level==='1' ? 
                                <Box style={box} className={classes.root} mt={1} p={3} 
                                sx={{ borderRadius: 16, width: 500 }} justifyContent="center"
                                >
                                <Addicon onClickAdd={addInputField}/>
                                <List>
                                    <AddOptions options={options}
                                    setProgessBarShow={setProgessBarShow}
                                     onClick={removeInputField}
                                     setOptions={setOptions}/>
                                {options.length>0 ?
                                <AddQuestionButton onClick={finalCall}/>
                                :'Add options'} 
                                </List>
                                
                                </Box> : ''
                        }
                </Grid>
  );
}