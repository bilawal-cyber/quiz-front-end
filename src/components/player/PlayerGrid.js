import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import LevelOne from "./LevelOne";
import LevelTwo from "./LevelTwo"
import axios from "axios";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { AddQuestionButton as UploadEmail } from "../Buttons";
import ClassIcon from "@material-ui/icons/Class";

export default function PlayerGrid({ base_url ,setCurrentTab,setResults}) {
  const box = {
    background: "#d1d9ff",
    border: "1px solid rgb(19, 47, 76)",
  };
  //levelOne:MCQS  levelTwo:True/False
  const [levelOne, setLevelOne] = useState([]);
  const [levelTwo, setLevelTwo] = useState([]);


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
  const isEmailValid = () => { 
    if (!email) {
      setErrors({ name: "email", message: "email is required" });
      return false;
    }
    return true
  }

  const getAllQuestions = () => {
    axios
      .get(base_url + "/getQuestions")
      .then((res) => {
        // const allAnswers = (res.data.levelOne.map(q => q.answers)).flat(1)
        // setLevelOneCorrectAnswers([...allAnswers])

        // let levelTwoAllAns = res.data.levelTwo
        // setLevelTwoCorrectAnswers(levelTwoAllAns)
        let dataOne = res.data.levelOne.map((q) => {
          let answers = q.answers.map((a) => {
            return { ...a, userAns: false };  //adding user Answer
          });
          return { ...q, answers };
        });
        let dataTwo = res.data.levelTwo.map((q) => {
          return { ...q, userAns:false }
        });
        
        setLevelOne(dataOne); setLevelTwo(dataTwo); //manuplated data
        setlevel({ one: true, two: false }); //toggle set to MCQS
      })
      .catch((err) => console.log(err));
  }

  const checkEmail = () => {
    if (isEmailValid()) {
      getAllQuestions()
    }

  };

  return (
    <Grid item>
      {!level.one && !level.two? (
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
              onClick={checkEmail}
            />
          </FormControl>
        </Box>
      ) : (
        ""
      )}

      {level.one && ( //MCQS
        <Box p={3} mt={2} sx={{ borderRadius: 16, width: 700 }} style={box}>
          <LevelOne levelOne={levelOne}
            setLevelOne={setLevelOne}
            errors={errors}
            setErrors={setErrors}
            setlevel={setlevel}
          />
        </Box>
      )}
      {level.two && ( //MCQS
        <Box p={3} mt={2} sx={{ borderRadius: 16, width: 700 }} style={box}>
          <LevelTwo levelTwo={levelTwo}
            setLevelTwo={setLevelTwo}
            errors={errors}
            setErrors={setErrors}
            setlevel={setlevel}
            levelOne={levelOne}
            email={email}
            base_url = {base_url}
            setCurrentTab={setCurrentTab}
            setResults={setResults}
          />
        </Box>
      )}
    </Grid>
  );
}