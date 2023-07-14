import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterScreen.css'; 

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Set the username and pass word
    console.log('registering ..');
    navigate('/');
  };

  const handleLogin = () => {
    // directing to login page
    console.log('login ..');
    navigate('/');
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <div className="form-container">
        <div className="form-group">

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

           <label htmlFor="email">Email:</label>
           <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
        <button className="register-button" onClick={handleRegister}>
          Sign Up
        </button><br/>
            
        <label htmlFor='login-button'>Already Registerd?</label>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
