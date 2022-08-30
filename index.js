const path = require('path');

//conf servidor
const express = require('express');


const app = express();

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());

const server = app.listen(80,()=>{
    console.log('Server on port 3000')});
//conf servidor

//conf websocket
const socketIO = require('socket.io');
const io = socketIO(server )

let clients_conected = []

io.on('connection',(socket)=>{
  
    socket.on('storeClientInfo',(datos)=>{
        //store id para mapear notificacion
        //console.log('new conection stablish',socket.id);
        //console.log(datos)
        new_clients_conected = { id_socket: socket.id , sucursal_id : datos.sucursal_id }
        clients_conected.push(new_clients_conected)
    });
    
    socket.on("disconnect", (datos) => {

        //console.log('client desconected!')
        //console.log(socket.id); 
        //console.log(clients_conected)
        clients_conected.map(function(clients,index){

            if(clients.id_socket == socket.id){
                clients_conected.splice(index, 1);
            }


        })
        console.log(clients_conected)
    });

})
//conf websocket




//routes
app.post('/notificacion_nueva',(req,res) => {
  
    //console.log("req:",req.body)

    let datos = {
        id_pedido: req.body.id_pedido ,
        sucursal_id: req.body.sucursal_id
    }

    clients_conected.map(function(clients,index){

        if(clients.sucursal_id == datos.sucursal_id){
            io.sockets.connected[clients.id_socket].emit('enviarNotificacion',datos)
        }

    })

    //console.log('>_ notificacion enviada!')
    res.send(JSON.stringify(">_ notificacion enviada!"));

});
//routes