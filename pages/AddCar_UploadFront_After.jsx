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
import {
  FiEdit,
} from "react-icons/ri";

import Box from '@mui/material/Box';
//New Stepper
import Stepper from '@mui/material/Stepper';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdjustIcon from '@mui/icons-material/Adjust';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const steps = ['1', '2', '3', '4'];

export default function AddCar_UploadFront_After() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const [regNum, setRegNum] = useState("ณ5289");
  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Jazz");
  const [color, setColor] = useState("Yellow");
  //New Stepper
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#7FD1AE99',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#7FD1AE99',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#7FD1AE4D',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#7FD1AE99',
    display: 'flex',
    height: 20,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#7FD1AE',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#7FD1AE',
      zIndex: 1,
      fontSize: 36,
    },
    '& .QontoStepIcon-circle': {
      color: 'currentColor',
      fontSize: 36,
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <CheckCircleIcon className="QontoStepIcon-completedIcon" /> 
        ) : (
          <AdjustIcon  className="QontoStepIcon-circle"/>
        )}
      </QontoStepIconRoot>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

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
          
          <div className="align-content: center p-8 flex items-center justify-center">

            {/* New Stepper */}
          <Stepper  sx={{ width: '80%' }} alternativeLabel activeStep={1} connector={<QontoConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

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
