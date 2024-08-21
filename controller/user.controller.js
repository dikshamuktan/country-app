import userModel from "../model/user.model.js";
import config from "../config/config.js";
import bcrypt from "bcryptjs"

export const registerUser= async (req, res) => {
    try{
     const privioususer= await userModel.findOne({email:req.body.email});
     if(privioususer){
     const err= new Error("user email already exist")
     err.statusCode = 400
     throw err

     }

     const currentPassword= req.body.password
     const hashedPassword= bcrypt.hashSync(currentPassword,10)
     const saveUser= await userModel.create({
        ...req.body,
        password:hashedPassword,
     });

     res.json(saveUser);

    }catch(err){
        res.status(err?.statusCode || 500).json({msg:err?.message|| "something went wrong"})
    };
};


export const loginUser= async(req, res)=> {
    try{
    const finduser= await userModel.findOne({email:req.body.email}).select("password");
    if(finduser){
        const err= new Error("user does not exist")
        err.statusCode= 400
        throw err
    }

    const currentPassword= finduser.password;
    const comparePassword= bcrypt.compareSync(req.body.password,currentPassword)

    if(!comparePassword){
      const err= new Error("invalid password")
      err.statusCode= 400
      throw err
    }

    const token= jwt.sign({_id:finduser._id},config.jwt_secret,{
        issuer:config.jwt_issuer,
        expiresIn:config.jwt_expiry_date,
    })
    return res({msg:"loged in successfully",accessToken:token});

    }catch(err){
        res.status(err?.statusCode || 500).json({msg:err?.message|| "something went wrong"})
    };
};