// for creating routes and api end points

import express from 'express';
import { checkAuth, login, signup, updateProfile } from '../controllers/UserController.js';
import { protectRoute } from '../middleware/auth.js';

const userRoutes = express.Router(); // this it will create new user rountes 

userRoutes.post("/signup" , signup );

userRoutes.post("/login" , login) ;
userRoutes.put("/update-profile" , protectRoute  , updateProfile) ;  // for update  profile that are protected 

userRoutes.get("/check" , protectRoute  , checkAuth) ;  // for update  profile that are protected 


export default userRoutes;


//

