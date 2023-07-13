import express from 'express'

const app = express()
const port = 2553

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' })
})

app.listen(port, () => {
    console.log(`listening on http://127.0.0.1:${port}`)
})