import React from 'react'

function Title ({title, subtitle, iconSrc}) {
    return(
        <div className="Header">
            {iconSrc && <img src={iconSrc} alt="header"/>}
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    )
}

Title.defaultProps = {
    title : "셀러리 모니터링",
    subtitle : "동국이의 두번째 작업"
}


export default Title
