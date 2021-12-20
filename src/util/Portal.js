import { createPortal } from 'react-dom'

function Portal ({ children }) {
    return createPortal(children, document.getElementById("portal"))
}

export default Portal
