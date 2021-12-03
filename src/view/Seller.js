import React from 'react'
import { getSeller } from '../util/api'
import useAsync from '../util/useAsync'

function Seller ({match, history}) {
    const sellerId = match.params.id
    const [response] = useAsync(() => getSeller(sellerId))
    console.log(response)
    return(
        <div>
            <h1 onClick={() => history.goBack()}>공사중...</h1>
        </div>
    )
}

export default Seller
