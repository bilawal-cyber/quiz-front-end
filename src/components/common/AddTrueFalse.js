import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AddTrueFalse = ({TrueFalse,handleTrueFalse}) => {
    return (
        <FormGroup aria-label="position" row>
        <FormControlLabel
          value="opOne"
          control={
            <Checkbox
              style={{ color: "#4b636e" }}
              onChange={(e) => handleTrueFalse(e)}
              checked={TrueFalse.opOne}
            />
          }
          label="True"
          labelPlacement="start"
        />
        <FormControlLabel
          value="opTwo"
          control={
            <Checkbox
              style={{ color: "#4b636e" }}
              onChange={(e) => handleTrueFalse(e)}
            />
          }
          label="False"
          labelPlacement="start"
          checked={TrueFalse.opTwo}
        />
      </FormGroup>
    )
}

export default AddTrueFalse
