"use server"
import Razorpay from "razorpay"
import Payment from "@/app/models/Payment"
import connectDb from "@/app/db/connectDB"
import User from "@/app/models/User"
import mongoose from "mongoose"

export const initiate=async(amount,to_username,paymentform) => {
  await connectDb()

  
  let user=await User.findOne({username:to_username})
  if (!user) return { error: "User not found" };
  const secret = user.razorpaysecret;

  var instance = new Razorpay({ key_id:user.razorpayid, key_secret:secret })
  
  let options={
    amount:Number.parseInt(amount),
    currency:"INR"
  }

  let x=await instance.orders.create(options)

  await Payment.create({oid:x.id,amount:amount/100,to_user:to_username,name:paymentform.name,message:paymentform.message})
  return x
}
export const fetchuser = async (identifier) => {
  await connectDb();
  
  // Try to find by email first
  let user = await User.findOne({ email: identifier }).lean();
  
  // If not found by email, try by username
  if (!user) {
    user = await User.findOne({ username: identifier }).lean();
  }
  
  // If user found, convert to plain object
  if (user) {
    return user; // .lean() already returns a plain object
  }
  
  return null; // Return null if no user found
}

export const fetchpayments = async (username) => {
  await connectDb()
  // find all payments sorted by decreasing order of amount and flatten object ids
  let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()
  return p
}

export const updateProfile = async (data, email) => {
  await connectDb();
  
  try {
    // Find the existing user
    const existingUser = await User.findOne({ email });
    
    // If username is being changed
    if (data.username && existingUser && data.username !== existingUser.username) {
      // Check if new username already exists
      const usernameExists = await User.findOne({ username: data.username });
      if (usernameExists) {
        return { error: "Username already exists" };
      }
      
      // Create a new user with the same email but different username
      const newUser = await User.create({
        ...data,
        email, // Keep same email
        _id: new mongoose.Types.ObjectId(), 
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Optionally: Delete the old user record
      // await User.deleteOne({ _id: existingUser._id });
      
      return { success: true, newUser: true };
    }

        
      await User.updateOne({email: data.email}, ndata)

 }
  catch (error) {
    console.error("Update error:", error);
    return { error: "Database operation failed" };
  }
};