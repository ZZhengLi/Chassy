import Image from "next/image";
import Step2 from "../img/step2.png";
import BottomNav from "./BottomNav";
import Car from "../img/car.png";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
import { useState } from "react";
import Steppers from "./Steppers";
import {
  FiEdit,
} from "react-icons/ri";

export default function AddCar_UploadFront_After() {
  const router = useRouter();
  const [regNum, setRegNum] = useState("ณ5289");
  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Jazz");
  const [color, setColor] = useState("Yellow");
  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">Add Car</h1>
      </div>

      <div className="bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="flex flex-col space-y-4">
          <div className="align-content: center p-6">
            <Image
              src={Step2}
              width={350}
              alt="step2"
              className="mx-auto max-w-lg h-auto"
            />
          </div>
          <div>
            <Steppers/>
          </div>
          <div className="flex items-center justify-center">
          <div className="align-content: center p-4">
            <Image
              src={Car}
              width={280}
              alt="car"
              className="max-w-full h-auto rounded-lg ml-6"
            />
          </div>
          </div>
          <div>
          
            <div className="flex flex-nowrap p-1">
              <p className="font-prompt text-[18px] pl-6">
                Registration number:
              </p>
              <input
                type="text"
                id="regNum"
                name="regNum"
                value={regNum}
                className="font-prompt text-[18px]"
                onChange={(e) => setRegNum(e.target.value)}
              ></input>
              
              <p className="text-right font-prompt text-[18px] pl-6">
                <i className="material-symbols-outlined">edit_square</i>
                Edit
              </p>
              
            </div>

            <div className="flex flex-nowrap p-1">
              <p className="text-left font-prompt text-[18px] pl-6">Brand:</p>
              <input
                type="text"
                id="brand"
                name="brand"
                value={brand}
                className="font-prompt text-[18px]"
                onChange={(e) => setRegNum(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-nowrap p-1">
              <p className="text-left font-prompt text-[18px] pl-6"> Model:</p>
              <input
                type="text"
                id="model"
                name="model"
                value={model}
                className="font-prompt text-[18px] "
                onChange={(e) => setModel(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-nowrap p-1">
              <p className="text-left font-prompt text-[18px] pl-6">Color:</p>
              <input
                type="text"
                id="color"
                name="color"
                value={color}
                className="font-prompt text-[18px]"
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </div>
            
          </div>

          <div className="text-center font-prompt text-[18px] p-6">
            <p>
              * Check the license plate and details, if incorrect, please take a
              new photo or{" "}
            </p>{" "}
            <p>edit</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8"
              onClick={() => router.back()}
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
      </div>
    </div>
  );
}
