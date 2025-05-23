import mongoose from "mongoose";

// function to connect to mongo db 

export  const connectDB = async () =>{
    try {
        mongoose.connection.on('connected' , ()=>{
            console.log('Database connected')
        })

        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch(error){

        console.log('Error occured ', error)

    }

}