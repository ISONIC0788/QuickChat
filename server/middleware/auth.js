// midlleware to protect routes 

import User from "../models/User.js";

import jwt from "jsonwebtoken"

export const protectRoute = async (req , res , next ) =>{
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if(!user) return res.json({success: false ,message :"User not found "});

        // for access user data in controll function 

        req.user = user; 

    // then got to next 

       next();
    } catch (error) {
          // for error handling 
        console.log(error.message);
        res.json({success: false ,message :error.message});
    }
}