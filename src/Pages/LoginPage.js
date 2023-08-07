import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './styles.css'
export default function SignInPage() {
  const email = useRef();
  const password = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const CheckVerification = async (e) => {
    e.preventDefault();
    console.log("emails");
    // firebase authentication for login
    // TODO: check email and passwords are meeting the criteria 
    try {
      setError('');
      console.log("hua login");
      await login(email.current.value, password.current.value);
      navigate("/");
    } catch {
      setError('Error while sign in');
    }
  }

  return (
    <div className="app">
      <div className="login-form">
        <h2 className="title">Sign in to us</h2>
        {error === '' && <p className="error">{error}</p>}
        <form onSubmit={CheckVerification} action="/">
          <div className="input-container">
            <label className="subtitle">Username or email address</label>
            <input
              ref={email}
              type="text"
              name="first_name"
              required
            />
          </div>
          <div className="input-container">
            <label className="subtitle">Password</label>
            <Link to="/forget">
              <label className="right-label">Forget password?</label>
            </Link>
            <input
              ref={password}
              type="password"
              name="password"
              required
            />
          </div>
          <div className="button-container">
            <input
              type="submit"
              id="sub_btn"
              value="Login"
            />
          </div>
        </form>
        <footer>
          <p>First time? <Link to="/signup"><label>Create an account</label></Link>.</p>
          <p><Link to="/"><label>Back to Homepage</label></Link>.</p>
        </footer>
      </div>
    </div>
  );
}
