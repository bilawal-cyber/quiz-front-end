import React from 'react'
import {List, ListItem, ListItemText, ListSubheader} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const Mcqs = ({
    handleChange,
    ob,
    answers
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
                                                        <Checkbox color="primary"
                                                                  checked={a.is_correct}
                                                                  onChange={(e) => handleChange(a._id, ob._id)}/>
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
