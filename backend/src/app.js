const express = require('express')
const cors = require('cors')
const {uuid} = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

let weights = []

app.post('/weights' , (request , response) => {
   const {value} = request.body
   const newWeight = {
       id: uuid(),
       value,
       date: new Date().toUTCString()
   }
   weights.push(newWeight)

   return response.json(newWeight)
})
app.get('/weights' , (request , response) => {
    return response.json(weights)
})
app.put('/weights/:id' , (request , response) => {
    const { id } = request.params
    const {value } = request.body

    const weightIndex = weights.findIndex(weight => weight.id === id)
    if (weightIndex < 0) {
        return response.status(400).json({ message: 'weight not found' })
    }

    weights[weightIndex] = {
        id,
        value,
        date: weights[weightIndex].date
    }
    return response.json(weights[weightIndex])
})
app.delete('/weights/:id' , (request , response) => {
    const { id } = request.params

    const weightIndex = weights.findIndex(weight => weight.id === id)
    if (weightIndex < 0) {
        return response.status(400).json({ message: 'weight not found' })
    }

    weights.splice(weightIndex , 1)

    return response.status(204).send()

})

module.exports = app