import Image from "next/image";
import Step2 from "../img/step2.png";
import BottomNav from "./BottomNav";
import Car from "../img/car.png";
import { useRouter } from "next/navigation";

export default function AddCar_UploadFront_After() {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4">
      <div className="align-content: center">
        <Image
          src={Step2}
          width={300}
          alt="step2"
          className="mx-auto max-w-lg h-auto"
        />
      </div>
      <div className="align-content: center">
        <Image
          src={Car}
          width={250}
          alt="car"
          className="max-w-full h-auto rounded-lg ml-6"
        />
      </div>
      <div>
        <div className="flex flex-col space-y-2 ...">
          <p className="text-left font-prompt text-[14px]">
            Registration number:
          </p>
          <input type="text" id="rNum" name="rNum" value="ณ5289"></input>
          <p className="text-left font-prompt text-[14px] text-[14px] ml-30">
            Edit
          </p>
          <i className="fas fa-cat">icon</i>
        </div>
        <div className="flex flex-col space-y-2 ...">
          <p className="text-left font-prompt text-[14px]">Brand:</p>
          <input type="text" id="brand" name="brand" value="Honda"></input>
        </div>
        <div className="flex flex-col space-y-2 ...">
          <p className="text-left font-prompt text-[14px]"> Model:</p>
          <input type="text" id="model" name="model" value="Jazz" ut></input>
        </div>
        <div className="flex flex-col space-y-2 ...">
          <p className="text-left font-prompt text-[14px]">Color:</p>
          <input type="text" id="color" name="color" value="yellow"></input>
        </div>
      </div>

      <div>
        <p className="text-center font-prompt text-[14px]">
          * Check the license plate and details, if incorrect, please take a new
          photo or
        </p>
        <p>edit</p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-2 px-4 rounded items-center"
          onClick={() => router.push("/AddCar_UploadFront_Before")}
        >
          Back
        </button>
        <button
          className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-2 px-4 rounded items-center"
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
