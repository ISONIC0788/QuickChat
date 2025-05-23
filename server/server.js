import express from 'express';
import "dotenv/config"
import cors  from "cors"

import http from "http"
import { connectDB } from './lib/db.js';

// create express app  and http server 

const app = express();

const server  = http.createServer(app);  // becouse http support socket.io 


// Middleware  setup 

app.use(express.json({limit:"4mb"}));

// allow ower all URL TO CONNECT WITH BACKED 

app.use(cors());

// api end points 

app.use("/api/status", (req , res ) => res.send("Server is live"))

// connect to mongo db 

await connectDB();




// port for the server 

const PORT = process.env.PORT || 5000;

server.listen(PORT , ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})



