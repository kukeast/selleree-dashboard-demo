import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './Header';

function PrivateRoute ({ component: Component, ...rest }) {
  const [tokens] = useLocalStorage("tokens", null)
  return (
        <Route
            {...rest}
            render = {props => tokens?(
                <>
                    <Header/>
                    <Component {...props}/>
                </>
            ) : ( 
                <Redirect 
                    to={{
                        pathname: '/login', 
                        state: {from: props.location}
                    }}
                />
            )}
        />
    )
}

export default PrivateRoute;