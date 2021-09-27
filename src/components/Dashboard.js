import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AdminGrid from './admin/AdminGrid';
import { Tabs,Tab } from '@material-ui/core';
import PlayerGrid from './player/PlayerGrid';
import ResultGrid from './results/ResultGrid'

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexDirection:'column',
  //   flexGrow:1,
  // },
  // toolbar: {
  //   paddingRight: 24, // keep right padding when drawer closed
  // },
  // toolbarIcon: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: '0 8px',
  //   ...theme.mixins.toolbar,
  // },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // menuButton: {
  //   marginRight: 36,
  // },
  // menuButtonHidden: {
  //   display: 'none',
  // },
  // title: {
  //   flexGrow: 1,
  // },
  // drawerPaperClose: {
  //   overflowX: 'hidden',
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   width: theme.spacing(7),
  //   [theme.breakpoints.up('sm')]: {
  //     width: theme.spacing(9),
  //   },
  // },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   display: 'flex',
  //   overflow: 'auto',
  //   flexDirection: 'column',
  // },
  // fixedHeight: {
  //   height: 240,
  // },
}));






export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState('one');
  const base_url='http://127.0.0.1:5000/api';

const handleChange = (event, newValue) => {
  setCurrentTab(newValue);
};
const box={
  background: "#d1d9ff",
  border:"1px solid rgb(19, 47, 76)"
}
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content} style={{backgroundColor:"rgb(0, 30, 60)"}}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg">
        <Grid  
                container spacing={4}
                direction="column"
                alignItems="center"
                justifyContent="center"
          >
          <Grid item>
                <Box 
                  p={3} 
                 sx={{ borderRadius: 16 ,width:500}} style={box} mt={1}
                >
                <Tabs
                value={currentTab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                >
                <Tab value="one" label="Add Questions" />
                <Tab value="two" label="Take Test" />
                <Tab value="three" label="Final Results" />
                </Tabs>
                </Box>
          </Grid>
                
                  {(currentTab==='one') ? <AdminGrid base_url={base_url}/> : ''}
               
                 {(currentTab==='two') ? <PlayerGrid base_url={base_url} setCurrentTab={setCurrentTab}/> : ''}
             
                 {(currentTab==='three') ? <ResultGrid base_url={base_url} /> : ''}
               
                </Grid>
        </Container>
      </main>
    </div>
  );
}