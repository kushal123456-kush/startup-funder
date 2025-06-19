import React from "react";
import Link from "next/link";
export default function Home() {
  return (
   <>
   <div className="text-white h-[40vh] flex flex-col justify-center items-center">
    <div className="flex items-center justify-center">
    <div className="text-4xl">Buy Me A Chai</div>
   <img className="" width={64} src="/tea.gif" alt="" />
   </div>
   <div className="py-3 px-4 md:px-0">A crowd funded platform for creators.Get funded by your fans and followers.Start Now!</div>
   <div className="py-1 ">
    <Link href="/login">
   <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
   </Link>
   <Link href="/About">
   <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read  More</button>
  </Link> 
  </div></div>
   <div className="bg-blue-200 h-[2px] opacity-40"></div>
   <div className="text-white container mx-auto p-10">
    <div className="flex justify-center text-2xl my-10 font-bold">Your Fans can buy you Chai</div>
    <div className="flex justify-around gap-5">
    <div className="flex flex-col justify-center items-center">
      <div className=""><img className="bg-slate-500 rounded-full p-2" width={88} src="/man.gif" alt="" /></div>
      <div className="font-bold">Fans want to help</div>
      <div className="">Your Fans are there to help you</div>
    </div>
    <div className="flex flex-col justify-center items-center">
      <div className=""><img className="bg-slate-500 rounded-full p-2" width={88} src="/coin.gif" alt="" /></div>
      <div className="font-bold">Fans want to help</div>
      <div className="">Your Fans are there to help you</div>
    </div>
    <div className="flex flex-col justify-center items-center">
      <div className=""><img className="bg-slate-500 rounded-full p-2" width={88} src="/group.gif" alt="" /></div>
      <div className="font-bold">Fans want to help</div>
      <div className="">Your Fans are there to help you</div>
    </div>
   </div></div>
   <div className="bg-blue-200 h-[2px] opacity-40"></div>
   <div className="text-white container mx-auto p-5">
    <div className="flex justify-center text-2xl my-10 font-bold">Learn more about us</div>
    <div className="flex justify-around gap-5">
    <iframe className="" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div></div>
  </>
  );
}
