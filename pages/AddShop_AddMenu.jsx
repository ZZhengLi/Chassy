import React, { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import { MdOutlineArrowBack } from "react-icons/md";
import { BiX } from "react-icons/bi";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

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
  getServices,
  createService,
  updateService,
  deleteServiceById,
} from "../lib/helper";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import { Model } from "mongoose";

const steps = ["1", "2"];

let nextId = 0;

// const ServicesArray = [
//   {
//     id: 0,
//     service: "service",
//     price: "price",
//     category: "category",
//   },
// ];

export default function AddShop_AddMenu() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [service_name, setService_name] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [services, setServices] = useState([]);
  const router = useRouter();

  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(router.query.image);
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setServices((prevServices) => [
  //     ...prevServices,
  //     {
  //       id: nextId++,
  //       service: service_name,
  //       price: price,
  //       category: category == "" ? "Default Category" : category,
  //     },
  //   ]);
  //   setService_name("");
  //   setPrice("");
  //   setCategory("");
  // };

  const handleClose = (e) => {
    e.preventDefault();
  };

  const { registered_name, owner } = router.query;
  console.log("shop name testing printing", registered_name, owner);

  //Mutation
  const addMutation = useMutation(createService, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      router.push({
        pathname: "/Subscription",
      });
      // Invalidate and refetch
      QueryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
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
    console.log("onSubmit checking", data, registered_name);

    const theShop = shops.find((s) => s.registered_name == registered_name);
    console.assert(theShop != undefined);

    addMutation.mutate({
      ...data,
      shop: theShop._id,
    });
  };

  function pushToNextPage() {
    services.length == 0
      ? alert("You didn't add any services yet")
      : router.push({
          pathname: "/Subscription",
          query: {
            // other datas
            image: image,
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-t-[20px] rounded-b-[20px] my-2 pb-8 md:pb-0 md:min-w-[840px] min-w-full">
          <div className="p-4 px-6 ">บริการ*</div>
          <div className="pb-6 px-4 flex items-center justify-center">
            <input
              type="text"
              id="service"
              name="service"
              placeholder="กรอกบริการ"
              //value={service_name}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setService_name(e.target.value)}
              {...register("service_name")}
            ></input>
          </div>

          <div className="p-2 px-6 break-words">ราคา*</div>
          <div className="pb-6 px-4  flex items-center justify-center">
            <input
              type="number"
              id="price"
              name="price"
              placeholder="กรอกราคา"
              //value={price}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setPrice(e.target.value)}
              {...register("price")}
            ></input>
          </div>

          <div className="p-2 px-6 break-words">หมวดหมู่</div>
          <div className="pb-6 px-4 flex flex-row w-full">
            <input
              type="text"
              id="category"
              name="category"
              placeholder="กรอกหมวดหมู่"
              //value={category}
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setCategory(e.target.value)}
              {...register("category")}
            ></input>
          </div>
        </div>
        <div className="pt-6 flex items-center justify-center">
          <button
            onClick={() =>
              setServices((prevServices) => [
                ...prevServices,
                {
                  id: nextId++,
                  service: service_name,
                  price: price,
                  category: category == "" ? "Default Category" : category,
                },
              ])
            }
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
              className="flex p-4 px-4m-4 rounded-[10px] bg-white items-center"
            >
              <div>{service.service}</div>
              <div className="absolute right-10 pr-10">{service.price} บาท</div>
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
          <br />
        </div>
      ))}

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
            // onClick={() =>
            //   services1.length == 0
            //     ? alert("You didn't add any services yet")
            //     : router.push("/Subscription")
            // }
            // onClick={pushToNextPage}
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
