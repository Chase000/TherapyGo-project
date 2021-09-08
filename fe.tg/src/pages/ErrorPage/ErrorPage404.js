import React from 'react';
import './ErrorPage404.scss';

function ErrorPage() {
  return (
    <div className="page_404">
      <div className="page_404__background">
        <h1>404</h1>
      </div>
      <div className="content-box">
        <h3>Oops! Look like you&#39;re lost.</h3>
        <p>The page you are looking for is not found!</p>
        <a href="/" className="content-box__home">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
