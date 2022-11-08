const express = require('express')
require('dotenv').config()

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socketLogic = require('./socket.js')

const port = process.env.PORT || 8000

app.use(express.static('./public'))

io.on('connection', socketLogic())

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
