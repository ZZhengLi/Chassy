import Image from "next/image";
import Step2 from "../img/step2.png";
import BottomNav from "./BottomNav";
import Car from "../img/car.png";
import { useRouter } from "next/navigation";

export default function AddCar_UploadFront_After() {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4">
      <div className="align-content: center p-6">
        <Image
          src={Step2}
          width={350}
          alt="step2"
          className="mx-auto max-w-lg h-auto"
        />
      </div>
      <div className="align-content: center p-4">
        <Image
          src={Car}
          width={280}
          alt="car"
          className="max-w-full h-auto rounded-lg ml-6"
        />
      </div>
      <div>
        <div className="flex flex-nowrap p-1" >
          <p className="font-prompt text-[18px] pl-6">Registration number:</p>
          <input type="text" id="rNum" name="rNum" value="ณ5289" className="font-prompt text-[18px]"></input>
          <p className="text-right font-prompt text-[18px] pl-6">
          <i className="fas fa-cat">icon</i>
            Edit
          </p>
          </div>
          
        <div className="flex flex-nowrap p-1">
          <p className="text-left font-prompt text-[18px] pl-6">Brand:</p>
          <input type="text" id="brand" name="brand" value="Honda" className="font-prompt text-[18px]"></input>
        </div>
        <div className="flex flex-nowrap p-1">
          <p className="text-left font-prompt text-[18px] pl-6"> Model:</p>
          <input type="text" id="model" name="model" value="Jazz" className="font-prompt text-[18px] " ut></input>
        </div>
        <div className="flex flex-nowrap p-1">
          <p className="text-left font-prompt text-[18px] pl-6">Color:</p>
          <input type="text" id="color" name="color" value="yellow" className="font-prompt text-[18px]"></input>
        </div>
      </div>

      <div>
        <p className="text-center font-prompt text-[18px] p-6">
          * Check the license plate and details, if incorrect, please take a new
          photo or <p>edit</p>
        </p>
        
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8"
          onClick={() => router.push("/AddCar_UploadFront_Before")}
        >
          Back
        </button>
        <button
          className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
          onClick={() => router.push("/AddCar_UploadEvidence")}
        >
          Next
        </button>
      </div>
      <div>
        <BottomNav name="AddCar" />
      </div>
    </div>
  );
}
