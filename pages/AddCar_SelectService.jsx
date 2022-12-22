import React from "react";
import BottomNav from "./BottomNav";
import Step4 from "../img/step4.png";
import Image from "next/image";
import AppBar from "./AppBar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";

//accordian
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Services from './Services.json'



export default function AddCar_SelectService() {
    const router = useRouter();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className="bg-[#F9F5EC]">
            <div className="flex flex-row p-5">
                <MdOutlineArrowBack className="h-9 w-10 mt-8" onClick={() => router.back()}/>
                <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">Add Car</h1>
            </div>

            <div className='bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full'>
                <div className="flex flex-col space-y-4">
                    <div className="align-content: center p-8">
                        <Image
                            src={Step4}
                            width={350}
                            alt="step1"
                            className="mx-auto max-w-lg h-auto"
                        />
                    </div>
                </div>

                <div className="flex flex-row px-5">
                    <p className="">Choose a service item</p>
                </div>

                {Services.services.map(ser => {
                    return (
                        <>

                            {
                                ser.category.map(cat => {
                                    return (
                                        <div className="px-5 py-2 w-full">
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>
                                                        {cat} Service
                                                    </Typography>
                                                </AccordionSummary>

                                                <AccordionDetails>
                                                    {ser.services.map(service => {
                                                        return (
                                                            <div class="flex items-center mb-4">
                                                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{service}</label>
                                                                <div className="justify-items-end">
                                                                    <p>{new Intl.NumberFormat().format(900)}฿</p>
                                                                </div>

                                                            </div>
                                                        )
                                                    })}

                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    )
                                })
                            }


                        </>
                    )
                })}
            <div class="flex items-center justify-center pt-20">
                <button class="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 font-bold text-blue  rounded items-center py-4 px-8">Back</button>
                <button class="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center" onClick={() => router.push("/Success")}>Next</button>
            </div>
            </div>
            
            <div>
                <BottomNav />
            </div>
        </div>
    )
}