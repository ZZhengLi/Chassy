import React from "react";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import Image from "next/image";
import PropTypes from "prop-types";
//New Stepper
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdjustIcon from "@mui/icons-material/Adjust";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { TbCamera } from "react-icons/tb";

const steps = ["1", "2", "3", "4"];

export default function AddCar_UploadEvidence_Before() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const { useState } = React;
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState("");

  const [plate, setPlate] = useState("");
  const [regNum, setRegNum] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    setPlate(router.query.plate);
    setRegNum(router.query.regNum);
    setBrand(router.query.brand);
    setModel(router.query.model);
    setColor(router.query.color);
  }, [router.query]);

  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    setFile([...files, ...file]);
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
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

  function pushToNextPage() {
    files.map((file, key) => {
      images.push(URL.createObjectURL(file));
    });

    images.length == 0
      ? alert("You didn't upload any picture")
      : router.push({
          pathname: "/AddCar_SelectService",
          query: {
            plate: plate,
            regNum: regNum,
            brand: brand,
            model: model,
            color: color,
            images: images,
          },
        });
  }

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">เพิ่มรถ</h1>
      </div>
      {/* <AppBar /> */}
      <div className="bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="align-content: center p-8  flex items-center justify-center">
          {/* New Stepper */}
          <Stepper
            sx={{ width: "80%" }}
            alternativeLabel
            activeStep={2}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className=" px-16 text-center flex items-center justify-center">
          ถ่ายรูปรถเพื่อเก็บเป็นหลักฐาน เผื่อเกิดปัญหาไหม ?
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
                multiple={true}
                name="files[]"
              />
              <div className="h-full w-full bg-[#FA8F54] bg-opacity-10 absolute z-1 flex justify-center items-center top-0">
                <div className="flex flex-col">
                  <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                  <TbCamera
                    className="flex justify-center w-24 h-24"
                    color="#FA8F54"
                  />
                  <span className="text-[18px] text-[#FA8F54]">{`Drag and Drop a file`}</span>
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
                    >
                      X
                    </i>
                    <img
                      className="h-20 w-20 rounded-md object-cover"
                      alt={"car image"}
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="flex items-center justify-center">
          <button
            className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8"
            onClick={() => router.back()}
          >
            ก่อนหน้า
          </button>
          <button
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
            onClick={pushToNextPage}
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
