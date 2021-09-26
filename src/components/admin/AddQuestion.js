import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { ListItem, List } from '@material-ui/core';

export default function AddQuestion({ getLevel, getQuestion, level, validationErrors, setErrors, question }) {

  let key = 0;
  const removeError = () => {
    setErrors(
        validationErrors.map((err) => {
          return err.name === 'frontEndEmptyQuestion' ? delete err.name : err
        })
    )
  }

  return (
    <FormControl component="fieldset" fullWidth sx={{ m: 5 }}>
      <FormLabel component="legend">Choose Level</FormLabel>
      <RadioGroup row aria-label="position"
        name="position" defaultValue="top"
        onChange={(event) => getLevel(event.target.value)}>
        <FormControlLabel
          value={(level === '1') ? level : '1'}
          control={<Radio color="default" />}
          label="One"
          labelPlacement="start"
        />
        <FormControlLabel
          value={(level === '2') ? level : '2'}
          control={<Radio color="default" />}
          label="Two"
          labelPlacement="start"
        />
      </RadioGroup>
      <TextField id="question"
        label="Question"
        variant="outlined"
        type="string"
        value={question}
        error={(validationErrors && validationErrors.filter(e=>e.name==="frontEndEmptyQuestion").length>0) ? true : false}
        onKeyUp={removeError}
        onChange={(e) => getQuestion(e.target.value)} />
      {
        (validationErrors) ?
          <List>
            {
              validationErrors.map(element => (
                <ListItem key={key = key + 1}>
                  <label style={{ color: 'red' }}>
                    {element.message} 
                  </label>
                </ListItem>
              ))
            }
          </List>
          : ''
      }

    </FormControl>
  );
}
