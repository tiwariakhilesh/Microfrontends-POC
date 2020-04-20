import React from 'react'

export default function subQuestion({options}) {
    return (
        <ul>
            {options.map((el,i)=>{
                return <li key={i} style={{listStyleType:'none'}}>{el}</li>
            })}
        </ul>
    )
}
