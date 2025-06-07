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
          const {data} =   await axios.post("/api/auth/check") // for api call to check if user auth 
          if(data.success){
                setAuthUser(data.user);
                connectSocket(data.user);
          }
        } catch (error) {
            toast.error(error.message)
        }
     }


     // login function to handle user authentication and socket connnection 

     const login  = async(state ,credentials) =>{
        try{
            // addition of api call 
            const {data } = await axios.post(`/api/auth/${state}`, credentials);
            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData)
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                // to add it in local storate 

                localStorage.setItem('token', data.token);
                toast.success(data.message);

            }else{
                toast.error(data.message);
            }


        }catch(error){
               toast.error(error.message);
        }

     }

     // logout function to handle user logout and socket  disconnec 

     const logout  = async ()  =>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUser([]);

        axios.defaults.headers.common["token"] = null ;

        toast.success("logged out success full")

        socket.disconnect();

     }

     // update profile function to handler user profile update

     const updateProfile = async (body) =>{
        try {
        const {data}  =  await axios.put('/api/auth/update-profile' , body ,
                        {
                          headers: {
                           Authorization: `Bearer ${localStorage.getItem("token")}`
                          }
                        }
         )
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile update successfully ");
            }

            // console.log(data);


        } catch (error) {
            toast.error(error.message);
        }
     }

     /*
     ,{headers: {Authorization:localStorage.getItem('token') } }
     */


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


     // connect socket function to handle socket  connection and online user updates
   

     useEffect(() =>{
           if(token){
                //  axios.defaults.headers.common["token"]  = token ; // here  we add token 
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

           }

           // allow  to excute check auth 
           checkAuth();
     } , []);

     // to allow all axion and other values to access in every where in  files 
    const value = {
         axios,
         authUser,
         onlineUser,
         socket,
         login,
         logout,
         updateProfile,
    }

    return (
        <AutoContext.Provider value={value}>
            {children}
        </AutoContext.Provider>
    )

}