import express from 'express';
import "dotenv/config"
import cors  from "cors"

import http from "http"
import { connectDB } from './lib/db.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { Server } from 'socket.io';





// create express app  and http server 

const app = express();

const server  = http.createServer(app);  // becouse http support socket.io 

// initialize socket.io server 
export const io = new Server(server ,{
    cors : {origin: "*"} // allow all origin 
})

// store online users 

export const userSockepMap = {}  // {user id : socket id }

io.on("connection" ,(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User Connected " , userId);

    if (userId) userSockepMap[userId] = socket.id; 

    // emitt online  users to all connected  clients 

    io.emit("get Online users ", Object.keys(userSockepMap))

    socket.on("disconnect"  , () =>{
        console.log("User Disconnect " , userId);
        delete userSockepMap[userId]

        io.emit("get Online users" , Object.keys(userSockepMap))
    })
})




// Middleware  setup 

app.use(express.json({limit:"4mb"}));

// allow ower all URL TO CONNECT WITH BACKED 

app.use(cors());

// api end points 
// import user routes 

// routes setup 
app.use("/api/status", (req , res ) => res.send("Server is live"))
app.use("/api/auth" , userRoutes)

app.use("api/messages" , messageRoutes)

// connect to mongo db 

await connectDB();




// port for the server 

const PORT = process.env.PORT || 5000;

server.listen(PORT , ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})



