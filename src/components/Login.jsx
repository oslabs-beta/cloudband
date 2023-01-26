import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../componentStyling/Login.scss';

const Login = (props) => {
  const { loggedIn, setLoggedIn, setArn, setRegion } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // request to send login information to server to set login, arn, and region state
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/signin', {
        email: email,
        password: password,
      })
      .then((response) => {
        setLoggedIn(true);
        setArn(response.data.newUser.RoleARN);
        setRegion(response.data.newUser.region);
      })
      .catch((error) => {
        console.error('error in sign up request: ', error);
      });
  };
  // automatically routes to visualer if logged in, otherwise renders login page
  if (loggedIn) {
    return <Navigate to="/visualizer" />;
  } else {
    return (
      <div className="login-form-wrapper">
        <div className="login-form-content">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="EMAIL"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="PASSWORD"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button id="credentials-button" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
