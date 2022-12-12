import React from "react";
import BottomNav from "./BottomNav";
import Image from "next/image";
import Step1 from "../img/step1.png";
import DownArrow from "../img/downArrow.png";
import Qr from "../img/qr.png";
import { useRouter } from "next/navigation";




export default function AddCar_Qr() {
  const router = useRouter();
  return (
    <div class = "flex flex-col space-y-4">
      <div class = "align-content: center">
        <Image src={Step1} width={250} alt="step1" class = "mx-auto max-w-lg h-auto" />
      </div>
      <div class = "flex flex-col space-y-4">
        <p class="text-center font-prompt text-[14px]">
          Customers can register via Line to receive notification of receiving the car.
        </p>
      </div>
      <div class = "flex flex-col space-y-4">
        <p class="text-center font-prompt text-[18px]">Scan now</p>
      </div>
      {/* <div class = "flex flex-col space-y-4">
        <p>down arrow icon</p>
      </div> */}
      <div class = "align-content: center">
        <Image src={DownArrow} alt="Down arrow" class = "object-scale-down h-5 w-5 mx-auto max-w-lg h-auto" />
      </div>
      <div class = "flex flex-col space-y-4">
        <Image src={Qr} width={200} alt="qr" class = "mx-auto max-w-lg h-auto" />
      </div>
      <div class = "flex items-center justify-center">
        <button class="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-2 px-4 rounded items-center" onClick={() => router.push("/AddCar_UploadFront_Before")}>
          Next 
        </button>
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
