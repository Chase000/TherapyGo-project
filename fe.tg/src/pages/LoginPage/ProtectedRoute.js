import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';


export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
        if (isAuthenticated()) return <Component {...props} />;
        return <Redirect to="/" />;
      }}
  />
  );
