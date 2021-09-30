import {List, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {AddQuestionButton as SubmitAnswer} from "../Buttons";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import {RadioGroup} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import {useEffect, useState} from "react";
import axios from "axios";

const LevelTwo = ({
                      levelTwo,
                      setLevelTwo,
                      errors,
                      setErrors,
                      levelOne,
                      email,
                      levelOneCorrectAnswers,
                      levelTwoCorrectAnswers,
                      base_url,
                      setCurrentTab,
                      setResults
                  }) => {
    const [response, setResponse] = useState([]);
    const [score, setScore] = useState(0)
    const [count,setCount] = useState(0)
    useEffect(()=>{
      setCount(prev=>prev+1)
      console.log(count)
      if(count===1){
        sendUserData();
      }
    },[response])

    const handleChange = (v, id) => {
        setLevelTwo(
            levelTwo.map((q) => {
                return q._id === id ? {...q, userAns: v === "1"} : q;
            })
        );
    };
    const validateOptions = () => {
        if(levelTwo.filter(e => e.userAns === null).length){
            setErrors({name: "trueFalse", message: "fill out all options"});
            return;
        }

        setErrors("");
        getUserData();

    };
    const getUserData = () => {
        levelOne.forEach((ob) => {
            let userAnswer = ob.answers.filter((ans) => ans.userAns === true)[0];
            let correctAnswer = ob.answers.filter(a => a._id === userAnswer._id)[0]
            setResponse((prev) => {

                return [
                    ...prev,
                    {
                        question_id: ob._id,
                        selected: userAnswer._id,
                        is_correct: correctAnswer.is_correct,
                    },
                ]
            });
            if (correctAnswer.is_correct) {
                setScore(prev => prev + 10)
            }
        });


        levelTwo.forEach((ob) => {
            let is_correct = ob.filter(e => e._id === ob._id)[0]
            setResponse((prev) => [
                ...prev,
                {
                    question_id: ob._id,
                    is_correct: (is_correct.userAns === ob.correct_answer) ? true : false
                },
            ]);
            if (is_correct.userAns === ob.correct_answer) {
                setScore(prev => prev + 10)
            }
        });

    };
    const sendUserData = () => {

        let data = {
            email: email,
            score: score,
            responses: response
        }
        axios.post(base_url + '/user/Answers', data)
            .then(res => {
                setResults(res.data)
                setCurrentTab("three")
            })
            .catch(err => console.log(err))
    }

    return (
        <List
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Level Two Questions
                </ListSubheader>
            }
        >
            {errors ? <label style={{color: "red"}}>{errors.message}</label> : ""}
            {levelTwo.length
                ? levelTwo.map((ob) => (
                    <List key={ob._id}>
                        <ListItemText
                            className="MuiListItemText-dense"
                            primary={ob.question + "?"}
                        />
                        <ListItem>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="row-radio-buttons-group"
                                        onChange={(e) => handleChange(e.target.value, ob._id)}
                                    >
                                        <FormControlLabel
                                            value="1"
                                            control={<Radio/>}
                                            label="True"
                                        />
                                        <FormControlLabel
                                            value="0"
                                            control={<Radio/>}
                                            label="False"
                                        />
                                    </RadioGroup>
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                    </List>
                ))
                : ""}
            <SubmitAnswer
                onClick={() => {
                    validateOptions();
                }}
                text={"Submit"}
                icon={<SkipNextIcon/>}
            />
        </List>
    );
};

export default LevelTwo;