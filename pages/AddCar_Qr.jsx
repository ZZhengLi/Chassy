import React from "react";
import BottomNav from "./BottomNav";
import Image from "next/image";
import Qr from "../img/qr.png";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

//New Stepper
import Stepper from "@mui/material/Stepper";
import { RxDoubleArrowDown } from "react-icons/rx";
import { styled } from "@mui/material/styles";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdjustIcon from "@mui/icons-material/Adjust";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const steps = ["1", "2", "3", "4"];

export default function AddCar_Qr() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();

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
      <div className="flex flex-row p-2">
        <h1 className="text-3xl font-prompt font-bold text-[#484542] ml-6 mt-8">เพิ่มรถ</h1>
      </div>
      <div className="bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="flex flex-col space-y-4">
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
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <div className="flex flex-col space-y-4">
            <p className="text-center font-prompt text-[18px] align-content: center px-20">
              ลูกค้าลงทะเบียนผ่าน Line เพื่อรับแจ้งเตือนรับรถได้
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-center font-prompt text-[24px]">แสกนเลย</p>
          </div>
          {/* <div className = "flex flex-col space-y-4">
        <p>down arrow icon</p>
      </div> */}
          <div className="flex items-center justify-center px-2">
            <RxDoubleArrowDown className="w-6 h-6" color="#FA8F54" />
          </div>
          <div className="flex flex-col px-4">
            <Image
              src={Qr}
              width={140}
              alt="qr"
              className="object-scale-down "
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-prompt font-bold py-4 px-8 rounded items-center text-[18px]"
              onClick={() => router.push("/AddCar_UploadFront_Before")}
            >
              ถัดไป
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
