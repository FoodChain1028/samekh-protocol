// src/pages/SignUp.tsx

import React from 'react';
import Banner from './Banner';

const SignUp: React.FC = () => {
  return (
    <div className="page-container">
      <Banner />
      <div className="button-container">
        <button className="sign-up-button">Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
