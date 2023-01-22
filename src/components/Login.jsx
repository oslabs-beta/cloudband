import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    //add get req to get user info and validate ----> TO DO
    axios
      .post('/signin', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      })
      .then((response) => {
        console.log(response);
        // setSignedUp(true);
      })
      .catch((err) => {
        console.log('error in sign up request: ', err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <label className="email-label">Enter Email:</label>
      <input
        type="text"
        placeholder="email"
        id="email"
        onChange={(e) => {
          // setUsername(e.target.value);
          console.log('email: ', e.target.value);
        }}
      />
      <label className="password-label">Enter Password:</label>
      <input
        type="password"
        placeholder="password"
        id="password"
        onChange={(e) => {
          // setPassword(e.target.value);
          console.log('password: ', e.target.value);
        }}
      />
      <button id="credentials-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Login;
