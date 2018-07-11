const path = require('path');

//conf servidor
const express = require('express');


const app = express();

app.use(express.static(path.join(__dirname,'/public')));

const server = app.listen(3000,()=>{console.log('Server on port 3000')});
//conf servidor

//conf websocket
const socketIO = require('socket.io');
const io = socketIO(server )

io.on('connection',(socket)=>{
    console.log('new conection stablish',socket.id);
    socket.on('chatMessage',(datos)=>{
        io.sockets.emit('chatMessage',datos)


    });
})
//conf websocket

