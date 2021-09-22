import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



const LevelOne = ({ levelOne, setLevelOne }) => {

  const handleChange = (check, answer_id) => {
    setLevelOne((prevState) => (
      prevState.map((q) => {
        let answers = q.answers.map((a) => {
          return a._id === answer_id ? { ...a, is_correct: check } : { ...a, is_correct: false }
        })
        return { ...q, answers }
      }
      )
    ))
  };

  return (

    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Level One Questions
        </ListSubheader>
      }
    >
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
                              onChange={(e) => handleChange(e.target.checked, a._id)} />
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
    </List>
  )
}

export default LevelOne
