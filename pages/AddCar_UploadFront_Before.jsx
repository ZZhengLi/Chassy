import React from "react";
import BottomNav from "./BottomNav";
import Image from "next/image";
import Car from "../img/car.png";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import { TbCamera } from "react-icons/tb";

//New Stepper
import Stepper from "@mui/material/Stepper";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdjustIcon from "@mui/icons-material/Adjust";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const steps = ["1", "2", "3", "4"];

export default function AddCar_UploadFront_Before() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const { useState } = React;
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage("");

    setImage(e.target.files[0]);
  };

  //New Stepper
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#7FD1AE99",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#7FD1AE99",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#7FD1AE4D",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#7FD1AE99",
    display: "flex",
    height: 20,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#7FD1AE",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#7FD1AE",
      zIndex: 1,
      fontSize: 36,
    },
    "& .QontoStepIcon-circle": {
      color: "currentColor",
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
          <AdjustIcon className="QontoStepIcon-circle" />
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
      <div className="flex flex-row p-2">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-prompt font-bold text-[#484542] ml-5 mt-8">เพิ่มรถ</h1>
      </div>
      <div className="bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="align-content: center p-8 flex items-center justify-center">
          {/* New Stepper */}
          <Stepper
            sx={{ width: "80%" }}
            alternativeLabel
            activeStep={0}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center font-prompt text-[18px] p-6 flex flex-nowrap ">
            <Image
              src={Car}
              width={200}
              height={200}
              className="max-w-full object-contain rounded-lg text-center font-prompt text-[18px]"
              alt="car"
            />
            <p className="flex items-center break-normal font-prompt text-[18px] ml-5 text-left">
              อัพโหลดรูปหน้ารถ ให้เห็นป้ายทะเบียนชัดเจน
            </p>
          </div>
        </div>

        {/* <div className="h-screen flex justify-center items-center bg-gray-300 px-2"> */}
        <div className="flex items-center justify-center">
          <div className="p-3 md:w-1/2 w-[400px] bg-white rounded-md align-content: center">
            <span className="flex justify-center items-center text-[18px] mb-1 text-red-500">
              {message}
            </span>

            <div className="h-40 w-full relative items-center rounded-md cursor-pointer bg-[#F9F5EC]">
              <input
                type="file"
                onChange={handleFile}
                accept="image/png, image/jpeg, image/jpg"
                className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
              />
              <div className="h-full w-full bg-[#FA8F54] bg-opacity-10 absolute z-1 flex justify-center items-center top-0">
                <div className="flex flex-col items-center">
                  <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>

                  <TbCamera
                    className="flex justify-center w-24 h-24"
                    color="#FA8F54"
                  />

                  <span className="pb-4 flex justify-center text-[18px] text-[#FA8F54] font-prompt">{`Drag and Drop a file`}</span>
                </div>
              </div>
            </div>
            {image != null && (
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="overflow-hidden relative">
                  <i
                    onClick={() => {
                      setImage();
                    }}
                    className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                  >
                    X
                  </i>
                  <img
                    className="h-20 w-20 rounded-md object-cover"
                    src={URL.createObjectURL(image)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* </div> */}
        <div className="flex items-center justify-center flex space-x-2">
          <button
            className="bg-[#789BF3] font-prompt text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 text-opacity-100 font-bold text-blue  rounded items-center py-4 px-8"
            onClick={() => router.back()}
          >
            ก่อนหน้า
          </button>
          <button
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold font-prompt rounded items-center py-4 px-8"
            onClick={() =>
              image
                ? router.push({
                    pathname: "/AddCar_UploadFront_After",
                    query: { plate: URL.createObjectURL(image) },
                  })
                : alert("You didn't upload any picture")
            }
          >
            ถัดไป
          </button>
        </div>

        <div>
          <BottomNav name="AddCar" />
        </div>
      </div>
    </div>
  );
}
