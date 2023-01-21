import React from 'react';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Login</h2>
      <label className="username-label">Enter Username:</label>
      <input
        type="text"
        placeholder="username"
        id="username"
        onChange={(e) => {
          // setUsername(e.target.value);
          console.log('username: ', e.target.value);
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
