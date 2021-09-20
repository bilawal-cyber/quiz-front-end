import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import LevelOne from './LevelOne';
import axios from 'axios';
import { FormControl,FormLabel,TextField } from '@material-ui/core';
import { AddQuestionButton as UploadEmail} from '../Buttons';

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },
//   toolbarIcon: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: '0 8px',
//     ...theme.mixins.toolbar,
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   menuButtonHidden: {
//     display: 'none',
//   },
//   title: {
//     flexGrow: 1,
//   },
//   drawerPaper: {
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerPaperClose: {
//     overflowX: 'hidden',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     width: theme.spacing(7),
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9),
//     },
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'auto',
//     flexDirection: 'column',
//   },
//   fixedHeight: {
//     height: 240,
//   },
}));






export default function PlayerGrid({base_url}) {

    const box={
      background: "#d1d9ff",
      border:"1px solid rgb(19, 47, 76)"
    }

    const [levelOne,showLevelOne] = useState([])

    const [level,setlevel] =useState({
      one:false,
      two:false
    })

    // useEffect(() => {
    //       axios.get(base_url+'/getQuestionsLevelOne')
    //               .then((res)=>showLevelOne(res.data))
    //                   .catch(err=>console.log(err))
    // }, [1])

    const [email,setEmail] = useState('')

  const classes = useStyles();
      const getEmail=(v)=>{
        var validRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
        if (v.value.match(validRegex)) {
              setEmail(v.value)
        }else{
          setlevel({one:false,two:false})
        }
      }

      const checkEmail=()=>{
        axios.post(base_url+'/createUser',{email:email})
        .then(()=>{
          axios.get(base_url+'/getQuestionsLevelOne')
          .then((res)=>showLevelOne(res.data))
              .catch(err=>console.log(err))
        setlevel({one:true,two:false})                      
        })
        .catch((err)=>{
            console.log(err.response)
        })
      }


  return (
    <Grid item  >
      <Box p={3} 
     sx={{ borderRadius: 16, width:500 }} style={box}>
      <FormControl component="fieldset" fullWidth sx={{ m: 5 }}>
      <FormLabel component="legend">Email</FormLabel>
      <TextField
       label="Type your email" 
      variant="outlined"
      type="string" 
      error={false}
       onChange={(e)=>{getEmail(e.target)}}/>
      <UploadEmail  text={'next'}  onClick={checkEmail}/>
    </FormControl>
      </Box>


    {
      level.one &&
      <Box p={3} mt={2}
     sx={{ borderRadius: 16, width:500 }} style={box}>
      <LevelOne levelOne={levelOne} showLevelOne={showLevelOne}/>
    </Box>
    }
    </Grid>
  );
}