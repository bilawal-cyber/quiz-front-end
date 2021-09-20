import { List, ListItem, ListItemText,ListSubheader } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const LevelOne = ({levelOne,setLevelOne}) => {
    const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

//   useEffect(() => {
//       console.log('hy')
//             levelOne.map((ob)=>{
//                     console.log(typeof(ob.answers))
//             })
// }, [1]) 
    return (
    
                    <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                          Level One Questions
                        </ListSubheader>
                      }
                    >
                      {
                          levelOne.map((ob)=>(
                            <List key={ob._id}>
                            <ListItemText className='MuiListItemText-dense'  primary={ob.question+"?"}/>
                                    <ListItem>
                                    {
                                ob.answers.map((a)=>(
                                    <FormControl key={a._id} component="fieldset">
                                    <FormGroup aria-label="position" row>
                                      <FormControlLabel
                                    value="end"
                                    control={<Checkbox color="primary" />}
                                    label={a.option}
                                    labelPlacement="end"
                                    />
                                    </FormGroup>
                                    </FormControl>
                                    ))
                            }
                                    </ListItem>
                            </List>
                          ))
                      }
                    </List>
    )
}

export default LevelOne
