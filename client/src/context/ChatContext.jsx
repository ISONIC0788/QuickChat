import { createContext, useContext, useEffect, useState } from "react";
import { AutoContext } from "./AutoContext";
import toast from "react-hot-toast";
// import { data } from "react-router-dom";



export const ChatContext = createContext();



export const ChatProvider = ({children}) =>{
    const [messages , setMessages] = useState([]);// empty array 
    const [users , setUsers] = useState([]); // empty array 
    const [selectedUser , setSelectedUser] = useState(null);
    const [unseenMessages , setUnseenMessages] = useState({})  // empty object 

     const {socket , axios } = useContext(AutoContext); // help to use the the socket and function form auto context
     
     const getUsers = async () =>{
        try {
         const {data} = await axios.get('/api/messages/users'); // api call to get the users
         if(data.success){
            setUsers(data.users); // set the users to the state
            setUnseenMessages(data.unseenMessages);
         }else{
            toast.error("There is not Data found");
         }

        } catch (error) {
            toast.error(error.messages);
        }
     }

     // function to get selected user 

     const getMessages = async (userId) =>{
         try {
           const {data} =  await axios.get(`/api/messages/users/${userId}`);
           if(data.success){
              setMessages(data.messages);
           }
           // else if ther is no message 
         } catch (error) {
            toast.error(error.messages);
         }
     }


     // function  to send message to selected user 

     const sendMessage = async (messageData) =>{
        try{
             const {data} =  await axios.post(`/api/messages/send/${selectedUser._id}` , messageData);
             if(data.success){
                setMessages((prevMessages)=>[...prevMessages , data.newMessage]);
             }else{
                toast.error(data.messages)
             }

        }catch(error){
            toast.error(error.message)
        }

     }

    //function to subscribe  to message  for selected users 

    const subscribeToMessages = async () =>{
        if(!socket) return;

        socket.on('newMessages' , (newMessages)=>{
              if(selectedUser && newMessages.senderId === selectedUser._id){
                 newMessages.seen = true ;
                 setMessages((prevMessages)=>[...prevMessages , newMessages ]);
                  axios(`/api/messages/mark/${newMessages._id}`)   // to api to update seen property 
              }else{
                  setUnseenMessages((prevUnseenMessages)=>({
                     ...prevUnseenMessages,[newMessages.senderId] : 
                     prevUnseenMessages[newMessages.senderId] ? prevUnseenMessages 
                     [newMessages.senderId] + 1 : 1
                  })); // return fo  an object 
              }
        });
    }

    // function to unsubscribe  from messages 


    const unsubscribeFromMessages  = () =>{
        if(socket)  socket.off("newMassages");
    }

    useEffect(()=>{
       subscribeToMessages();
       return () => unsubscribeFromMessages();
    },[socket , selectedUser])


     const value = {
        messages , users , selectedUser , getUsers , setMessages , sendMessage , setSelectedUser,
        unseenMessages , setUnseenMessages 
        
     } // allow to pass the values to the context provider
     return (
           <ChatContext.Provider value={value}>
               {children}
           </ChatContext.Provider>)
}
