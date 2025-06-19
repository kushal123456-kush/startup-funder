"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchpayments, fetchuser, initiate } from '../../../actions/useractions'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import {useRouter} from 'next/navigation'
import { notFound } from 'next/navigation'

const PaymentPage = ({username}) => {
    const [paymentform,setPaymentform]=useState({    name: '',message: '', amount: ''})
    const [currentUser,setCurrentUser]=useState({})
    const [payments,setPayments]=useState([])
    const searchParams=useSearchParams()
    const router=useRouter()
   const { data: session, update } = useSession()

    useEffect(() => {
     getData()
    }, [session])
    
    useEffect(() => {
      if(searchParams.get("paymentdone")=="true"){
      toast('🦄 Payment done!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        router.push(`/${username}`)
    }},[])

    const handleChange=(e) => {
      setPaymentform({...paymentform,[e.target.name]:e.target.value})
    }
    
    const getData=async() => {
      let u=await fetchuser(username)
      if(u){
      setCurrentUser(u)
      let dbPayments= await fetchpayments(username)
      setPayments(dbPayments)
      console.log(u,dbPayments)
    }
  }
    

    const pay=async (amount) => {
      if (!currentUser.razorpayid) return
        let a= await initiate(amount,username,paymentform)
        let orderId=a.id
      var options={
        "key":currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
        "amount": Number(amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Get Me A Chai", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id":orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
      
      }
      var rzp1 = new Razorpay(options);
      rzp1.open();
    }

    
  return (
  <>
   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
   <Script 
                src="https://checkout.razorpay.com/v1/checkout.js" 
                strategy="beforeInteractive" 
            />

<div className=''>
      <div className="cover w-full relative">
      <img className='object-cover h-90 w-full' src={currentUser.profilepic} alt="" />
      <div className="absolute -bottom-20 right-[35%]  md:right-[46%] ">
      <img className='w-30 h-30 rounded-2xl border-1 ' src={currentUser.coverpic} alt=""/>
      </div></div>
      <div className="flex flex-col justify-center items-center mt-20 p-2 ">
      <div className="text-4xl font-bold">{username}</div>
      <div className="">Creating Dubious Advice</div>
      <div className="">
        <ul className='flex text-sm opacity-40'>
          <li>{payments.length} Payments</li>
          <li className='list-disc mx-7'>₹{payments.reduce((a,b)=>a+b.amount,0)} Raised</li>
        </ul>
      </div>
    </div>
    <div className="flex w-[90%] md:w-[80%] mx-auto gap-3 m-2 ">
      <div className="bg-slate-900 w-1/2 rounded-sm p-2 md:p-5">
      <h2 className='font-bold text-lg'>Suppoters</h2>
      <ul className=''>
        {payments.length==0&& <div>No Payments Done</div>}
        {payments.map((p,i)=>(
        <li className='flex m-2 ' key={i}>
          <img className=' md:size-7 size-7' src="avatar.gif" alt="" />
          <span>{p.name} donated <span className="font-bold">₹{p.amount}</span>  with a message {p.message}</span></li>
))} 
      </ul>
      </div>
      <div className="bg-slate-900 w-1/2 rounded-sm p-2">
      <h1 className='p-2 font-bold text-2xl'>Make a Payment</h1>
        <div className="flex flex-col w-full ">
          <input onChange={handleChange} value={paymentform.name} type="text" className='m-2 p-2 bg-slate-800 rounded-lg' name="name" id="" placeholder='Enter Name' />
          <input onChange={handleChange} value={paymentform.message} type="text" className='m-2 p-2 bg-slate-800 rounded-lg' name="message" id="" placeholder='Enter Message' />
          <input onChange={handleChange} value={paymentform.amount} type="number" className='m-2 p-2 bg-slate-800 rounded-lg' name="amount" id="" placeholder='Enter Amount' />
          <button disabled={paymentform.name?.length<3||paymentform.message?.length<5} onClick={() =>pay(Number(paymentform.amount)*100)} type="button" className="disabled:bg-slate-100 disabled:from-purple-100 m-2 p-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
        </div>
        <div className="flex">
        <button className='bg-slate-800 rounded-lg p-3 m-3' onClick={()=>pay(1000 )} >Pay ₹10</button>
        <button className='bg-slate-800 hidden md:inline-block rounded-lg p-3 m-3' onClick={()=>pay(2000 )} >Pay ₹20</button>
        <button className='bg-slate-800 rounded-lg p-3 m-3' onClick={()=>pay(3000 )} >Pay ₹30</button>
        </div>
      </div>
    </div>
    </div>
  </>
  )
}

export default PaymentPage
