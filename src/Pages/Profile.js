import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { logingOut } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await logingOut();
    navigate('/');
  }

  return (
    <div className="app">
      <div className="login-form">
        <h1 className="title">Profile</h1>
        <button
          onClick={logout}
          style={{
            cursor: 'pointer',
            fontSize: '15px',
            background: '#01d28e',
            border: '1px solid #01d28e',
            color: '#fff',
            padding: '10px 20px',
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
