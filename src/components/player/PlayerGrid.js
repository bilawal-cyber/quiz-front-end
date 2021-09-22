import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import LevelOne from "./LevelOne";
import axios from "axios";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { AddQuestionButton as UploadEmail } from "../Buttons";
import ClassIcon from "@material-ui/icons/Class";

export default function PlayerGrid({ base_url }) {
  const box = {
    background: "#d1d9ff",
    border: "1px solid rgb(19, 47, 76)",
  };
//levelOne:MCQS  levelTwo:True/False
  const [levelOne, setLevelOne] = useState([]); 

  const [level, setlevel] = useState({ //toggle b/w MCQS and True/False
    one: false,
    two: false,
  });

  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({}); //all Type of Errors

  const validateEmailOnInput = (v) => { //real time email validation
    setErrors({ name: "email", message: "email should be valid" });
    var validRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (v.value.match(validRegex)) {
      setEmail(v.value);
      setErrors("");
    }
  };
  const isEmailValid=()=>{  //validation before sending to server
    if (!email) {
      setErrors({ name: "email", message: "email is required" });
      return false;
    }
  }
  const getAllQuestions=()=>{ 
    axios
    .get(base_url + "/getQuestions")
    .then((res) => {  
      let data = res.data.levelOne.map((q) => {
        let answers = q.answers.map((a) => {
          return { ...a, is_correct: false };  //making all options false before rendering
        });
        return { ...q, answers };
      });
      setLevelOne(data); //manuplated data
      setlevel({ one: true, two: false }); //toggle set to MCQS
    })
    .catch((err) => console.log(err));
  }

  const sendEmail = () => {
   isEmailValid()
    axios
      .post(base_url + "/createUser", { email: email })
      .then((res) => {
          getAllQuestions()
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Grid item>
      {!level.one ? (
        <Box p={3} sx={{ borderRadius: 16, width: 700 }} style={box}>
          <FormControl component="fieldset" fullWidth sx={{ m: 5 }}>
            <FormLabel component="legend">Email</FormLabel>
            <TextField
              label="Type your email"
              variant="outlined"
              type="string"
              error={errors && errors.name === "email" ? true : false}
              onChange={(e) => {
                validateEmailOnInput(e.target);
              }}
            />
            {errors && errors.name === "email" ? (
              <label style={{ color: "red" }}>{errors.message}</label>
            ) : (
              ""
            )}
            <UploadEmail
              text={"take Quiz"}
              icon={<ClassIcon />}
              onClick={sendEmail}
            />
          </FormControl>
        </Box>
      ) : (
        ""
      )}

      {level.one && ( //MCQS
        <Box p={3} mt={2} sx={{ borderRadius: 16, width: 700 }} style={box}>
          <LevelOne levelOne={levelOne} setLevelOne={setLevelOne} />
        </Box>
      )}
    </Grid>
  );
}
