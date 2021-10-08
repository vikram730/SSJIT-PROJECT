import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}   //state--> Tells where were u or from where u  called the private route.
      />
    )
  }
   
export default PrivateRoute;

