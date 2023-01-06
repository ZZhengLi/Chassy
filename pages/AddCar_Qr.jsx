import React from "react";
import BottomNav from "./BottomNav";
import Image from "next/image";
import Step1 from "../img/step1.png";
import DownArrow from "../img/downArrow.png";
import Qr from "../img/qr.png";
import { useRouter } from "next/navigation";
// import Steppers from "./Steppers";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['1', '2', '3', '4'];



export default function AddCar_Qr() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
      
        
        <h1 className="text-3xl font-bold text-[#484542] ml-6 mt-8">Add Car</h1>
      </div>
      <div className='bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full'>
        <div className="flex flex-col space-y-4">
          <div className="align-content: center p-8">
            <Image
              src={Step1}
              width={350}
              alt="step1"
              className="mx-auto max-w-lg h-auto"
            />
          </div>
          <div>
      
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep=''>
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
        <React.Fragment>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {/* <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
            <Box sx={{ flex: '1 1 auto' }} />

            {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
          </Box>
        </React.Fragment>
      )}
    </Box>
  
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
      </div>
    </div>
  );
}
