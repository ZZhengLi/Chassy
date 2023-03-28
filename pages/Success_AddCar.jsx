import React from "react";
import Successful from "../img/success.png";
import Image from "next/image";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function Success_AddCar() {
  const router = useRouter();
  return (
    <div>
      <div>
        <div className="py-24"></div>
        <div className="flex items-center justify-center">
          <IoCheckmarkCircleSharp
            className="w-72 h-72 place-self-center "
            color="#7FD1AE"
          />
        </div>
      </div>

      <div className="text-center font-prompt text-[22px]">
        เพิ่มรถเรียบร้อย
      </div>
      <div className="text-center text-[#FA8F54] font-prompt text-[22px]">
        <button onClick={() => router.push("/Home")}>ไปที่หน้าหลัก</button>
      </div>
      <div>
        <BottomNav name="AddCar" />
      </div>
    </div>
  );
}
