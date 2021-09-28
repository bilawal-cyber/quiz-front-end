import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function ResultGrid({result}) {

    const box={
      background: "#d1d9ff",
      border:"1px solid rgb(19, 47, 76)"
    }


    // function createData(name, calories, fat, carbs, protein) {
    //   return { name, calories, fat, carbs, protein };
    // }
    
    // const rows = [
    //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];


    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    const classes = useStyles();

  return (
    <Grid item  >
    {result.length ?
    <Box   p={3} 
    sx={{ borderRadius: 16 }} style={box}>
     <TableContainer component={Paper} style={{background:'#d1d9ff'}}>
     <h3>your score </h3>
     <Table className={classes.table}  aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>question</TableCell>
           <TableCell align="right">your answer</TableCell>
           <TableCell align="right">Is Correct</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {result.map((r) => (
           <TableRow key={r._id}>
             <TableCell component="th" scope="row">
               <h5>hel</h5>
             </TableCell>
             {/* <TableCell align="right">{r.answer_id.option}</TableCell>
             <TableCell align="right">{r.is_correct}</TableCell> */}
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
   </Box> : ''
   }
    </Grid>
  );
}