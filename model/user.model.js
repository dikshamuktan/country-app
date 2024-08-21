import mongoose from "mongoose";

const userSchema= mongoose.Schema(
    {
       name:{
        type:String,
        require:true
       },
       email:{
        type:String,
        require:true
       },
       address:{
        type:String,
        require:true
       },
       password:{
        type:String,
        require:true,
        select:false
       },
    },
    {timestampes:true}
);

const userModel= mongoose.model("user",userSchema);
export default userModel;
