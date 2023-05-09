import React from 'react'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Login from './LoginPage';
import Signup from './RegisterPage'
import Forget from './ForgetPasswordPage'
import Dashboard from './Dashboard';
import { AuthProvider } from '../contexts/AuthContext';
import Profile from '../Pages/Profile';
import PrivateRoute from './PrivateRoute';

const Selection = ()=> {
    
    return (
        <Router>
            <AuthProvider>
            <Routes>
                <Route exact path="/" element={<PrivateRoute/>}>
                    <Route exact path='/' element={<Dashboard/>}/>
                </Route>
                 <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/forget" element={<Forget/>} />
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </AuthProvider> 
        </Router>
    
  );
}

export default Selection