
const { cosineSimilarity } = require("ai");
const express = require("express");
const http = require("http");
const path = require("path");
const { title } = require("process");
const socketio  = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")))

io.on("connection" , function (socket){
    
    console.log("A user connected:", socket.id);

    socket.on("send-location" , function(data){

        console.log("sending location : ",socket.id, data)

        io.emit("receive-location" , {id: socket.id , ...data})
    })

    socket.on("disconnect" , function(){
        console.log("User disconnected: ",socket.id);
        io.emit("user-disconnected" , socket.id);
    });

    console.log("connected....");
})

app.get("/" , function (req , res){
    res.render("index");
})


server.listen(3000, () => {   // <-- use server.listen, not app.listen
    console.log("Listening to PORT: 3000 .....");
});