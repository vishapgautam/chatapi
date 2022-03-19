const express = require('express')
const app = express()
const path=require('path')
const http = require('http').createServer(app)
const homeController=require('./routes/home')
const PORT = process.env.PORT || 3000


app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, '../views'))
app.set('view engine','ejs');



app.use('/',homeController)


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})