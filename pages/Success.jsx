import React from "react";
import Successful from "../img/success.png";
import Image from "next/image";
import BottomNav from "./BottomNav";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <div>
      <div>
        <Image src={Successful} width={400} alt="success" 
          className="mx-auto max-w-lg h-auto align-content: center p-16 "/>
      </div>
      <div>
        <p className="text-center font-prompt text-[22px]">successfully added the car</p>
      </div>
      <div>
        <p className="text-center text-[#789BF3] font-prompt text-[22px]" onClick={() => router.push("/Home")}>go to main page</p>
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
