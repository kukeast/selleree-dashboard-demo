import React from 'react'
import { logIn } from '../hooks/api';
import { useState } from 'react/cjs/react.development';
import useLocalStorage from '../hooks/useLocalStorage';
import { useHistory } from 'react-router';

function LogIn () {
    const history = useHistory()
    // eslint-disable-next-line
    const [tokens, setTokens] = useLocalStorage("tokens", null)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        id: '',
        password: ''
    });

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
            setTokens(data)
            history.push("/")
        }).catch(() => {
            console.log("아이디 또는 비밀번호가 일치하지 않아요")
            setLoading(false)
        })
    }

    return(
        <> 
            <div>
                <input type="text" name="id" onChange={onChange}/>
                <input type="password" name="password" onChange={onChange}/>
                <button type="submit" onClick={onClick}>{loading ? "loaidng..." : "login"}</button>
            </div>
        </>
    )
}

export default LogIn
