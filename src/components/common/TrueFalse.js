import React from 'react'
import {RadioGroup} from "@mui/material";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {List, ListItem, ListItemText, ListSubheader} from "@mui/material";
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
                      control={<Radio style={{color:ob.correct_answer===ob.userAns?'green':''}}/>}
                      label="True"
                      checked={ob.correct_answer===ob.userAns}
                    //   disabled={ob.correct_answer!==ob.userAns}
                  />
                  <FormControlLabel
                      value="false"
                      control={<Radio style={{color:ob.correct_answer!==ob.userAns? 'red':''}}/>}
                      label="False"
                      checked={ob.correct_answer!==ob.userAns}
                    //   disabled={ob.correct_answer===ob.userAns}
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
