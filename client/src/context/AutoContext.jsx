import { createContext ,useState  } from "react";

import axios from "axios";

import toast from "react-hot-toast";
import { useEffect } from "react";

import { io } from "socket.io-client";

//import backend url 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// axion us base url 

axios.defaults.baseURL = backendUrl;
export const AutoContext = createContext();

export const AutoProvider = ({children}) =>{
     const [token , setToken] = useState(localStorage.getItem('token'));

     const [authUser , setAuthUser] = useState(null);
     const [onlineUser, setOnlineUser] = useState([]); // init with empty array 
     const [socket, setSocket] = useState(null); // init with empty null

     // check if user is authenticted and if so , set the user data and connect to the socket 

     const checkAuth = async () =>{
        try {
          const {data} =   await axios.get("/api/auth/check") // for api call to check if user auth 
          if(data.success){
                setAuthUser(data.user);
          }
        } catch (error) {
            toast.error(error.message)
        }
     }

     // connect socket function to handle socket  connection and online user updates

     const connectSocket = (userData) =>{
             if(!userData || socket?.conneted) return;
                
             const newSocket = io(backendUrl  , {
                query:{
                     userId:userData._id,
                }
             });

             newSocket.connect();
             setSocket(newSocket)

             newSocket.on("getOnlineUsers" , (userIds)=>{
                 setOnlineUser(userIds);
             });

     }


     useEffect(() =>{
           if(token){
                 axios.defaults.headers.common["token"]  = token // here  we add token 
           }

           // allow  to excute check auth 
           checkAuth();
     } , []);

     // to allow all axion and other values to access in every where in  files 
    const value = {
         axios,
         authUser,
         onlineUser,
         socket
    }

    return (
        <AutoContext.Provider value={value}>
            {children}
        </AutoContext.Provider>
    )

}