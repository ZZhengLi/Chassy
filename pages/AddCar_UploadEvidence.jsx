import React from "react";
import BottomNav from "./BottomNav";
import Step2 from "../img/step2.png";
import Image from "next/image";
import AppBar from "./AppBar";
import Car from "../img/car.png";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";

export default function AddCar_UploadEvidence_Before() {
  const router = useRouter();
  const { useState } = React;
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack className="h-9 w-10 mt-8" onClick={() => router.back()}/>
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">Add Car</h1>
      </div>
      {/* <AppBar /> */}
      <div className='bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full'>
        <div class="align-content: center flex flex-col space-y-4 p-6">
          <Image src={Step2} width={350} className="mx-auto max-w-lg h-auto" />
        </div>
        <div class="text-left font-prompt text-[18px] p-6 flex flex-nowrap">
          <Image src={Car} width={200} class="max-w-full h-auto rounded-lg text-center font-prompt text-[18px]" />
          <p class="font-prompt text-[18px] ml-5 text-left">
            Take a picture of the car to keep as evidence in case of a problem?
          </p>
        </div>

        {/* <div className="h-screen flex justify-center items-center bg-gray-300 px-2"> */}
        <div className="p-3 md:w-1/2 w-[400px] bg-white rounded-md align-content: center">
          <span className="flex justify-center items-center text-[18px] mb-1 text-red-500">
            {message}
          </span>
          <div className="h-32 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
              multiple={true}
              name="files[]"
            />
            <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col">
                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                <span className="text-[18px]">{`Drag and Drop a file`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {files.map((file, key) => {
              return (
                <div key={key} className="overflow-hidden relative">
                  <i
                    onClick={() => {
                      removeImage(file.name);
                    }}
                    className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                  ></i>
                  <img
                    className="h-20 w-20 rounded-md"
                    src={URL.createObjectURL(file)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* </div> */}
        <div class="flex items-center justify-center">
          <button class="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8">Back</button>
          <button class="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center" onClick={() => router.push("/AddCar_SelectService")}>Next</button>
        </div>
        <div>
          <BottomNav name="AddCar" />
        </div>
      </div>
    </div>
  );
}
