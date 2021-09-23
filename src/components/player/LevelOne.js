import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AddQuestionButton as NextButton } from "../Buttons";
import SkipNextIcon from '@material-ui/icons/SkipNext';


const LevelOne = ({ levelOne, setLevelOne, errors, setErrors,setlevel }) => {

  const handleChange = (answer_id,q_id) => {
    setLevelOne((prevState) => (
      prevState.map((q) => {
          if(q._id===q_id){
            var answers = q.answers.map((a) => {
              return { ...a, is_correct: a._id === answer_id }
           })
          }else{
            return q
          }
        return { ...q, answers }
      }
      )
    ))
  }
  const validateOptions=()=>{
      levelOne.every(element => {
            let length = element.answers.length
            let arr=[]
            element.answers.forEach(a=>{
              if(a.is_correct===false){
                arr.push(a.option)
              }
            })
            if(length===arr.length){
              setErrors({name:'optionMissing',message:'fill out all options'})
              return false
            }
            if(arr.length>1){
              console.log(length,arr.length)
              setlevel({ one: false, two: true }) //toggle set to MCQS)
              setErrors('')
            }
            return true
            

            
      });
  }




  return (

    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Level One Questions
        </ListSubheader>
      }
    >
           {
        (errors) ?
                  <label style={{ color: 'red' }}>
                    {errors.message}
                  </label>    :''
      }
      {
        (levelOne.length) ?
          levelOne.map((ob) => (
            <List key={ob._id}>
              <ListItemText className='MuiListItemText-dense' primary={ob.question + "?"} />
              <ListItem>
                {
                  ob.answers.map((a) => (
                    <FormControl key={a._id} component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value="end"
                          control=
                          {
                            <Checkbox color="primary"
                              checked={a.is_correct}
                              onChange={(e) => handleChange(a._id,ob._id)} />
                          }
                          label={a.option}
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                  ))
                }
              </ListItem>
            </List>
          )) : ''
      }
      <NextButton  onClick={()=>{validateOptions()}} text={'next'} icon={<SkipNextIcon />} disable={false}/>
    </List>
  )
}

export default LevelOne
