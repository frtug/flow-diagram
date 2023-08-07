import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/LoginPage';
import Signup from './Pages/RegisterPage'
import Forget from './Pages/ForgetPasswordPage'
import Dashboard from './Components/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './Pages/Profile';
import PrivateRoute from './Routes/PrivateRoute';

const App = ()=> {
    return (
        <Router>
            <AuthProvider>
            <Routes>
                <Route exact path='/' 
                    element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/forget" element={<Forget/>} />
                <Route path='/profile' 
                    element={
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>
                }/>
            </Routes>
        </AuthProvider> 
        </Router>
    
  );
}
export default App;
