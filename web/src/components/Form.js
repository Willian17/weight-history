import React , {useState} from 'react'
import './Form.css'

import api from '../services/api'

export default function Form(){
    const [weight , setWeight] = useState('')

   async function handleAddWeight(e){
        await api.post('weights' , {value: weight})
    }

    function handleOnChange(e){
        const weight = e.target.value
        setWeight(weight)
    }
    return (
        <div className="form">
            <h1>Informe seu peso</h1>
            <form>
                <input type="number" onChange={handleOnChange}  id="input" placeholder="ex: 78" required/>
                <button type="submit" onClick={handleAddWeight}>Adicionar</button>
            </form>
        </div>
    )
}
