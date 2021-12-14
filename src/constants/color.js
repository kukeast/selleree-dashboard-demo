export function changeTheme () {
    const theme = window.localStorage.getItem("theme")
    if(theme === "light"){
        window.localStorage.setItem("theme", "dark")
    }else{
        window.localStorage.setItem("theme", "light")
    }
    window.location.reload()
}

const light = {
    backgroundColor : '#FFFFFF',
    card : '#FFFFFF',
    shadow: '0px 4px 24px 0px #22222215',
    buttonText: '#FFFFFF',
    dim: '#22222299',
    white : '#FFFFFF',
    gray1 : '#F7F7FA',
    gray2 : '#EBEBF0',
    gray3 : '#DFDFE5',
    gray4 : '#C1C1C9',
    gray5 : '#85858C',
    gray6 : '#535358',
    black : '#222222',
    main1 : '#EBEEFF',
    main2 : '#E5E9FF',
    main3 : '#D8DEFF',
    main6 : '#1638F0',
    main : '#3A59FF',
    red:  '#F61E52',
    red1: '#FFF4F6',
    blue: '#1D85FF',
    yellow: '#ffbb0d',
    green: '#13CA72',
    green6: '#00B65F',
}

const dark = {
    backgroundColor : '#111215',
    card : '#16171A',
    shadow: '0px 4px 24px 0px #00000012',
    buttonText: '#FFFFFF',
    dim: '#00000099',
    white : '#111215',
    gray1 : '#16171A',
    gray2 : '#1d1f24',
    gray3 : '#222222',
    gray4 : '#535358',
    gray5 : '#85858C',
    gray6 : '#C1C1C9',
    black : '#EBEBF0',

    main2 : '#1C1C44',
    main3 : '#272773',
    main6 : '#2C29BC',
    main : '#4b48ff',
    red:  '#F61E52',
    red1: '#FFF4F6',
    blue: '#1D85FF',
    yellow: '#FFB627',
    green: '#3ABEA6',
    green6: '#00B65F',
}

export const COLOR = window.localStorage.getItem("theme") === "dark" ? dark : light