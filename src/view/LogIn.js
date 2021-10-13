import React from 'react'
import { logIn } from '../hooks/api'
import { useState } from 'react/cjs/react.development'
import { Redirect } from 'react-router-dom';
import { ValidToken } from '../hooks/token'

function LogIn ({history}) {
    // eslint-disable-next-line
    const refreshTokenVaild = ValidToken("refresh-token")
    const [loading, setLoading] = useState(false)
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
            console.log("아이디 또는 비밀번호가 일치하지 않아요")
            setLoading(false)
        })
    }
    return(
        <> 
            {refreshTokenVaild 
                ? <Redirect to="/"/>
                : "안됨"
            }
            <div>
                <button onClick={() => console.log(window.localStorage.getItem("refresh-token"))}>adf</button>
                <input type="text" name="id" onChange={onChange}/>
                <input type="password" name="password" onChange={onChange}/>
                <button type="submit" onClick={onClick}>{loading ? "loaidng..." : "login"}</button>
            </div>
    </>
    )
}

export default LogIn
