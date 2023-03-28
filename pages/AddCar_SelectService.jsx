import React from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";

//Azure storage blob
import uploadFileToBlob, {
  isStorageConfigured,
  getBlobsInContainer,
} from "../ts/azure-storage-blob";

const storageConfigured = isStorageConfigured();

//accordian
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Services from "./Services.json";

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

export default function AddCar_SelectService() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [doneStep, setDoneStep] = React.useState(0);
  const router = useRouter();
  const [personName, setPersonName] = React.useState([]);

  /*const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  */
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
    setImages(router.query.images);
  }, [router.query]);

  // UI/form management
  const [uploading, setUploading] = useState(false);

  const time = Date().toLocaleString();
  const imgId = regNum + time;
  var num = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      //Rename file
      let myRenamedFile = await fetch(plate)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], "plate" + imgId));

      // *** UPLOAD TO AZURE STORAGE ***
      await uploadFileToBlob(myRenamedFile);

      for (let i = 0; i < images.length; i++) {
        //Rename file
        let imageFile = await fetch(images[i])
          .then((r) => r.blob())
          .then((blobFile) => new File([blobFile], "carImage" + imgId + num));

        // *** UPLOAD TO AZURE STORAGE ***
        await uploadFileToBlob(imageFile);
        num++;
      }

      setUploading(false);
      router.push("/Success_AddCar");
    } catch (error) {
      alert(error);
    }
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
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">เพิ่มรถ</h1>
      </div>

      <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="flex flex-col space-y-4">
          <div className="align-content: center p-8 flex items-center justify-center">
            {/* New Stepper */}
            <Stepper
              sx={{ width: "80%" }}
              alternativeLabel
              activeStep={3}
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
        </div>

        <div className="flex flex-row px-5">
          <p className="font-semibold text-lg text-[#484542]">
            เลือกรายการที่ให้บริการ
          </p>
        </div>
        <div>
          {Services.services.map((ser) => {
            return (
              <>
                {ser.category.map((cat, i) => {
                  return (
                    <div key={i} className="px-5 py-2 w-full">
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="font-semibold text-lg text-[#484542]">
                            {cat} Service
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                          {ser.services.map((service, i) => {
                            return (
                              <div
                                key={i}
                                className="flex flex-row items-center justify-between mb-4 bg-[#F9F5EC] p-3 rounded-[10px] font-semibold"
                              >
                                <div className="flex flex-row items-center">
                                  <input
                                    type="checkbox"
                                    className="w-7 h-7 bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                                  />
                                  <label className="ml-2 text-lg text-[#484542]">
                                    {service}
                                  </label>
                                </div>
                                <div className="relative text-lg flex flex-row items-center">
                                  <p>
                                    {new Intl.NumberFormat().format(900)} Baht
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  );
                })}
              </>
            );
          })}
          <div className="flex items-center justify-center pt-20">
            <button
              className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8"
              onClick={() => router.back}
            >
              ก่อนหน้า
            </button>
            <div className="w-5"></div>
            <button
              className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
              onClick={handleSubmit}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>

      <div>
        <BottomNav name="AddCar" />
      </div>
    </div>
  );
}
