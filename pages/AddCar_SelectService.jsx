import React from "react";
import BottomNav from "./BottomNav";
import Step4 from "../img/step4.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
import Steppers from "./Steppers";

//accordian
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Services from "./Services.json";

export default function AddCar_SelectService() {
  const router = useRouter();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">Add Car</h1>
      </div>

      <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
        <div className="flex flex-col space-y-4">
          <div className="align-content: center p-8">
            <Image
              src={Step4}
              width={350}
              alt="step1"
              className="mx-auto max-w-lg h-auto"
            />
          </div>
          <div>
            <Steppers/>
          </div>
        </div>

        <div className="flex flex-row px-5">
          <p className="font-semibold text-lg text-[#484542]">Choose a service item</p>
        </div>

        {Services.services.map((ser) => {
          return (
            <>
              {ser.category.map((cat) => {
                return (
                  <div className="px-5 py-2 w-full">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="font-semibold text-lg text-[#484542]">{cat} Service</Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        {ser.services.map((service) => {
                          return (
                            <div className="flex flex-row items-center justify-between mb-4 bg-[#F9F5EC] p-3 rounded-[10px] font-semibold">
                              <div className="flex flex-row items-center">
                                <input
                                  type="checkbox"     
                                  className="w-7 h-7 bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                                />
                                <label   
                                  className="ml-2 text-lg text-[#484542]"
                                >
                                  {service}
                                </label>
                              </div>
                              <div className="relative text-lg flex flex-row items-center">
                                <p>{new Intl.NumberFormat().format(900)} Baht</p>
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
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
            onClick={() => router.push("/Success")}
          >
            Next
          </button>
        </div>
      </div>

      <div>
        <BottomNav />
      </div>
    </div>
  );
}
