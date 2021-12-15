import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ValidToken } from './token';
import Header from '../view/Header';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 30px 0 80px 220px;
    @media screen and (max-width: 1024px) {
        margin: 30px 0 80px 160px;
    }
    @media screen and (max-width: 768px) {
        margin: 30px 0 80px 0;
    }
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