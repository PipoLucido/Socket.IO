const socket = io();

//DOM elements
let outputs = document.getElementById('output');

 
socket.emit('storeClientInfo', { sucursal_id:"6652" });

socket.on('enviarNotificacion',function(datos){
    outputs.innerHTML += `<p><strong>${datos.id_pedido}:</strong><br>${datos.sucursal_id}</p><br>`;
});