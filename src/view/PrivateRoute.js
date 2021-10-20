import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ValidToken } from '../hooks/token';
import Header from './Header';

function PrivateRoute ({ component: Component, header, ...rest }) {
    const refreshTokenValid = ValidToken("refresh-token")
    return (
        <Route
            {...rest}
            render = {props => refreshTokenValid?(
                <>
                    {header && <Header/>}
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