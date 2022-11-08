const express = require('express')
require('dotenv').config()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 8000

const app = express()
app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})