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
    <div className="flex flex-col space-y-4">
      <div className="align-content: center p-8">
        <Image
          src={Step1}
          width={350}
          alt="step1"
          className="mx-auto max-w-lg h-auto"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-center font-prompt text-[18px]">
          Customers can register via Line to receive notification of receiving
          the car.
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-center font-prompt text-[18px]">Scan now</p>
      </div>
      {/* <div className = "flex flex-col space-y-4">
        <p>down arrow icon</p>
      </div> */}
      <div className="align-content: center">
        <Image
          src={DownArrow}
          alt="Down arrow"
          className="object-scale-down h-5 w-5 mx-auto max-w-lg h-auto"
        />
      </div>
      <div className="flex flex-col space-y-4 p-4">
        <Image
          src={Qr}
          width={250}
          alt="qr"
          className="mx-auto max-w-lg h-auto"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center text-[18px]"
          onClick={() => router.push("/AddCar_UploadFront_Before")}
        >
          Next
        </button>
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
