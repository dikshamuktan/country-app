import mogoose from "mongoose";

 const countrySchema= mogoose.Schema(
    {
        countryName:{
            type:String,
            require:true
        },
        countryCapital:{
            type:String,
            require:true
        },
        population:{
            type:Number,
            require:true
        },
    },
    {timestampes:true}
 )


 const countryModel= mogoose.model("country",countrySchema);
 export default countryModel;