import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import  IconButton  from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const AddQuestionButton=({onClick})=>{
    const classes = useStyles();
        return(
            <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={onClick}
          >
            Upload
          </Button>
        )
}


export  const Addicon=({ onClickAdd })=> {

    return (
      <div>
        <Tooltip title="Add">
          <IconButton>
            <AddIcon onClick={onClickAdd}/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
  export const  Removeicon=({onClick,index})=> {
  
    return (
      <div>
         <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={()=>onClick(index)}/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
  
