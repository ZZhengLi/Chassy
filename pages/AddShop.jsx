import React, { useState } from "react";
import BottomNav from "./BottomNav";
import { MdOutlineArrowBack } from "react-icons/md";
import router from "next/router";

import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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
import {
  getShops,
  getShopOwners,
  createShop,
  updateShop,
  deleteShopById,
} from "../lib/shop_helper";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import { Model } from "mongoose";

const steps = ["1", "2"];

export default function AddShop() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [owner, setOwner] = React.useState("");

  //Upload image
  const [selectedImage, setSelectedImage] = useState(null);
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

  const queryClient = useQueryClient();
  const router = useRouter();

  //Mutation
  const addMutation = useMutation(createShop, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });

  const handleChange = (event) => {
    setOwner(event.target.value);
    {
      register("owner");
    }
  };

  const { data: owners } = useQuery({
    queryKey: ["owners"],
    queryFn: getShopOwners,
    refetchOnWindowFocus: false,
  });

  //Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log("onSubmit", data.owner, data);

    if (selectedImage != null) {
      router.push({
        pathname: "/AddShop_AddMenu",
        query: {
          name: data.name,
          registered_name: data.registered_name,
          location: data.location,
          branch: data.branch,
          owner: data.owner,
          image: URL.createObjectURL(selectedImage),
        },
      });
    } else {
      alert("Please upload a shop image");
    }
  };
  const {
    isLoading,
    isError,
    error,
    data: shops,
  } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      console.log("insider shop", data.length);
      if (data.length > 0) {
        const modifiedData = data.map((shop) => {
          if (shop.owner != null) {
            console.log("shop hu", shop);
            return {
              ...shop,
            };
          }
        });
        console.log("modified data it is", modifiedData);
        const filteredData = modifiedData.filter((item) => item);
        console.log("item data it is", filteredData);
        return filteredData;
      }
    },
  });

  console.log("show me owners", owners);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   router.push("/AddShop_AddMenu");
  // };

  const shownOwnerIds = [];

  return (
    <div className="bg-[#F9F5EC] w-full">
      <div className="flex flex-row py-5 px-2">
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
      <div className="p-6 px-8 flex items-center justify-center ">
        <button className=" w-44 h-44 flex flex-col items-center justify-center rounded-full border-[#D9D9D9] text-[#FA8F54]">
          <div className="flex space-x-2">
            <div className="relative">
              <div className="relative z-0">
                <img
                  className="rounded-full shadow-sm bg-white"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : "https://www.freeiconspng.com/thumbs/camera-icon/camera-icon-21.png"
                  }
                  alt="user image"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                <div className="absolute inset-0 flex justify-center items-center z-10">
                  <input
                    type="file"
                    name="myImage"
                    className="w-full text-9xl opacity-0"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  {selectedImage ? (
                    <div
                      className="absolute top-0 right-0 h-6 w-6 my-1 border-4 border-red rounded-full bg-gray-300 z-2"
                      onClick={() => setSelectedImage(null)}
                    ></div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          อัพโหลดโปรไฟล์
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2 px-4 font-prompt">ชื่อร้านภาษาอังกฤษ*</div>
        <div className="pb-6 px-4 flex items-center justify-center">
          <input
            type="text"
            id="registered_name"
            name="registered_name"
            placeholder="ชื่อจดทะเบียน"
            required
            className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            // onChange={(e) => setFirstName(e.target.value)}
            {...register("registered_name", {})}
          ></input>
        </div>

        <div className="p-2 px-4 break-words font-prompt">ชื่อร้านภาษาไทย*</div>
        <div className="pb-6 px-4 flex items-center justify-center">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="กรอกชื่อร้านภาษาไทย"
            required
            className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            // onChange={(e) => setLastName(e.target.value)}
            {...register("name", {})}
          ></input>
        </div>

        <div className="p-2 px-4 break-words font-prompt">สาขา</div>
        <div className="pb-6 px-4 flex flex-row w-full">
          <input
            type="text"
            id="branch"
            name="branch"
            placeholder="กรอกสาขา"
            //value={position}
            className="w-full h-12 border-2 pl-4 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            // onChange={(e) => setPosition(e.target.value)}
            {...register("branch", {})}
          ></input>
        </div>

        <div className="p-2 px-4 break-words font-prompt">ชื่อเจ้าของร้าน</div>
        <div className="pb-6 px-4 flex flex-row w-full">
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">กรอกชื่อเจ้าของร้าน</InputLabel> */}
            <Select
              // labelId="demo-simple-select-label"
              id="owner"
              value={owner}
              defaultValue={owner}
              //label="Owner Name"
              {...register("owner", {
                required: true,
                maxLength: 80,
              })}
              className="w-full h-12 border-2 pl-4 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold bg-white"
              onChange={handleChange}
            >
              {owners?.map((owner, key) => {
                return (
                  <MenuItem key={key} value={owner._id}>
                    {owner.first_name} {owner.last_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="p-2 px-4 break-words font-prompt">ที่อยู่ร้าน*</div>
        <div className="px-4 flex flex-row  w-full">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="กรอกที่อยู่ร้าน"
            required
            className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            {...register("location", {})}
          ></input>
        </div>

        <div className="p-6 pr-2 font-prompt text-[#FA8F54]">
          <input type="checkbox" required></input>
          ยินยอมให้เก็บข้อมูล
        </div>

        <div className="p-8 flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-prompt font-bold py-4 px-8 rounded items-center text-[18px]"
          >
            ยืนยัน
          </button>
        </div>
      </form>
      <div className="h-40"></div>

      <BottomNav name="Shop" />
    </div>
  );
}
