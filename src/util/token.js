import jwtDecode from 'jwt-decode'
import { refresh } from './api';

export function ValidToken(tokenType) {
    const token = window.localStorage.getItem(tokenType)
    if (token && token.length > 0) {
        let decodedToken = jwtDecode(token);
        var now = new Date().getTime()
        var exp = (new Date(decodedToken.exp * 1000).getTime())
        if (now <= exp) {
            return true
        }
        return false
    }
    return false
}

export function RefreshToken() {
    refresh()
    .then( data => {
        window.localStorage.setItem("access-token", data["access-token"])
        window.localStorage.setItem("refresh-token", data["refresh-token"])
    }).catch((e) => {
        console.log(e)
    })
}