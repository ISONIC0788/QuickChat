// midlleware to protect routes 

import User from "../models/User.js";

import jwt from "jsonwebtoken"

export const protectRoute = async (req , res , next ) =>{
    try {
        // const token = req.headers.token;

        /**
         * som corrected code 
         * 
         */

        /*
        const authHeader =  req.headers.authorization;
         const token = authHeader && authHeader.split(' ')[1];
         if (!token) return res.json({ success: false, message: "jwt must be provided" });
         
        */
          const authHeader = req.headers.authorization;
          const token = authHeader && authHeader.split(' ')[1]; // Get the token part
          if (!token) return res.json({ success: false, message: "JWT must be provided" });


        const decoded = await jwt.verify(token , process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if(!user) return res.json({success: false ,message :"User not found "});

        // for access user data in controll function 

        req.user = user; 

    // then got to next 

       next();
    } catch (error) {
          // for error handling 
        console.log(error.message);
        console.log("error in auth middleware");
        res.json({success: false ,message :error.message});
    }
}