import {List, ListSubheader} from "@material-ui/core";
import {AddQuestionButton as SubmitAnswer} from "../Buttons";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import {useEffect, useState} from "react";
import axios from "axios";
import TrueFalse from "../common/TrueFalse";

const LevelTwo = ({
                      levelTwo,
                      setLevelTwo,
                      errors,
                      setErrors,
                      levelOne,
                      email,
                      base_url,
                      setCurrentTab,
                      setResults
                  }) => {
    const [response, setResponse] = useState([]);
    const [score, setScore] = useState(0)
    const [count,setCount] = useState(0)
    useEffect(()=>{
      setCount(prev=>prev+1)
    //   console.log(count)
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
    const submitResponse = () => {
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
            setResponse((prev) => {

                return [
                    ...prev,
                    {
                        question_id: ob._id,
                        userAns: userAnswer._id,
                        is_correct: userAnswer.is_correct===userAnswer.userAns,
                    },
                ]
            });
            if (userAnswer.is_correct===userAnswer.userAns) {
                setScore(prev => prev + 10)
            }
        });


        levelTwo.forEach((ob) => {
            setResponse((prev) => [
                ...prev,
                {
                    question_id: ob._id,
                    is_correct: ob.correct_answer===ob.userAns
                },
            ]);
            if (ob.correct_answer===ob.userAns) {
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
                setResults({levelOne:levelOne,levelTwo:levelTwo,score:score})
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
                    <TrueFalse
                    ob={ob}
                    handleChange={handleChange}
                    key={ob._id}
                    identity={'1'}
                    />
                ))
                : ""}
            <SubmitAnswer
                onClick={() => {
                    submitResponse();
                }}
                text={"Submit"}
                icon={<SkipNextIcon/>}
            />
        </List>
    );
};

export default LevelTwo;