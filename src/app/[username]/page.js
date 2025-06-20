import React from 'react';
import PaymentPage from '../components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDb from '../db/connectDB';
import User from '../models/User';

const Username = async ({ params }) => {
  await connectDb(); // ✅ properly call the DB connect function

  const user = await User.findOne({ username: params.username });
  if (!user) return notFound(); // ✅ handles 404 properly

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me A Chai`,
  };
}
