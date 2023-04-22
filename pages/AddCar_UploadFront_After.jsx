import React from "react";
import Image from "next/image";
import BottomNav from "./BottomNav";
import Car from "../img/car.png";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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

//API
import { getCarOwners } from "../lib/car_helper";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";

console.log("show si", getCarOwners());

const steps = ["1", "2", "3", "4"];

export default function AddCar_UploadFront_After() {
  const router = useRouter();
  const [regNum, setRegNum] = useState("ณ5289");
  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Jazz");
  const [color, setColor] = useState("Yellow");
  const [edit, setEdit] = useState(true);
  const [plate, setPlate] = useState(true);

  useEffect(() => {
    setPlate(router.query.plate);
  }, [router.query]);

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

  const { data: owners } = useQuery({
    queryKey: ["owners"],
    queryFn: getCarOwners,
    refetchOnWindowFocus: false,
  });

  //Hook Form
  const {
    register,
    formState: { errors },
  } = useForm();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/AddCar_UploadEvidence",
      query: {
        plate: plate,
        regNum: regNum,
        brand: brand,
        model: model,
        color: color,
        car_owner_id: owners[0]._id,
      },
    });
  };

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-2">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-prompt font-bold text-[#484542] ml-5 mt-8">
          เพิ่มรถ
        </h1>
      </div>

      <div className="bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="flex flex-col space-y-4">
          <div className="align-content: center p-8 flex items-center justify-center">
            {/* New Stepper */}
            <Stepper
              sx={{ width: "80%" }}
              alternativeLabel
              activeStep={1}
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="flex items-center justify-center">
            <div className="align-content: center p-4">
              <Image
                src={plate ? plate : Car}
                width={250}
                height={250}
                alt="car"
                className="rounded-lg ml-6 object-contain"
              />
            </div>
          </div>
          <div>
            <button
              className="flex flex-row items-center absolute right-0 pr-4"
              onClick={() => setEdit(false)}
            >
              <p className="flex text-right font-prompt text-[18px] font-bold text-[#FA8F54]">
                แก้ไข
              </p>
              <FaRegEdit className="w-6 h-6 ml-2 " color="#FA8F54" />
            </button>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="flex flex-row p-1">
                  <p className="text-left font-prompt text-[18px] pl-6 mr-2">
                    เลขทะเบียน:
                  </p>

                  <input
                    type="text"
                    id="regNum"
                    name="regNum"
                    value={regNum}
                    //disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    onChange={(e) => setRegNum(e.target.value)}
                  ></input>
                </div>

                <div className="flex flex-nowrap p-1">
                  <p className="text-left font-prompt text-[18px] pl-6">
                    ยี่ห้อ:
                  </p>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={brand}
                    //disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white pl-2"
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-nowrap p-1">
                  <p className="text-left font-prompt text-[18px] pl-6 mr-2">
                    {" "}
                    รุ่น:
                  </p>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={model}
                    //disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    onChange={(e) => setModel(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-nowrap p-1">
                  <p className="text-left font-prompt text-[18px] pl-6 mr-2">
                    สี:
                  </p>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={color}
                    //disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white pl-2"
                    onChange={(e) => setColor(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="text-center font-prompt text-[18px] p-6">
                <div className="px-6 flex items-center font-prompt">
                  *ตรวจสอบป้ายทะเบียนและรายละเอียด หากไม่ถูกต้องกรุณาถ่ายใหม่
                  หรือ
                  <p className="font-prompt">แก้ไข</p>
                </div>
              </div>
              <div className="flex items-center justify-center flex space-x-2">
                <button
                  className="bg-[#789BF3] text-[#789BF3] text-slate-400 font-prompt hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8"
                  onClick={() => router.back()}
                >
                  ก่อนหน้า
                </button>
                <button
                  type="submit"
                  className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
                >
                  ถัดไป
                </button>
              </div>
            </form>
          </div>
          <div>
            <BottomNav name="AddCar" />
          </div>
        </div>
      </div>
    </div>
  );
}
