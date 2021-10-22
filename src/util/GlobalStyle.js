import { createGlobalStyle } from 'styled-components'
import { COLOR } from '../constants/color'

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        background-color: ${COLOR.backgroundColor};
    }
    *{
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    p{
        padding: 0;
        margin: 0;
    }
    button{
        appearance: none;
        border: none;
    }
`

export default GlobalStyle
