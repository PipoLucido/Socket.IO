const path = require('path');

//conf servidor
const express = require('express');


const app = express();

app.use(express.static(path.join(__dirname,'/public')));

const server = app.listen(3000,()=>{
    console.log('Server on port 3000')});
//conf servidor

//conf websocket
const socketIO = require('socket.io');
const io = socketIO(server )

let clients_conected = []


io.on('connection',(socket)=>{

    
    socket.on('storeClientInfo',(datos)=>{
        //store id para mapear notificacion
        console.log('new conection stablish',socket.id);
        console.log(datos)
        clients_conected = { id_socket: socket.id , negocio_id : datos.negocio_sucursal_id }
    });


    socket.on('chatMessage',(datos)=>{
        //envio notificacion
        
        //a un cliente especifico
        io.sockets.connected[clients_conected.id_socket].emit('chatMessage',datos)
      
        //io.sockets.emit('chatMessage',datos)
        //a todos

       // a todos menos a mi
       //socket.broadcast.to('chatroom').emit('chatMessage',datos);



    });
})
//conf websocket

//routes
app.post('/testroute',(req,res) => {
  
 //   res.sendFile('index.html', {root: __dirname });
    console.log('>_ visitaNueva a post test!')
          
});
//routes