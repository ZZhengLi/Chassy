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

//API
import { createShop } from "../lib/shop_helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import uploadFileToBlob from "../ts/azure-storage-blob";

const steps = ["1", "2"];

export default function AddShop_AddMenu() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [service_name, setService_name] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [registered_name, setRegistered_name] = useState("");
  const [location, setLocation] = useState("");
  const [branch, setBranch] = useState("");
  const [owner, setOwner] = useState("");
  const [category, setCategory] = useState("");
  const [services, setServices] = useState([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState("");
  useEffect(() => {
    setName(router.query.name);
    setRegistered_name(router.query.registered_name);
    setLocation(router.query.location);
    setBranch(router.query.branch);
    setOwner(router.query.owner);
    setImage(router.query.image);
  }, [router.query]);

  //Mutation
  const addMutation = useMutation(createShop, {
    onSuccess: () => {
      console.log("Data Inserted");
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });

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

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    setServices((prevServices) => [
      ...prevServices,
      {
        service: service_name,
        price: price,
        category: category == "" ? "Default Category" : category,
      },
    ]);
    setService_name("");
    setPrice("");
    setCategory("");
  };

  const time = Date().toLocaleString();
  const imgId = time;
  const queryClient = useQueryClient();

  async function pushToNextPage() {
    if (services.length != 0) {
      try {
        //Rename file
        let myRenamedFile = await fetch(image)
          .then((r) => r.blob())
          .then((blobFile) => new File([blobFile], "shop" + imgId));

        // *** UPLOAD TO AZURE STORAGE ***
        await uploadFileToBlob(myRenamedFile);

        setUploading(false);

        addMutation.mutate({
          name: name,
          registered_name: registered_name,
          location: location,
          branch: branch,
          owner: owner,
          imgId: imgId,
        });
        router.push({
          pathname: "/Subscription",
          query: {
            services: JSON.stringify(services),
          },
        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("You didn't add any services yet");
    }
  }

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8 font-prompt">
          เพิ่มร้าน
        </h1>
      </div>
      <div className="align-content: center p-8 flex items-center justify-center">
        {/* New Stepper */}
        <Stepper
          sx={{ width: "30%" }}
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

      <form onSubmit={handleServiceSubmit}>
        <div className="bg-white rounded-t-[20px] font-prompt rounded-b-[20px] my-2 pb-8 md:pb-0 md:min-w-[840px] min-w-full">
          <div className="p-4 px-6 font-prompt">บริการ*</div>
          <div className="pb-6 px-4 flex items-center justify-center">
            <input
              type="text"
              id="service"
              name="service"
              placeholder="กรอกบริการ"
              value={service_name}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setService_name(e.target.value)}
            ></input>
          </div>

          <div className="p-2 px-6 break-words font-prompt">ราคา*</div>
          <div className="pb-6 px-4  flex items-center justify-center font-prompt">
            <input
              type="number"
              id="price"
              name="price"
              placeholder="กรอกราคา"
              value={price}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className="p-2 px-6 break-words font-prompt">หมวดหมู่</div>
          <div className="pb-6 px-4 flex flex-row w-full font-prompt">
            <input
              type="text"
              id="category"
              name="category"
              placeholder="กรอกหมวดหมู่"
              value={category}
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="pt-6 flex items-center justify-center ">
          <button
            type="submit"
            className="bg-[#FA8F54] rounded-lg hover:bg-[#FA8F54] text-white font-bold py-4 px-8 rounded items-center text-[18px]"
          >
            ยืนยัน
          </button>
        </div>
      </form>

      {services.map((service, index) => (
        <div key={index}>
          <div className="px-6 p-4">
            <div
              key={index}
              className="flex p-4 px-4m-4 rounded-[10px] bg-white items-center font-prompt"
            >
              <div>{service.service}</div>
              <div className="absolute right-10 pr-10 font-prompt">
                {service.price} บาท
              </div>
              <button
                className="absolute right-0 pr-10"
                onClick={() => {
                  setServices(services.filter((s) => s.id !== service.id));
                }}
              >
                <BiX className="w-8 h-8" color="#484542" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="p-8 flex items-center justify-center flex space-x-2">
        <div>
          <button
            className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] font-prompt bg-opacity-10 text-opacity-100 font-bold text-blue  rounded items-center py-4 px-8"
            onClick={() => router.back()}
          >
            ก่อนหน้า
          </button>
        </div>
        <div>
          <button
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 font-prompt rounded items-center text-[18px]"
            onClick={pushToNextPage}
          >
            ยืนยัน
          </button>
        </div>
      </div>

      <div className="h-40"></div>

      <BottomNav name="Shop" />
    </div>
  );
}
