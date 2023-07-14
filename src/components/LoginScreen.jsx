import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css'; 

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // verification process

    if(username && password) {
    navigate('/search');
    }
    else {
      <p>Try again</p>
    }
    console.log('Logging in...');
  };

  const handleRegister = () => {

    console.log('registering');
    navigate('/register');
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="form-container">
        <div className="form-group">
            
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="abc@gmail.com / star16"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder= "qw12d"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
        <button className="login-button" onClick={handleLogin}>
          Sign In
        </button><br/>
            
        <label htmlFor='register-button'>New Here?</label>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
