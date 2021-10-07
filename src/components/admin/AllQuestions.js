import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Box } from "@material-ui/core"
import axios from 'axios';
import AddOptions from './addOptions';
import AddQuestion from './AddQuestion';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



const AllQuestions = ({base_url}) => {

    const [questionList,setQuestionList] = useState([])
    const [currentQuestion,setCurrentQuestion] = useState([])
    const [errors, setErrors] = useState([]); //validation error storage
    useEffect(()=>{
        axios.get(base_url+'/getQuestions?admin=true')
                .then(res=>setQuestionList(res.data))
                    .catch(err=>console.log(err))
    },[])
    const editQuestion = (id) =>{
        axios.get(base_url+`/getSingleQuestion?_id=${id}`)
                    .then(res=>setCurrentQuestion(res.data))
                            .catch(err=>console.log(err))        
    }
    const getQuestion=(v)=>{
        setCurrentQuestion((prevState) => [...prevState, { question:v }])
    }
    const box={
        background: "#d1d9ff",
        border:"1px solid rgb(19, 47, 76)"
      }
      const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };
    return (
        <div>
            {
                <Box   p={3} 
                sx={{ borderRadius: 16, width:1000 }} style={box} mt={1}>
                            <MaterialTable
                            style={{background:'#d1d9ff'}}
                             icons={tableIcons}
      title="Positioning Actions Column Preview"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      ]}
      actions={[
        {
          icon: Edit,
          tooltip: 'Edit Question',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        {
          icon: Clear,
          tooltip: 'Delete Question',
          onClick: (event, rowData) => alert("You want to delete " + rowData.name),
        }
      ]}
      options={{
        actionsColumnIndex: -1
      }}
    />
                </Box>
            }
             {/* <Box 
                  p={3} 
                 sx={{ borderRadius: 16,width:400 }} style={box} mt={1}
                >
                   {
                       questionList.map(q=>(
                        <List key={q._id}>
                        <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={q.question}
                        secondary={q.type}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={()=>editQuestion(q._id)} >
                          <DeleteIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="Edit" onClick={()=>editQuestion(q._id)} >
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                        </List>
                       ))
                   }
                </Box> */}
                {/* {
                    currentQuestion.length ?
                    <Box  p={3} 
                    sx={{ borderRadius: 16,width:400 }} style={box} mt={1}>
                    <AddQuestion
                    getLevel={()=>console.log('pending')}
                    getQuestion={()=>{}}
                    level={currentQuestion[0].type}
                    validationErrors={errors}
                    setErrors={setErrors}
                    question={currentQuestion[0].question}
                    edit={true}
                    />
        </Box>:''

                } */}
        </div>
    )
}

export default AllQuestions
