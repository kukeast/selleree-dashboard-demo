import React from 'react'
import Cell from './Cell'
import classNames from 'classnames'

function Column ({data, header, onClick, selectCell, id}) {
    return(
        <div className="Column">
            <Cell 
                data={header}
                className={classNames('Cell')}
            />
            {data.map((data, index) => (
                <Cell 
                    data={data} 
                    key={index} 
                    id={(id * 10) + index}
                    onClick={onClick}
                    className={classNames('Cell', { selected : selectCell.includes((id * 10) + index)})}
                />
            ))}
        </div>
    )
}

Column.defaultProps = {
    selectCell : [],
    id : -1
}

export default React.memo(Column)
