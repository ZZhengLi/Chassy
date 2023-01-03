import React from "react";
import BottomNav from "./BottomNav";
import Step2 from "../img/step2.png";
import Image from "next/image";
import Car from "../img/car.png";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
// import Steppers from "./Steppers";

import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

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


export default function AddCar_UploadFront_Before() {
  const [activeStep, setActiveStep] = React.useState(0);
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
      {/* <AppBar /> */}
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">Add Car</h1>
      </div>
      <div className="bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="align-content: center flex flex-col space-y-4 p-6">
          <Image
            src={Step2}
            width={350}
            alt="step2"
            className="mx-auto max-w-lg h-auto"
          />
        </div>
        <div>


          <Box sx={{ width: '100%' }}>
            <Stepper activeStep='1'>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                // if (isStepSkipped(index)) {
                //   stepProps.completed = false;
                // }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps} >{label}</StepLabel>
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


          {/* New Stepper */}
          <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

        </div>
        <div className="flex items-center justify-center">
          <div className="text-center font-prompt text-[18px] p-6 flex flex-nowrap">
            <Image
              src={Car}
              width={200}
              className="max-w-full h-auto rounded-lg text-center font-prompt text-[18px]"
              alt="car"
            />
            <p className="font-prompt text-[18px] ml-5 text-left">
              Upload a picture of the front of the car to clearly see the license
              plate.
            </p>
          </div>
        </div>

        {/* <div className="h-screen flex justify-center items-center bg-gray-300 px-2"> */}
        <div className="flex items-center justify-center">
          <div className="p-3 md:w-1/2 w-[400px] bg-white rounded-md align-content: center">
            <span className="flex justify-center items-center text-[18px] mb-1 text-red-500">
              {message}
            </span>
            <div className="h-40 w-full relative border-2 items-center rounded-md cursor-pointer bg-[#F9F5EC] border-gray-400 border-dotted">
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
                  <span className="text-[18px] font-prompt">{`Drag and Drop a file`}</span>
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
        </div>

        {/* </div> */}
        <div className="flex items-center justify-center ">
          <button
            className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold rounded items-center py-4 px-8"
            onClick={() => router.push("/AddCar_UploadFront_After")}
          >
            Next
          </button>
        </div>

        <div>
          <BottomNav name="AddCar" />
        </div>
      </div>
    </div>
  );
}
