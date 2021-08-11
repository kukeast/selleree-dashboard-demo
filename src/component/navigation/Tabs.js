import React from 'react'
import {NavLink} from 'react-router-dom'

function Tabs ({tabs}) {
    return(
        <div className="Tabs">
            {tabs.map(
                tab => (
                    <NavLink 
                        to={tab.path}
                        activeClassName="selected"
                        className="Tab"
                        exact={tab.path === "/"}
                        key={tab.id}
                    >
                        {tab.title}
                    </NavLink>
                )
            )} 
        </div>
    )
}

Tabs.defaultProps = {
    tabs : [
        {
            id : 1,
            title : "Tab"
        }
    ]
}

export default Tabs
