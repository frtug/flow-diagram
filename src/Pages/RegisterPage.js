import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './styles.css'

export default function SignUpPage() {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    // creating a firebase user here and send to the server;
    e.preventDefault();
    console.log("user");
    if (password.current.value !== confirmPassword.current.value) {
      console.log("match password");
      return setError("password do not Match");
    }
    try {
      setLoading(true);
      setError('');
      await signUp(email.current.value, password.current.value);
      navigate("/");
    } catch {
      setError("Failed to create your account", error);
    }
    setLoading(false);
  }

  return (
    <div className="app">
      <div className="login-form">
        <h2 className="title">Join us</h2>
        <h3> Create your personal account</h3>
        {error !== "" && <p className="error">{error}</p>}
        <form onSubmit={handleClick} action="/home">
          <div className="input-container">
            <label className='subtitle'>Email address</label>
            <input
              ref={email}
              type="text"
              name="email"
              required
            />
          </div>
          <div className="input-container">
            <label className='subtitle'>Password</label>
            <input
              ref={password}
              type="password"
              name="password"
              required
            />
          </div>
          <div className="input-container">
            <label className='subtitle'>Confirm Password</label>
            <input
              ref={confirmPassword}
              type="password"
              name="confirm_password"
              required
            />
          </div>
          <div className="button-container">
            <input
              type="submit"
              id="sub_btn"
              value="Register"
              disabled={loading}
            />
          </div>
        </form>
        <footer>
          <p><Link to="/"><label>Back to Homepage</label></Link>.</p>
        </footer>
      </div>
    </div>
  );
}
