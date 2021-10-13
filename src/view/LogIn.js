import React from 'react'
import { logIn } from '../hooks/api'
import { useState } from 'react/cjs/react.development'
import { Redirect } from 'react-router-dom';
import { ValidToken } from '../hooks/token'
import TextField from '../component/inputs/TextField';
import styled from 'styled-components';
import { COLOR } from '../constants/color';
import Button from '../component/inputs/Button';
import Title from '../component/data-display/Title';
import Icon from '../component/data-display/Icon';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 400px;
    height: fit-content;
    position: absolute; 
    inset: 0;
    margin: auto;
`
const Label = styled.p`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${COLOR.gray6};
`
const Alert = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    border-radius: 12px;
    padding: 12px;
    font-size: 14px;
    background-color: ${COLOR.red1};
`
function LogIn ({history}) {
    // eslint-disable-next-line
    const refreshTokenVaild = ValidToken("refresh-token")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [inputs, setInputs] = useState({
        id: '',
        password: '',
    })

    const onChange = (e) => {
        const { value, name } = e.target
        setInputs({
            ...inputs,
            [name]: value,
        })
        setError(false)
    }
    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            onClick()
        }
    }
    const onClick = () => {
        setLoading(true)
        logIn(inputs)
        .then( data => {
            setLoading(false)
            window.localStorage.setItem("access-token",  JSON.stringify(data["access-token"]))
            window.localStorage.setItem("refresh-token",  JSON.stringify(data["refresh-token"]))
            history.push("/")
        }).catch(() => {
            setError(true)
            setLoading(false)
        })
    }
    return(
        <> 
            {refreshTokenVaild 
                ? <Redirect to="/"/>
                : <Wrapper>
                    <div>
                        <Label>아이디</Label>
                        <TextField 
                            type="text" 
                            name="id" 
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label>비밀번호</Label>
                        <TextField 
                            type="password" 
                            name="password" 
                            onChange={onChange} 
                            onKeyDown={onKeyDown}
                        />
                    </div>
                    {error && 
                        <Alert>
                            <Icon size={20} color={COLOR.red} name="alert"/>
                            아이디 또는 비밀번호가 일치하지 않아요
                        </Alert>
                    }
                    <Button isLoading={loading} onClick={onClick}>로그인</Button>
                </Wrapper>
            }
            
    </>
    )
}

export default LogIn
