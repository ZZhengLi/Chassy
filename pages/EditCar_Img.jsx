import React from "react";
import { useEffect } from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
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
import { TbCamera } from "react-icons/tb";
import uploadFileToBlob, {
  getBlobsInContainer,
  deleteBlob,
} from "../ts/azure-storage-blob";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const steps = ["1", "2", "3"];

export default function EditCar_Img() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const { useState } = React;
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = useState("");
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState("");

  const [regNum, setRegNum] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [imgId, setImgId] = useState("");
  const [fileUploaded, setFileUploaded] = useState("");
  useEffect(() => {
    setRegNum(router.query.regNum);
    setBrand(router.query.brand);
    setModel(router.query.model);
    setColor(router.query.color);
    setImgId(router.query.imgId);
    setServices(router.query.services);
  }, [router.query]);

  // *** GET FILES IN CONTAINER ***
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      // prepare UI for results
      setFile(list.filter((file) => file.name.includes("carImage")));
    });
  }, [fileUploaded]);

  //file filter fcuntion
  function filterFile(files, name) {
    return files.filter((file) => file.name.includes(name));
  }

  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;
    setImages([...file]);
  };

  useEffect(() => {
    uploadImages();
  }, [images]);

  const uploadImages = async () => {
    try {
      for (let i = 0; i < images.length; i++) {
        //Rename file
        let imageFile = new File(
          [images[i]],
          // "carImage" + (files.length + i)
          "carImage" + imgId + (files.length + i)
        );

        // *** UPLOAD TO AZURE STORAGE ***
        await uploadFileToBlob(imageFile);
      }
      setFileUploaded(files.length);
    } catch (error) {
      alert(error);
    }
  };

  const handleClickOpen = (name) => {
    setFileName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeImage = async () => {
    await deleteBlob(fileName);
    setFileUploaded(files.length);
    setOpen(false);
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
      zIndex: 0,
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
    router.push({
      pathname: "/EditCar_Info",
      query: {
        regNum: regNum,
        brand: brand,
        model: model,
        color: color,
        services: services,
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
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">
          แก้ไขรายละเอียดรถ
        </h1>
      </div>
      {/* <AppBar /> */}
      <div className="bg-white rounded-t-[20px] my-2 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="align-content: center p-8  flex items-center justify-center">
          {/* New Stepper */}
          <Stepper
            sx={{ width: "60%" }}
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
        <div className="flex items-center justify-center">แก้ไขรูปรถ</div>

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
              {files
                .filter((file) => file.name.includes("carImage" + imgId))
                .map((file, key) => {
                  return (
                    <div key={key} className="overflow-hidden relative">
                      <i
                        onClick={() => handleClickOpen(file.name)}
                        className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                      >
                        X
                      </i>
                      <img
                        className="h-20 w-20 rounded-md object-cover"
                        alt={"car image"}
                        src={file.url}
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
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
            onClick={pushToNextPage}
          >
            Next
          </button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={removeImage} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <BottomNav name="Home" />
        </div>
      </div>
    </div>
  );
}
