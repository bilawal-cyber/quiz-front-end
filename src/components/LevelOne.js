import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Removeicon} from './Icon'

export default function Levelone( {onClick,index} ) {
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

  return (
    <>
      <List>
        <ListItem alignItems="center">
          <Checkbox
            // checked={checked}
            // onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <TextField 
            fullWidth
            // disabled={checked}
            label="Option"
          />
          <Removeicon onClick={onClick} index={index}/>
        </ListItem>
      </List>
    </>
  );
}