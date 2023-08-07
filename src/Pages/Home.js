import React, { useState } from 'react'
import CreateNewButton from '../Components/CreateNewButton';
import InputReuseable from '../Components/InputReuseable';
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
export default function DefaultHome({setCreateNew,setIsFilePicked,setInitialEdges,setInitialNodes}) {
    const [isError,setIsError] = useState(false);
    const {currentUser} = useAuth();
  return (
    <>
        <div className="header">
            <h1>Flow Diagram</h1>
            {!currentUser ? 
            
            <div className="nav">
                <Link to="/login" className='btn-class create-file'> Login</Link>
                <Link to="/signup" className='btn-class create-file'> SignUp</Link>
            </div>
            
            :
            <div className="nav">
                {/* <Link to="/login" className='btn-class create-file'> Login</Link> */}
                <Link to="/profile" className='btn-class create-file'> Profile</Link>
             
            </div>
            }
            
        </div>
        <div className='card'>
            <div className='left-side'>
                    <InputReuseable setIsError={setIsError}
                        setIsFilePicked={setIsFilePicked} 
                        setInitialEdges={setInitialEdges}
                        setInitialNodes={setInitialNodes}
                    />
            </div>
            <div className='right-side'>
            <CreateNewButton setCreateNew={setCreateNew}/>
            </div>   
        </div>
    </>
    
    
  )
}
