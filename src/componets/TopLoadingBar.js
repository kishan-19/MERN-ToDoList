import React from 'react'
import LoadingBar from 'react-top-loading-bar';
import { useAuth } from '../context/Auth';

const TopLoadingBar = () => {
  const {progress}= useAuth();
  
    return (
        
         <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        
    )
}

export default TopLoadingBar
