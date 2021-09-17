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
            style={{backgroundColor:'#aab6fe'}}
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
          <IconButton style={{backgroundColor:"#aab6fe"}}>
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
            <DeleteIcon onClick={()=>onClick(index)} style={{color:'#ef5350'}} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
  
