const Express= require("express")
const Http=require("http").Server(Express)
const SocketIo= require("socket.io")(Http)

let position={
    x:200,
    y:200
}
SocketIo.on("connection",socket=>{
socket.emit('connections',Object.keys(SocketIo.sockets.connected).length)

   socket.on('disconnect',()=>{
       console.log("a user disconnected")
   })
   socket.on('chat-message',data=>{
       socket.broadcast.emit('chat-message',data)
   })
   socket.on('typing', (data) => {
    socket.broadcast.emit('typing', (data));
});

socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
});
   socket.on('joined',data=>{
       socket.broadcast.emit('joined',data)
   })
   socket.on('leave', (data) => {
    socket.broadcast.emit('leave', (data));
});
})
Http.listen(3030,()=>{
    console.log("server is listening at 3030")
})