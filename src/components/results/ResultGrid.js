import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import Table from './Table'
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { AddQuestionButton as GetResultButton } from "../Buttons";
import ClassIcon from "@material-ui/icons/Class";
import axios from 'axios';
export default function ResultGrid({ result, setResults, base_url }) {
  // const [result,setResults] = useState([])
  const box = {
    background: "#d1d9ff",
    border: "1px solid rgb(19, 47, 76)"
  }

  // useEffect(()=>{
  //     axios.get('http://127.0.0.1:5000/api/userData').then(res=>setResults([...result,...res.data]))
  //     .catch(err=>console.log(err))
  // },[])
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

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const validateEmailOnInput = (v) => { //real time email validation
    setErrors({ name: "email", message: "email should be valid" });
    var validRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (v.value.match(validRegex)) {
      setEmail(v.value);
      setErrors("");
    }
  };
  const getResult = () => {
    if (!email) {
      setErrors({ name: "email", message: "email is required" });
      return false;
    }
    axios.get(base_url + `/userData?email=${email}`)
    .then(res => setResults(res.data))
      .catch(err => setErrors({ name: 'backend', message: err.response.data.emailNotExist }))
  }


  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  return (
    <Grid item  >
      {
        (result.length) ?
          <Box p={3}
            sx={{ borderRadius: 16 }} style={box}>
            <Table result={result} />
          </Box> :
          <Box p={3} sx={{ borderRadius: 16, width: 700 }} style={box}>
            <FormControl component="fieldset" fullWidth sx={{ m: 5 }}>
              <FormLabel component="legend">Email</FormLabel>
              <TextField
                label="Type your email to get result"
                variant="outlined"
                type="string"
                error={errors && errors.name === "email" ? true : false}
                onChange={(e) => {
                  validateEmailOnInput(e.target);
                }}
              />
              {errors && (errors.name === "email" || errors.name === "backend") ? (
                <label style={{ color: "red" }}>{errors.message}</label>
              ) : (
                ""
              )}
              <GetResultButton
                text={"Show Results"}
                icon={<ClassIcon />}
                onClick={getResult}
              />
            </FormControl>
          </Box>
      }
    </Grid>
  );
}