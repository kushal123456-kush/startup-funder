import React from 'react'
import PaymentPage from '../components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDb from '../db/connectDB';
import User from '../models/User';

 const Username=async ({ params })=> {
  const checkUser=async () => {
    await connectDb
    let u =await User.findOne({username:params.username})
    if(!u){
       return notFound()
    }
  }
  await checkUser()
  const { username } = await params;  // Await params before destructuring
  return (
    <>
      <PaymentPage username={username} />
    </>
  );
}
export default Username
export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me A Chai`,
  }
}