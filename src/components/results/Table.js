import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Mcqs from '../common/Mcqs';
import TrueFalse from '../common/TrueFalse'

export default function ResultGrid({result}) {
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* {
        result[0].userAnwers.map(e=>(
           (!e.selected)?
           <Mcqs 
           key={e._id}
           ob={e}
           question={e.question_id.question}
           answers={[e.selected]}
           /> : 
           <TrueFalse />
        ))
        } */}
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