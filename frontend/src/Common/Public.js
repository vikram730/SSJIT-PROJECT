import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {    //In place of passing all props we just extract the props. 
  return (
    <Route                      //It also have some props i) Render-Returns a function value
      {...rest}
      render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
    />
  )
}

export default PublicRoute;






// function PublicRoute({ component: Component, ...rest }) {    //In place of passing all props we just extract the props.
        // Where ever we will use this private route, the props of this private route will be accessible ny the help of {}...res}  