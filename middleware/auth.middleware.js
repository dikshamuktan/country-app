import jwt from "jsonwebtoken"
import config from "../config/config.js"
import userModel from "../model/user.model.js"

const authenticateUser= async(req, res, next)=> {
    try{

     const userToken= req.header?.authorization?.split('')[1]
     if(!userToken) throw new Error("invalid token")

     const verifyToken= jwt.verify(userToken,config.jwt_secret)
      if(!verifyToken) throw new Error("token not verified")

      const currentUser= userModel.findOne({_id:verifyToken._id})
      if(!currentUser) throw new Error("user not found")
      req.user= currentUser
      next()

    }catch(err){
        res.status(500).json({msg:err.message || 'Error!!!'})
    };
};


export default authenticateUser;