import React, { useState, useEffect } from 'react'

import { IconContext } from 'react-icons'
import { TiTimes } from 'react-icons/ti'

import "./List.css";

import api from '../services/api'

export default function ListWeight() {
    const [weights, setWeights] = useState([])

    useEffect(() => {
        api.get("weights").then(response => {
            setWeights(response.data)
        })
    }, [])

     function handleDeleteWeight(id){
        api.delete(`weights/${id}`).then(response => {
            const weightsAfterDelete = weights.filter(weight => weight.id !== id)
            setWeights(weightsAfterDelete)
        })

    }


    return (
        <div className="list-weights">
            <ul>
                {weights.map(weight => <li key={weight.id}>
                    <IconContext.Provider value={{ color: 'red', className: "icon" }}>
                        <TiTimes onClick={() => handleDeleteWeight(weight.id)} />
                    </IconContext.Provider>

                    <span className="value">
                        {weight.value} Kg
                    </span>

                    <span className="date">
                        {weight.date.split(', ')[1].split(' ', 3).join(' ')}
                    </span>

                </li>
                )}
            </ul>
        </div>
    )
}
