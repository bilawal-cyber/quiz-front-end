import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
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
  removeButton:{
    // bottom: theme.spacing(4),
    // right: theme.spacing(3),
    // fontSize:theme.fontSize(20)
  }
  
}));

export  const Addicon=({ onClickAdd })=> {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.AddButton}>
          <AddIcon onClick={onClickAdd}/>
        </Fab>
      </Tooltip>
    </div>
  );
}
export const  Removeicon=({onClickRemove})=> {
  const classes = useStyles();

  return (
    <div>
       <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
