import React from 'react'
import {List, ListItem, ListItemText, ListSubheader} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const Mcqs = ({
    handleChange,
    ob,
    answers,
    identity
}) => {
    return (
        <div>
         {
                
                    <List key={ob._id}>
                        <ListItemText className='MuiListItemText-dense' primary={ob.question + "?"}/>
                        <ListItem>
                            {
                                answers.map((a) => (
                                    <FormControl key={a._id} component="fieldset">
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                value="end"
                                                control=
                                                    {
                                                        (identity==='1')?
                                                        <Checkbox color="primary"
                                                                  checked={a.userAns}
                                                                  onChange={(e) => handleChange(a._id, ob._id)}/>
                                                        :
                                                        (a.userAns===true  && a.is_correct===true)?
                                                        <GreenCheckbox
                                                         checked={true}
                                                         readOnly={true} />
                                                            :
                                                        (a.is_correct!==false)?
                                                        <GreenCheckbox
                                                        checked={true}
                                                        readOnly={true}
                                                        /> :
                                                        (a.userAns===true)?
                                                        <Checkbox style={{color:"red"}}
                                                         checked={a.userAns}
                                                         readOnly={true} 
                                                         indeterminate
                                                         />:
                                                        <Checkbox color="primary"
                                                        checked={false}
                                                        readOnly={true}/>
                                                        // :
                                                        // <Checkbox style={{color:'pink'}}
                                                        // checked={false}
                                                        // readOnly={true}/>
                                                    
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
             
         }
        </div>
    )
}

// Mcqs.defaultProps={
//     levelOne : null,
//     handleChange : ''

// }

export default Mcqs
