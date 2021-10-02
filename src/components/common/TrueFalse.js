import React from 'react'
import {RadioGroup} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {List, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
const TrueFalse = ({ob,handleChange,identity}) => {
   const wrong={
       color:'red'
   }
    return (
        <List>
        <ListItemText
            className="MuiListItemText-dense"
            primary={ob.question + "?"}
        />
        <ListItem>
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                    {
                    (identity==='1')?
                    <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    onChange={(e) => handleChange(e.target.value, ob._id)}
                >
                    <FormControlLabel
                        value="1"
                        control={<Radio/>}
                        label="True"
                    />
                    <FormControlLabel
                        value="0"
                        control={<Radio/>}
                        label="False"
                    />
                </RadioGroup>:
                  <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  defaultValue={ob.correct_answer.toString()}
              >
                  <FormControlLabel
                      value="true"
                      control={<Radio style={{color:ob.correct_answer && 'green'}}/>}
                      label="True"
                      checked={ob.correct_answer}
                      disabled={!ob.correct_answer}
                  />
                  <FormControlLabel
                      value="false"
                      control={<Radio style={{color:!ob.correct_answer && 'red'}}/>}
                      label="False"
                      checked={!ob.correct_answer}
                      disabled={ob.correct_answer}
                  />
              </RadioGroup>
                    }
                </FormGroup>
            </FormControl>
        </ListItem>
    </List>
    )
}

export default TrueFalse
