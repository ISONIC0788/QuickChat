import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMessageAsSeen } from '../controllers/messageController.js';

const messageRoutes = express.Router();

messageRoutes.get("/users" , protectRoute  , getUsersForSidebar)
messageRoutes.get("/:id" , protectRoute  , getMessages) // to getin message 
messageRoutes.put("mark/:id" , protectRoute  , markMessageAsSeen) // mark message us seeen 

export default messageRoutes
