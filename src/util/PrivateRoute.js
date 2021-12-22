import React from 'react';
import { Route } from 'react-router-dom';
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
    return (
        <Route
            {...rest}
            render = {props => header ? 
                <>
                    <Header/>
                    <Wrapper>
                        <Component {...props}/>
                    </Wrapper>
                </> :
                <Component {...props}/>
            }
        />
    )
}

export default PrivateRoute;