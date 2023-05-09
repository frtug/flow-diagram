import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
export default function Profile() {
    const {logingOut} = useAuth();
    const navigate = useNavigate();
    const logout = async() =>{
        await logingOut();
        navigate('/')

    }
  return (
    <div>
        <h1>Profile</h1>
        <button onClick={logout}>
            Log out 
        </button>
    </div>
  )
}
