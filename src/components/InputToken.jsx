import React from 'react';
import '../componentStyling/InputToken.scss';

const InputToken = () => {
    return (
      <div className="input-token-wrapper">
        <h2>Input Form</h2>
        <form action="" className="token-input-form">
          <label htmlFor="token" className="token-input-label">Enter Token Here:</label>
          <input type="text" placeholder="token" id="token-input"/>
        </form>
      </div>
    );
};

export default InputToken;