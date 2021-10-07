import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
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
  
