import React from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

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
import { getServices } from "../lib/helper";
import { updateCar } from "../lib/cartransaction_helper"


const steps = ["1", "2", "3"];

export default function EditCar_Service() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [doneStep, setDoneStep] = React.useState(0);
  const router = useRouter();
  const [personName, setPersonName] = React.useState([]);
  const [car, setCar] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);



  useEffect(() => {
    setCar(router.query.car ? JSON.parse(router.query.car) : "");
  }, [router.query]);

  const updateMutation = useMutation(updateCar, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.push("/Home");
      queryClient.invalidateQueries({ queryKey: ["cartransactions"] });
    },
  });

  const {
    isLoading,
    isError,
    error,
    data: services,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    refetchOnWindowFocus: false,
    select: (data) => {
      // console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      if (data.length > 0) {
        const modifiedData = data.map((service) => {
          if (service.shop != null) {
            return {
              ...service,
            };
          }
        });
        const filteredData = modifiedData.filter((item) => item);
        return filteredData;
      }
    },
  });

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

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

  // filter services based on shop id
  const filteredServices = services.filter(
    (service) => service.shop._id === car.shop_id
  );

  // group services by category and include service price
  const groupedServices = filteredServices.reduce((accumulator, service) => {
    if (!accumulator[service.category]) {
      accumulator[service.category] = [];
    }
    accumulator[service.category].push({
      _id: service._id,
      name: service.name,
      price: service.price,
    });
    return accumulator;
  }, {});

  // create an array of unique categories
  const uniqueCategories = Object.keys(groupedServices);

 

  const handleSubmit = () => {
    // e.preventDefault();
    // const formData = {
    //   fullname: fullName,
    //   position: position,
    //   shop: shop,
    // };
    // const [firstName, lastName] = formData.fullname.split(" ");
   
    console.log("form data car", car);
    console.log("form data servicesList", servicesList);
    console.log("form data servicesList", totalPrice);

    const newArray = car.services
    servicesList.forEach(value => {
      if (!car.services.includes(value)) {
        newArray.push(value);
      }
    });

    console.log("new array it is", newArray)

    updateMutation.mutate({
      ...car,
      car_id: car.car_id._id,
      services: newArray,
      total_price: totalPrice,
      status: "in-process"
      
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

      <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="flex flex-col space-y-4">
          <div className="align-content: center p-8 flex items-center justify-center">
            {/* New Stepper */}
            <Stepper
              sx={{ width: "60%" }}
              alternativeLabel
              activeStep={2}
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
            Choose a service item
          </p>
        </div>

        {uniqueCategories.map((category, key) => (
          <div key={key} className="px-5 py-2 w-full">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="font-semibold text-lg text-[#484542]">
                  {category} Service
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {groupedServices[category].map((service, key) => (
                  <div
                    key={key}
                    className="flex flex-row items-center justify-between mb-4 bg-[#F9F5EC] p-3 rounded-[10px] font-semibold"
                  >
                    <div className="flex flex-row items-center">
                      <input
                        type="checkbox"
                        className="w-7 h-7 bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                        defaultChecked={car.services.includes(service._id)}
                        onChange={(e) => {
                          let isChecked = e.target.checked;
                          if (isChecked) {
                            servicesList.push(service._id);
                            setTotalPrice(totalPrice + Number(service.price));
                          } else {
                            setServicesList(
                              servicesList.filter((x) => x !== service._id)
                            );
                            setTotalPrice(totalPrice - Number(service.price));
                          }
                        }}
                      />
                      <label className="ml-2 text-lg text-[#484542]">
                        {service.name}
                      </label>
                    </div>
                    <div className="relative text-lg flex flex-row items-center">
                     <p>
                        {new Intl.NumberFormat().format(service.price)} Baht
                      </p>
                    </div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        <div className="flex items-center justify-center pt-20">
          <button
            className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8"
            onClick={() => router.back()}
          >
            ก่อนหน้า
          </button>
          <button
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
            onClick={handleSubmit}
          >
            ยืนยัน
          </button>
        </div>
      </div>

      <div>
        <BottomNav name="Home" />
      </div>
    </div>
  );
}
