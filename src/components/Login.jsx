import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const { loggedIn, setLoggedIn, setArn, setRegion } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    //add get req to get user info and validate ----> TO DO
    axios
      .post('/signin', {
        email: email,
        password: password,
      })
      .then((response) => {
        // setLoggedIn(true);
        setLoggedIn(true);
        // set arn to response.data.newUser.RoleARN
        setArn(response.data.newUser.RoleARN);
        // set region to response.data.newUser.region
        setRegion(response.data.newUser.region);
      })
      .catch((error) => {
        console.error('error in sign up request: ', error);
      });
  };
  if (loggedIn) {
    return <Navigate to="/visualizer" />;
  } else {
    return (
      <div>
        <h2>Login</h2>
        <label className="email-label">Enter Email:</label>
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label className="password-label">Enter Password:</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button id="credentials-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
};

export default Login;
