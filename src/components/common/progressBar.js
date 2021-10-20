import React from 'react'
import { CircularProgress } from '@material-ui/core';
const progressBarStyle = {
    position: 'absolute',
    top: '50%',
    //left: 50%;
    left: 'calc(50% - 32px)',
    width: '64px',
    height: '64px',
    zIndex :'9999'
  }
export const ProgressBar = () => {
    return (
<CircularProgress style={progressBarStyle}/>
    )
}
