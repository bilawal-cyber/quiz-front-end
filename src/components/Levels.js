import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

export default function Levels({getLevel}) {

  

//    const handleChange=(event)=>{
//             console.log(event.target.value)
//     }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose Level</FormLabel>
      <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={(event)=>getLevel(event.target.value)}>
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="Start"
          labelPlacement="start"
        />
        <FormControlLabel 
        value="2" 
        control={<Radio color="primary" />} 
        label="End"
        labelPlacement="start"
        />
      </RadioGroup>
      <TextField id="question" label="Question" variant="outlined" size="medium" type="string"/>
    </FormControl>
  );
}
