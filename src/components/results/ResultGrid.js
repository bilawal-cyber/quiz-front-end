import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid, ListItem } from '@material-ui/core';
import Table from './Table'
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { AddQuestionButton as GetResultButton } from "../Buttons";
import {List, ListSubheader} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import axios from 'axios';
import Mcqs from '../common/Mcqs';
import TrueFalse from '../common/TrueFalse';
export default function ResultGrid({ result, setResults, base_url }) {

  const [AllRecords,setAllRecords] = useState([])

  const box = {
    background: "#d1d9ff",
    border: "1px solid rgb(19, 47, 76)"
  }
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const validateEmailOnInput = (v) => { //real time email validation
    setErrors({ name: "email", message: "email should be valid" });
    var validRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (v.value.match(validRegex)) {
      setEmail(v.value);
      setErrors("");
    }
  };

  const getAllQuizes = () =>{
      axios.get(base_url+`/user/all/records?email=${email}`)
                .then(res=>setAllRecords(res.data))
                    .catch(err=>console.log(err))
  }

  const getResult = (id) => {
    if (!email) {
      setErrors({ name: "email", message: "email is required" });
      return false;
    }
    axios.get(base_url + `/userData?id=${id}`)
    .then(res =>{
      let backendDataOne = res.data[0].userAnwers.filter(u=>u.userAns)
      let backendDatatwo =  res.data[0].userAnwers.filter(u=>!u.userAns)
      let score = res.data[0].score
 
        axios.get(base_url+'/getQuestions').then(res=>{
          let levelOne=res.data.levelOne.map((q) => {
            let answers = q.answers.map((a) => {
              let selected = backendDataOne.filter(u=>u.userAns._id===a._id)
              return { ...a, userAns:selected.length>0};  //adding user Answer
            });
            return { ...q, answers };
          });
          let levelTwo = res.data.levelTwo.map((q) => {
            let selected = backendDatatwo.filter(e=>e.question_id._id===q._id)[0]
            return { ...q, userAns: selected.is_correct?q.correct_answer:!q.correct_answer }
          });
          setResults({levelOne:levelOne,levelTwo:levelTwo,score:score})
        }).catch(err=>console.log('2',err))
      })
      .catch(err => setErrors({ name: 'backend', message: err.response.data.emailNotExist }))
  }


  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  return (
    <Grid item  >
       {
          (AllRecords.length)?
          <Box  p={3}
            sx={{ borderRadius: 16, width: 500 }} style={box}>
        {
              AllRecords.map(r=>(
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
                onClick={()=>getResult(r._id)}
              />
              </ListItem>

                  </List>
              ))
            }
        </Box>:''
        }
      {
        (result.levelOne) ?
        <>
          <Box p={3}
            sx={{ borderRadius: 16 }} style={box}>
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
          </Box>
           <Box  p={3}
            sx={{ borderRadius: 16 }} style={box}>
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
         </Box>
          </>
          :
          <Box p={3} sx={{ borderRadius: 16, width: 700 }} style={box}>
            <FormControl component="fieldset" fullWidth sx={{ m: 5 }}>
              <FormLabel component="legend">Email</FormLabel>
              <TextField
                label="Type your email to get result"
                variant="outlined"
                type="string"
                error={errors && errors.name === "email" ? true : false}
                onChange={(e) => {
                  validateEmailOnInput(e.target);
                }}
              />
              {errors && (errors.name === "email" || errors.name === "backend") ? (
                <label style={{ color: "red" }}>{errors.message}</label>
              ) : (
                ""
              )}
              <GetResultButton
                text={"Show Results"}
                icon={<ClassIcon />}
                onClick={getAllQuizes}
              />
            </FormControl>
            {/* {
              AllRecords.map(r=>(
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
                onClick={()=>getResult(r._id)}
              />
              </ListItem>

                  </List>
              ))
            } */}
          </Box>
      }
       
    </Grid>
  );
}