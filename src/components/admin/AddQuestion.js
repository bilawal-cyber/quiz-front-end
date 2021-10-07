import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function AddQuestion({ getLevel, getQuestion, level, validationErrors, setErrors, question, edit }) {

  let key = 0;
  const removeError = () => {
    if(validationErrors){
      setErrors(
        validationErrors.map((err) => {
          return err.name === 'frontEndEmptyQuestion' ? delete err.name : err
        })
    )
    }

  }

  return (
    <FormControl component="fieldset" fullWidth sx={{ m: 5 }}>
        {
          !edit && 
          <>
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
          </>
        }
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
