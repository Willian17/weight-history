const request = require('supertest')
const {isUuid} = require('uuidv4')
const app = require('../app')



describe("weights" , ()=> {
    it("should be able to create a new weight " , async ()=> {
        const response = await request(app)
        .post('/weights')
        .send({
            value: 78.9
        })

        expect(isUuid(response.body.id)).toBe(true)
        expect(response.body).toMatchObject({
            value: 78.9,
            date: new Date().toUTCString()
        })
    })
    it("should be able to list the weights" , async ()=> {
        const weight = await request(app)
        .post('/weights')
        .send({
            value: 78.5
        })

        const response = await request(app).get('/weights')

        expect(response.body).toEqual(
            expect.arrayContaining([
                {
                    id: weight.body.id,
                    value: 78.5,
                    date: weight.body.date
                }
            ])
        )
    })
    it("should be able to update the weight" , async ()=> {
        const weight = await request(app)
        .post('/weights')
        .send({
            value: 78.5
        })

        const response = await request(app)
        .put(`/weights/${weight.body.id}`)
        .send({
            value: 75
        })

        expect(isUuid(response.body.id)).toBe(true)

        expect(response.body).toMatchObject({
            value: 75,
            date: weight.body.date
        })
    })

    it("should not be able to update the weight that does not exist" , async ()=> {
        await request(app).put('/weights/145').expect(400)
    })

    it("should be able to delete the weight" , async ()=> {
        const response = await request(app)
        .post('/weights')
        .send({
            value: 78.5
        })

        await request(app).delete(`/weights/${response.body.id}`)

        const weights = await request(app).get('/weights')

        const weight = weights.body.find(weight => weight.id === response.body.id)

        expect(weight).toBe(undefined)
    })
    it("should not be able to delete the weight that does not exist" , async ()=> {
        await request(app).delete('/weights/145').expect(400)
    })
})