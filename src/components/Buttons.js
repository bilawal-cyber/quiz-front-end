import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import  IconButton  from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const AddQuestionButton=({onClick,text,icon,disable})=>{
    const classes = useStyles();
        return(
            <Button
            variant="contained"
            style={{backgroundColor:'#aab6fe'}}
            className={classes.button}
            startIcon={icon}
            onClick={onClick}
            disabled={disable}
          >
            {text}
          </Button>
        )
}


export  const Addicon=({ onClickAdd })=> {

    return (
      <div>
          <IconButton onClick={onClickAdd} style={{backgroundColor:"#aab6fe"}}>
            <AddIcon/>
          </IconButton>
      </div>
    );
  }
  export const  Removeicon=({onClick,index})=> {
  
    return (
      <div>
          <IconButton onClick={()=>onClick(index)}>
            <DeleteIcon  style={{color:'#ef5350'}} />
          </IconButton>
      </div>
    );
  }
  
