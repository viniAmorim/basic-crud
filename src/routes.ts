import express from 'express'

const userRoute = express.Router()

userRoute.get('/', (req, res) => {
    res.json({ message: "Hello World!!"})
})

export default userRoute;