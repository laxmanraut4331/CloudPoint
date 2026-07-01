import  jwt from 'jsonwebtoken';
import Admin from "../models/admin.model.js";

export const isLoggedIn = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
        return res.status(401).json({message:"Not authorized, no token"})
        }
        const decode= jwt.verify(token,process.env.JWT_SECRET );
        const admin= await Admin.findById(decode.userId).select("-password");
        req.admin=admin;
        next();         
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})  
    }
}