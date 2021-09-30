import {List, ListItem, ListItemText, ListSubheader} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import React, {useEffect, useState} from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {AddQuestionButton as NextButton} from "../Buttons";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Mcqs from '../common/Mcqs'


const LevelOne = ({levelOne, setLevelOne, errors, setErrors, setlevel}) => {

    const handleChange = (answer_id, q_id) => {
        setLevelOne((prevState) => (
            prevState.map((q) => {
                    if (q._id === q_id) {
                        var answers = q.answers.map((a) => {
                            return {...a, is_correct: a._id === answer_id}
                        })
                    } else {
                        return q
                    }
                    return {...q, answers}
                }
            )
        ))
    }
    const validateOptions = () => {

        if(levelOne.filter(q => !q.answers.filter(a => a.is_correct === true).length).length){
            setErrors({name: 'optionMissing', message: 'fill out all options'})
            return false
        }

        setErrors('')
        setlevel({one: false, two: true}) //toggle set to MCQS
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
                    <label style={{color: 'red'}}>
                        {errors.message}
                    </label> : ''
            }
            {
                (levelOne.length) ?
                levelOne.map((ob) => (
                    <Mcqs 
                    key={ob._id}
                     handleChange={handleChange} 
                     ob={ob}
                     answers={ob.answers}
                     /> 
                    ))
                    : ''
            }
            <NextButton onClick={() => {
                validateOptions()
            }} text={'next'} icon={<SkipNextIcon/>} disable={false}/>
        </List>
    )
}

export default LevelOne