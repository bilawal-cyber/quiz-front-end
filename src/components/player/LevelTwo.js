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
                return q._id === id ? {...q, correct_answer: v} : q;
            })
        );
    };
    const validateOptions = () => {
        if(levelTwo.filter(e => e.correct_answer === null).length){
            setErrors({name: "trueFalse", message: "fill out all options"});
            return;
        }

        setErrors("");
        getUserData();

    };
    const getUserData = () => {
        levelOne.forEach((ob) => {
            let userAnswer = ob.answers.filter((ans) => ans.is_correct === true)[0];
            let correctAnswer = levelOneCorrectAnswers.filter(a => a._id === userAnswer._id)[0]

            setResponse((prev) => {

                return [
                    ...prev,
                    {
                        question_id: ob._id,
                        answer_id: userAnswer._id,
                        is_correct: correctAnswer.is_correct
                    },
                ]
            });
            if (correctAnswer.is_correct) {
                setScore(prev => prev + 10)
            }
        });


        levelTwo.forEach((ob) => {
            let is_correct = levelTwoCorrectAnswers.filter(e => e.question_id === ob._id)
            setResponse((prev) => [
                ...prev,
                {
                    question_id: ob._id,
                    answer_id: null,
                    is_correct: (is_correct[0].is_correct === ob.correct_answer) ? true : false
                },
            ]);
            if (is_correct[0].is_correct === ob.correct_answer) {
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
                setCurrentTab("three")
                setResults(res.data)
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
                                            value="true"
                                            control={<Radio/>}
                                            label="True"
                                        />
                                        <FormControlLabel
                                            value="false"
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