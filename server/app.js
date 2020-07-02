const Express= require("express")
const Http=require("http").Server(Express)
const SocketIo= require("socket.io")(Http)

let position={
    x:200,
    y:200
}
SocketIo.on("connection",socket=>{
    socket.emit("position",position)// for conncted client socket is used
    socket.on("move",data=>{
        switch(data){
            case "left":
                position.x-=5;
                SocketIo.emit("position",position);// for all client,SocketIo object is used
                break;
            case "right":
                position.x+=5;
                SocketIo.emit("position",position);
                break;
            case "up":
                position.y-=5;
                SocketIo.emit("position",position);
                break;
            case "down":
                position.y+=5;
                SocketIo.emit("position",position);
                break;
        }
    })
})
Http.listen(8080,()=>{
    console.log("server is listening at 8080")
})
