// import React from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Removeicon} from '../Buttons';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState } from "react";



export default function AddOptions( { options , onClick, setOptions,setProgessBarShow} ) {
   

        const setOption=(v,id)=>{
                setOptions( 
                    options.map((op) => {
                       return op.index === id ? { ...op, option : v } : op
                      })
                )
        }

        const setIsTrue = (check,id) =>{
            setOptions( 
                options.map((op) => {
                   return op.index === id ? { ...op, is_correct : check } : {...op, is_correct : false}
                  })
            )
        }

          useEffect(()=>{
            setProgessBarShow(true)
                setInterval(() => {
                  setProgessBarShow(false);
                }, 2000);
          },[setProgessBarShow])
 


  return (
    <>
      {
       (options.length>0)?
       options.map((op)=>(
        <List key={op.index}>
        <ListItem alignItems="center">
        <Checkbox
        style={{color:"#4b636e"}}
        checked={op.is_correct}
        onChange={(e)=>setIsTrue(e.target.checked,op.index)}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <TextField 
        fullWidth
        label="Option"
        value={op.option}
        onChange={(e)=>setOption(e.target.value,op.index)}
        />
        <Removeicon onClick={onClick.bind(this, op.index)}/>
        </ListItem>
        </List>
)):''
      }
    </>
  );
}