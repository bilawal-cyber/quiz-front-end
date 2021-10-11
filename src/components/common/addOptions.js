// import React from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Removeicon } from '../Buttons';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState } from "react";



export default function AddOptions({ options, onClick, setOptions, setProgessBarShow,update }) {


  const setOption = (v, id) => {
    if(!update){
      setOptions(
        options.map((op) => {
          return op._id === id ? { ...op, option: v } : op
        })
      )
    }else{
      setOptions(prev=>{
        let option=prev.answers.map((op) => {
          return op._id === id ? { ...op, option: v } : op
        })
        return {...prev,answers:option}
      }

      )
    }
  }

  const setIsTrue = (check, id) => {
    if(!update){
      setOptions(
        options.map((op) => {
          return op._id === id ? { ...op, is_correct: check } : { ...op, is_correct: false }
        })
      )
    }else{
      setOptions(prev=>{
        let option=prev.answers.map((op) => {
          return op._id === id ? { ...op, is_correct: check } : { ...op, is_correct: false }
        })
        return {...prev,answers:option}
      }
      )
    }
  }

  useEffect(() => {
   if(!update){
    setProgessBarShow(true)
    setInterval(() => {
      setProgessBarShow(false);
    }, 1000);
   }
  }, [setProgessBarShow])



  return (
    <>
      {
        (options.length > 0) ?
          options.map((op) => (
            <List key={op._id}>
              <ListItem alignItems="center">
                <Checkbox
                  style={{ color: "#4b636e" }}
                  checked={op.is_correct}
                  onChange={(e) => setIsTrue(e.target.checked, op._id)}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <TextField
                  fullWidth
                  label="Option"
                  value={op.option}
                  onChange={(e) => setOption(e.target.value, op._id)}
                />
                <Removeicon onClick={onClick.bind(this, op._id)} />
              </ListItem>
            </List>
          )) : ''
      }
    </>
  );
}