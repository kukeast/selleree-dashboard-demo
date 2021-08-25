import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Column from './Column'

function Table ({titles, dataSet, type, refresh, callback}) {
    //count select cells
    const [selectCell , setSelectCell] = useState([0])
    const changeSelected = (id) => {
        if(!selectCell.includes(id) && selectCell.length < 5){
            setSelectCell(selectCell.concat(id))
            callback(id)
        }else if(selectCell.includes(id) && selectCell.length > 1){
            setSelectCell(selectCell.filter(num => num !== id))
            callback(id)
        }
    }
    
    useEffect(() => {
        setSelectCell([0])
    }, [refresh])

    //scroll action
    const scrollElem = useRef()
    const scrollInnerElem = useRef()
    const [left, setLeft] = useState(true)
    const [right, setRight] = useState(false)
    const onScroll = () => {
        const scrollLeft = scrollElem.current.scrollLeft
        const gap = scrollInnerElem.current.clientWidth - scrollElem.current.clientWidth
        if(scrollLeft > 0){
            setLeft(false)
        }else{
            setLeft(true)
        }
        if(scrollLeft === gap){
            setRight(true)
        }else{
            setRight(false)
        }
    }
    //grid setting
    const gridRepeat = "repeat(" + dataSet.length + ", 1fr"

    return(
        <div className={classNames('Table', type)}>
            <div className="TableTitle">
                <Column data={titles}/>
            </div>
            <div 
                className="TableBodyWrapper"
                onScroll={onScroll}
                ref={scrollElem}
            >
                <div 
                    className="TableBody" 
                    ref={scrollInnerElem}
                    style={{ gridTemplateColumns: gridRepeat}}
                >
                    {dataSet.map((data, index) => (
                        <Column 
                            header={data.header}
                            data={data.data}
                            key={index}
                            id={index}
                            onClick={changeSelected}
                            selectCell={selectCell}
                        />
                    ))}
                </div>
            </div>
            <div className={classNames('shadow left', { hide : left})}></div>
            <div className={classNames('shadow right', { hide : right})}></div>
        </div>
    )
}

export default React.memo(Table)
