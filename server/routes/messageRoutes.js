import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';

const messageRoutes = express.Router();

messageRoutes.get("/users" , protectRoute  , getUsersForSidebar)
messageRoutes.get("/:id" , protectRoute  , getMessages) // to getin message 
messageRoutes.put("/mark/:id" , protectRoute  , markMessageAsSeen) // mark message us seeen 

messageRoutes.post("/send/:id" , protectRoute , sendMessage) // allow to send message to other user and receive it 

export default messageRoutes
