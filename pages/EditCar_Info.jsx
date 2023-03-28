import React, { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import { MdOutlineArrowBack } from "react-icons/md";
import { BiX } from "react-icons/bi";
import { useRouter } from "next/router";

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

const steps = ["1", "2", "3"];

export default function EditCar_Info() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const [regNum, setRegNum] = useState("ณ5289");
  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Jazz");
  const [color, setColor] = useState("เหลือง");
  const [services, setServices] = useState([]);

  useEffect(() => {
    setRegNum(router.query.regNum);
    setBrand(router.query.brand);
    setModel(router.query.model);
    setColor(router.query.color);
    setServices(router.query.services);
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
      zIndex: 2,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/EditCar_Service",
      query: {
        services: services,
      },
    });
  };

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">
          แก้ไขรายละเอียดรถ
        </h1>
      </div>

      <div className="bg-white rounded-t-[20px] rounded-b-[20px] my-2 pb-8 md:pb-0 md:min-w-[840px] min-w-full h-screen">
        <div className="align-content: center p-8 flex items-center justify-center">
          {/* New Stepper */}
          <Stepper
            sx={{ width: "60%" }}
            alternativeLabel
            activeStep={1}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 px-4  flex items-center justify-center">
            แก้ไขข้อมูลรถ
          </div>
          <div className="p-2 px-6 ">เลขทะเบียน*</div>
          <div className="pb-6 px-4 flex items-center justify-center">
            <input
              type="text"
              id="regNum"
              name="regNum"
              placeholder="ณ5289"
              value={regNum}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setRegNum(e.target.value)}
            ></input>
          </div>

          <div className="p-2 px-6 break-words">ยี่ห้อ*</div>
          <div className="pb-6 px-4  flex items-center justify-center">
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Honda"
              value={brand}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>

          <div className="p-2 px-6 break-words">รุ่น*</div>
          <div className="pb-6 px-4 flex flex-row w-full">
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Jazz"
              value={model}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setModel(e.target.value)}
            ></input>
          </div>

          <div className="p-2 px-6 break-words">สี*</div>
          <div className="px-4 flex flex-row  w-full">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="เหลือง"
              value={color}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setColor(e.target.value)}
            ></input>
          </div>
          <div className="p-8 flex items-center justify-center">
            <div>
              <button
                className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 text-opacity-100 font-bold text-blue  rounded items-center py-4 px-8"
                onClick={() => router.back()}
              >
                ก่อนหน้า
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center text-[18px]"
              >
                ถัดไป
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="h-40"></div>

      <BottomNav name="Home" />
    </div>
  );
}
