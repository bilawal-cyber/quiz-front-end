import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import  IconButton  from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  AddButton: {
    // position: 'relative',
    bottom: theme.spacing(5),
    // right: theme.spacing(1),
  },
  
}));

export  const Addicon=({ onClickAdd })=> {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <div color="primary" className={classes.AddButton}>
          <AddIcon onClick={onClickAdd}/>
        </div>
      </Tooltip>
    </div>
  );
}
export const  Removeicon=({onClick,index})=> {

  return (
    <div>
       <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <DeleteIcon onClick={()=>onClick(index)}/>
        </IconButton>
      </Tooltip>
    </div>
  );
}
