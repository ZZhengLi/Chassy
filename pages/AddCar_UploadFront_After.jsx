import Image from "next/image";
import Step2 from "../img/step2.png";
import BottomNav from "./BottomNav";
import Car from "../img/car.png";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
import {
  FaRegEdit
} from "react-icons/fa";
import { useState } from "react";
import React from "react";
<<<<<<< HEAD
import { FiEdit } from "react-icons/ri";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["1", "2", "3", "4"];
=======
import {
  FiEdit,
} from "react-icons/ri";
>>>>>>> 83b3db7e58bf9065a0f88fb9b992792430e22829

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['1', '2', '3', '4'];

export default function AddCar_UploadFront_After() {
  const [activeStep, setActiveStep] = React.useState(0);
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
          <div>
<<<<<<< HEAD
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep="1">
=======

            <Box sx={{ width: '100%' }}>
              <Stepper activeStep='1'>
>>>>>>> 83b3db7e58bf9065a0f88fb9b992792430e22829
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  // if (isStepSkipped(index)) {
                  //   stepProps.completed = false;
                  // }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
<<<<<<< HEAD
                <React.Fragment></React.Fragment>
              ) : (
                <React.Fragment>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
=======
                <React.Fragment>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
>>>>>>> 83b3db7e58bf9065a0f88fb9b992792430e22829
                  </Box>
                </React.Fragment>
              )}
            </Box>
<<<<<<< HEAD
=======

>>>>>>> 83b3db7e58bf9065a0f88fb9b992792430e22829
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
<<<<<<< HEAD
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
=======

            <div className="flex justify-between">
              <div className="flex flex-row p-1">
                <p className="font-prompt text-[18px] pl-6 mr-2">
                  Registration number:
                </p>
                <div></div>
                <input
                  type="text"
                  id="regNum"
                  name="regNum"
                  value={regNum}
                  className="font-prompt text-[18px] font-bold"
                  onChange={(e) => setRegNum(e.target.value)}
                ></input>
              </div>

              <div className="flex flex-row items-center mr-5">
                <p className="flex text-right font-prompt text-[18px] font-bold text-[#FA8F54]" >
                  Edit
                </p>
                <FaRegEdit className="w-6 h-6 ml-2" color="#FA8F54" />
              </div>

>>>>>>> 83b3db7e58bf9065a0f88fb9b992792430e22829
            </div>

            <div className="flex flex-nowrap p-1">
              <p className="text-left font-prompt text-[18px] pl-6 mr-2">Brand:</p>
              <input
                type="text"
                id="brand"
                name="brand"
                value={brand}
                className="font-prompt text-[18px] font-bold"
                onChange={(e) => setRegNum(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-nowrap p-1">
              <p className="text-left font-prompt text-[18px] pl-6 mr-2"> Model:</p>
              <input
                type="text"
                id="model"
                name="model"
                value={model}
                className="font-prompt text-[18px] font-bold"
                onChange={(e) => setModel(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-nowrap p-1">
              <p className="text-left font-prompt text-[18px] pl-6 mr-2">Color:</p>
              <input
                type="text"
                id="color"
                name="color"
                value={color}
                className="font-prompt text-[18px] font-bold"
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </div>
<<<<<<< HEAD
=======

>>>>>>> 83b3db7e58bf9065a0f88fb9b992792430e22829
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
