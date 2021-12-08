import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ValidToken } from './token';
import Header from '../view/Header';
import styled from 'styled-components';

const Wrapper = styled.div`
     margin: 160px 0 80px;
`

function PrivateRoute ({ component: Component, header, ...rest }) {
    const refreshTokenValid = ValidToken("refresh-token")
    return (
        <Route
            {...rest}
            render = {props => refreshTokenValid?(
                <>
                    {header ? 
                        <>
                            <Header/>
                            <Wrapper>
                                <Component {...props}/>
                            </Wrapper>
                        </> :
                        <Component {...props}/>
                    }
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