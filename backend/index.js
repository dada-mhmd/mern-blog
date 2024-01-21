import express from 'express'


const port  = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
