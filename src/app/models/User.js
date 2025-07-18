import mongoose from "mongoose";
const  {Schema, models,model}=mongoose;


const UserSchema=new Schema({
    email:{type:String,required:true},
    name:{type:String},
    username:{type:String,required:true},
    profilepic:{type:String},
    coverpic:{type:String},
    razorpayid:{type:String}, 
    razorpaysecret:{type:String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date ,default:Date.now},
} ,{ strict: false })

export default mongoose.models.User||model("User",UserSchema)