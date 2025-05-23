import jwt  from "jsonwebtoken"

// function generate token for user

export const generateToken = (userId) =>{
    const token  = jwt.sign({userId} , process.env.JWT_SECRET);
}
