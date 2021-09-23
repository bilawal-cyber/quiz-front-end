import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AddQuestionButton as SubmitAnswer } from "../Buttons";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { RadioGroup } from '@material-ui/core';
import Radio from '@material-ui/core/Radio'


const LevelTwo = ({ levelTwo, setLevelTwo, errors, setErrors, setlevel }) => {

    const [value, setValue] = React.useState('');

  const handleChange = (v,id) => {
            setLevelTwo(
                levelTwo.map(q=>{
                    return q._id===id ? {...q,correct_answer:v} : q
                })
            )
  };
      const validateOptions=()=>{
          levelTwo.every(element => {
                 if(element.correct_answer===null){
                     setErrors({name:'trueFalse',message:'fill out all options'})
                     return false
                 }else{
                     setErrors('')
                 }
                 return true
          });
      }




    return (

        <List
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Level Two Questions
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
                (levelTwo.length) ?
                    levelTwo.map((ob) => (
                        <List key={ob._id}>
                            <ListItemText className='MuiListItemText-dense' primary={ob.question + "?"} />
                            <ListItem>

                                <FormControl component="fieldset">
                                    <FormGroup aria-label="position" row>
                                        <RadioGroup row
                                         aria-label="gender" 
                                         name="row-radio-buttons-group"
                                         onChange={(e)=>handleChange(e.target.value,ob._id)}
                                         >
                                        <FormControlLabel value="true" control={<Radio />} label="True" />
                                        <FormControlLabel value="false" control={<Radio />} label="False" />
                                        </RadioGroup>

                                    </FormGroup>
                                </FormControl>

                            </ListItem>
                        </List>
                    )) : ''
            }
            <SubmitAnswer  onClick={()=>{validateOptions()}} text={'Submit'} icon={<SkipNextIcon />}/>
        </List>
    )
}

export default LevelTwo
