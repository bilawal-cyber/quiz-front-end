import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Levels from '../components/Levels'
import LevelOne from './LevelOne';
import {Addicon} from './Buttons';
import {AddQuestionButton} from './Buttons';
import axios  from 'axios';

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






export default function Dashboard() {


    const [options, setOptions] = useState([]);

    const [Question, setQuestion] = useState('');

    // const [finalState,setFinalState] = useState({})

    const base_url='http://127.0.0.1:5000/api';

    const [level, setLevel] = useState(
            {
                levelOne:false,
                levelTwo:false
            }
    );
//choose option
    const getLevel=(value)=>{
        (value==='1') ?
            setLevel(
                {
                    levelOne: !level.levelOne,
                    levelTwo: false,
                }
            )
        :
            setLevel(
                {
                    levelOne: false,
                    levelTwo: !level.levelTwo,
                }
            );
        
    }

//catch question and store 
    const getQuestion=(v)=>{
        setQuestion(v)
    }


//add options
  const addInputField = () => {
    const id= new Date().getTime()
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
        const type = level.levelOne ? '1' : '2';
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

    const box={
      background: "#d1d9ff",
      border:"1px solid rgb(19, 47, 76)"
    }


  const classes = useStyles();



  return (
    <div className={classes.root}>
      <main className={classes.content} style={{backgroundColor:"#333"}}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={10} justifyContent="center">
                <Grid  item xs={8}>
                <Box  className={classes.root} p={4} justifyContent="center"
                 sx={{ borderRadius: 16 }} style={box}
                >
                    <Levels getLevel={getLevel} getQuestion={getQuestion}/>
                </Box>
                

                        {level.levelOne && 
                            <>
                                <Box style={box} className={classes.root} mt={2} p={2} 
                                sx={{ borderRadius: 16 }} justifyContent="center"
                                >
                                <Addicon onClickAdd={addInputField}/>
                                <List>
                                    <LevelOne options={options} onClick={removeInputField} setOptions={setOptions}/>
                                {options.length>0 ?
                                <AddQuestionButton onClick={finalCall}/>
                                :'Add options'} 
                                </List>
                                
                                </Box>
                            </>

                        }
                       
           

                {level.levelTwo &&
                        <Box  className={classes.root} mt={4} justifyContent="center"
                        sx={{ borderRadius: 16 }} style={box}
                        >
                        <h3>True false</h3>
                        </Box>
                }
                </Grid>
                <Grid  item xs={12} >
                <Box>

                </Box>
                </Grid>
                <Grid  item xs={12} >
                <Box>

                </Box>
                </Grid>
                </Grid>
        </Container>
      </main>
    </div>
  );
}