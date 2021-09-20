import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

export default function AddQuestion({getLevel, getQuestion, level ,validationError, setErrors,question}) {

    const removeError=()=>{
            setErrors(
              (validationError.levelOne && validationError.levelOne.question)?
                delete validationError.levelOne : ''
              
            )
    }
  

  return (
    <FormControl component="fieldset" fullWidth sx={{ m: 5 }}>
      <FormLabel component="legend">Choose Level</FormLabel>
      <RadioGroup row aria-label="position"
       name="position" defaultValue="top"
        onChange={(event)=>getLevel(event.target.value)}>
        <FormControlLabel
          value={(level==='1')?level:'1'}
          control={<Radio color="default" />}
          label="One"
          labelPlacement="start"
        />
        <FormControlLabel 
        value={(level==='2')?level:'2'} 
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
      error={(validationError.levelOne && validationError.levelOne.question)?true:false}
      onKeyUp={removeError}
       onChange={(e)=>getQuestion(e.target.value)}/>
       {
         (validationError.levelOne && validationError.levelOne.question)? 
         <label style={{color:'red'}}>
                {validationError.levelOne.question}
         </label>
         :''
       }
              {
         validationError.levelOne && validationError.levelOne.options? 
         <label style={{color:'red'}}>
                {validationError.levelOne.options}
         </label>
         :''
       }

        {
         (validationError.levelTwo && validationError.levelTwo.question)? 
         <label style={{color:'red'}}>
                {validationError.levelTwo.question}
         </label>
         :''
       }

    </FormControl>
  );
}
