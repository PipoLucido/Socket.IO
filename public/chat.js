const socket = io();

//DOM elements
let message = document.getElementById('message');
let userName = document.getElementById('username');
let actions = document.getElementById('actions');
let outputs = document.getElementById('output');
let btn = document.getElementById('send');
 
btn.addEventListener('click',function(){
   socket.emit('chatMessage',{
    username: username.value ,
    message: message.value ,
    negocio_sucursal_id:"6652"
    }) ;
});

socket.emit('storeClientInfo', { negocio_sucursal_id:"6652" });

socket.on('chatMessage',function(datos){
    outputs.innerHTML += `<p><strong>${datos.username}:</strong><br>${datos.message}</p><br>`;
});