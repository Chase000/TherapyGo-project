import React from 'react';
import './ErrorPage500.scss';

function ErrorPage500() {
  return (
    <div className="page-500">
      <div className="page-500__background" />
      <div className="page-500__content-box">
        <h1>Error 500</h1>
        <h3>Something went wrong</h3>
        <p>Please try again or contact support!</p>
        <a href="/" className="page-500__content-box__home">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default ErrorPage500;
