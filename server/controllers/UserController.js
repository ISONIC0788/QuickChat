// sing up new user 

import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const signup = async (req , res)=>{

    const { email,fullName,password , bio } = req.body ;

    try{

       if(!fullName || !email || !password  || !bio ){
           return res.json({success: false  , message : " Missing Details "});
       }


       // to check account with email already exist 
       const user = await User.findOne({email});
         
       if(user){
          return res.json({success: false  , message : " Account already exists  "});
       }

      // for hashing or encpt password
       const salt = await bcrypt.genSalt(10);

       const hashedPassword = bcrypt.hash(password , salt)
       
       // for creating new user 
       

       const  newUser  = await User.create({
           email,fullName,password: hashedPassword , bio
       })


       const token = generateToken(newUser._id);

       res.json({success: true , userData : newUser , token , message: "Account Created success fully "});

    } catch (error) {
 
       console.log(error.message);
       res.json({success: false , message: error.message});
    }

}


// controller to login a user 

export  const  login = async (req , res ) =>{
    try {
        
       const {email , password} = req.body ;

       // for finding email if exist 
       const userData = await User.findOne({email})

       // for comparing password
       const isPasswordCorrect  = await bcrypt.compare(password , userData.password);

       if(!isPasswordCorrect){

           return res.json({success:false , message : "Invalid credential "})
       }

       const token = generateToken(userData._id);

       res.json({success: true , userData : newUser , token , message: "Account Created success fully "});

    } catch (error) {
          console.log(error.message);
       res.json({success: false , message: error.message});
    }
} 