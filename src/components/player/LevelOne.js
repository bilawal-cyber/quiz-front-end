import {List, ListItem, ListItemText, ListSubheader} from '@material-ui/core'
import React from 'react'
import {AddQuestionButton as NextButton} from "../Buttons";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Mcqs from '../common/Mcqs'


const LevelOne = ({levelOne, setLevelOne, errors, setErrors, setlevel}) => {

    const handleChange = (answer_id, q_id) => {
        setLevelOne((prevState) => (
            prevState.map((q) => {
                    if (q._id === q_id) {
                        var answers = q.answers.map((a) => {
                            return {...a, userAns: a._id === answer_id}
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

        if(levelOne.filter(q => !q.answers.filter(a => a.userAns === true).length).length){
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
                     identity={'1'}
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