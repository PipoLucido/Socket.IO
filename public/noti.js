const socket = io('https://notifications.habitueonline.com', { secure: true, reconnect: true, rejectUnauthorized: false });

//DOM elements
let outputs = document.getElementById('output');

 
socket.emit('storeClientInfo', { sucursal_id:"6652" });

socket.on('enviarNotificacion',function(datos){
    outputs.innerHTML += `<p><strong>id_pedido: ${datos.id_pedido}</strong><br>sucursal_id: ${datos.sucursal_id}</p><br>`;
});