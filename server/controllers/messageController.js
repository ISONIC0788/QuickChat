 // get all users except  the logged in user 

import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

 export const getUsersForSidebar = async (req , res ) =>{
     try {
        const userId = req.user._Id ; 

        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password"); //  $ne not equal and then remove password from the result 

        // count number of message not seen 

        const unseenMessages = {};

        const promises = filteredUsers.map( async (user) =>{

            const messages = await Message.find({senderId: user._id , receiverId: userId , seen: false});

            if(messages.length > 0){
                unseenMessages [user._id] = messages.length ;
            }

            // to excute all promisses 
           await Promise.all(promises)


           res.json({success: true , users : filteredUsers , unseenMessages});

        })


     }catch(error){
          console.log(error.messages);
           res.json({success: false , message: error.message});
     }
 }


// controller to get all messages for selected user 


export const getMessages  = async (req , res ) =>{
    try {

        const {id : selectedUserId}  = req.params ;

        const myId = req.user._id ;

        const messages = await Message.find({
            $or: [
                {senderId: myId , receiverId : selectedUserId} , // messaeg for my my id 
                {senderId: myId , receiverId : selectedUserId},  // message for selected use id 
            ]
        });

        await Message.updateMany({senderId : selectedUserId , receiverId: myId} , {seen: true })

        // to sending response 

        res.json({success: true  , messages })
        
    } catch (error) {
          console.log(error.messages);
           res.json({success: false , message: error.message});
    }
}

// api to mark message us seen using message id 

export const markMessageAsSeen = async (req , res ) =>{
    try {

        const {id }  = req.params; // message id 

        await Message.findByIdAndUpdate(id , {seen: true});

        res.json({success:true })

    }catch (error){
        console.log(error.messages);
           res.json({success: false , message: error.message});
    }
}



// sending message to other user 


export const sendMessage = async (req , res ) =>{
    try {

        const {text , image} = req.body; // text and image from body

        const receiverId = req.params.id; 

        const senderId = req.user._id;

        let imageUrl ;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
             imageUrl = uploadResponse.secure_url;

        }
        const newMessage = await Message.create({
                senderId , 
                receiverId ,
                text ,
                image: imageUrl
             })
        res.json({success:true , newMessage})
        
    } catch (error) {
         console.log(error.messages);
           res.json({success: false , message: error.message});
    }

}