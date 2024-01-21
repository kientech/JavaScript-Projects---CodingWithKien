const { log } = require('console')
const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log("Connected!");
    socket.on('onchat', (data) => {
        io.emit('user-chat', data);
    })
})

server.listen(3040, (req,res) => {
    console.log("Listening on port 3040...");
})