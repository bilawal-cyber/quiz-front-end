import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
// import Box from '@material-ui/core/Box';
// import { Grid } from '@material-ui/core';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import axios from 'axios';

export default function ResultGrid({result}) {
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    const classes = useStyles();

  return (
    <div className={classes.root}>
    <List component="nav" aria-label="secondary mailbox folder">
      <ListItem>
        <ListItemText primary="Trash" />
        <ListItemText primary="Trash" />
        <ListItemText primary="Trash" />
      </ListItem>
    </List>
    <List component="nav" aria-label="main mailbox folders">
    <Divider />
      <ListItem>
        <ListItemText primary="{correctone}" />
      </ListItem>
      
    </List>
  </div>
  //   <TableContainer component={Paper} style={{background:'#d1d9ff'}}>
  //   <h3>your score {result[0].score}</h3>
  //   <Table className={classes.table}  aria-label="simple table">
  //     <TableHead>
  //       <TableRow>
  //         <TableCell>question</TableCell>
  //         <TableCell align="right">your answer</TableCell>
  //         <TableCell align="right">Is Correct</TableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //         {
  //           result[0].userAnwers.map(e=>(
  //            <TableRow key={e._id}>
  //            <TableCell component="th" scope="row">
  //              <h5>{e.question_id.question}</h5>
  //            </TableCell>
  //            <TableCell align="right">
  //              {
  //            (e.selected)?
  //            e.selected.option:
  //            (e.is_correct) ?
  //            e.question_id.correct_answer.toString() :
  //            (!e.question_id.correct_answer).toString()

                     
                     
  //            }
  //            </TableCell>
  //            <TableCell align="right">{`${e.is_correct}`}</TableCell>
  //          </TableRow>
  //           ))
  //         }

  //     </TableBody>
  //   </Table>
  // </TableContainer>
  );
}