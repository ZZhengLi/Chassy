import BottomNav from "./BottomNav";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Data from "./HomeData.json";
import {
  FaRegCalendarAlt,
  FaCar,
  FaMoneyBill,
  FaUserCircle,
} from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import router from "next/router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import authMiddleware from '../components/middleWare'

import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import {
  
  getShops,
  
} from "../lib/user_helper";
import {
  getCarServices,
  getCars,
  createCar,
  updateCar,
  deleteCarById,
} from "../lib/cartransaction_helper";


const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [shop, setShop] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    router.push({
      pathname: "/EditCar_Img",
      query: {
        // imgId: imgId,
      },
    });
  };

  // function pushToNextPage(carId) {
  //   router.push({
  //     pathname: "/ReviewCustomer_CarDetail", //ReviewCustomer_CarDetail
  //     query: {
  //       // regNum: regNum,
  //       // brand: brand,
  //       // model: model,
  //       // color: color,
  //       // imgId: imgId,
  //       // services: services
  //       carId: carId ,

  //     },
  //   });
  // }

  const handleCardClick = (carId) => {
    router.push({
      pathname: "/ReviewCustomer_CarDetail",
      query: { carId: carId },
    });
  };

  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });
  const handleChange = (event) => {
    setShop(event.target.value);
    {
      register("shop");
    }
  };

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getCarServices,
    refetchOnWindowFocus: false,

  });
  console.log("services it is", services)
  const service_array = []

  const {
    isLoading,
    isError,
    error,
    data: cars,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("data services  received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      if (data.length > 0) {
        const modifiedData = data.map((car) => {
          if (car._id != null) {

            if (car.services )
            car.services.map((service) => {
              services.map((s) =>  { 
                //console.log('moment of truth', s._id, service)
                if (service == s._id) {
                  console.log('moment of truth', s._id)
                  service_array.push([s.service_name, s.price, s._id])
                  
                  }}
              )}
              )
            return {
              ...car,
            };
          }
        });
        const filteredData = modifiedData.filter((item) => item);
        return filteredData;
      }
    },
  });

  console.log("show me cars", cars);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  return (
    <div className="bg-[#F9F5EC]">
      <h1 className="text-3xl font-bold text-[#484542] px-6 pt-10 pb-2">
        หน้าแรก
      </h1>
      <div className="flex ... pt-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdTTqi1gRWv1XKq1eG2sJs94GAXbk1DScNA&usqp=CAU"
          className="object-cover h-10 w-10 rounded-full ml-6"
        />

        <select
          className=" font-prompt bg-transparent text-lg font-medium ml-2 text-dark bg-[#F9F5EC]"
          value={shop}
          defaultValue={shop}
          label="Shop Name"
          onChange={handleChange}
        >
          {shops?.map((shop) => (
            <option key={shop._id} value={shop.registered_name}>
              {" "}
              {shop.registered_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-row flex items-center w-full px-6 pt-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className="flex flex-row justify-between w-full px-6 py-5">
        <div className="h-20 items-center justify-center flex-col flex bg-white min-w-[160px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-primary">
          <FaCar className="w-9 h-9" color="#FA8F54" />
          <p className="text-lg">{new Intl.NumberFormat().format(1000)} คัน</p>
        </div>
        <div className="h-20 items-center justify-center flex-col flex bg-white min-w-[160px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-green">
          <FaMoneyBill className="w-9 h-9" color="#7FD1AE" />
          <p className="text-lg">{new Intl.NumberFormat().format(50000)} บาท</p>
        </div>
      </div>

      <div className="flex justify-center items-center md:w-full w-full">
        <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen min-w-full">
          <div className="py-5 w-full">
            <div className="flex-row flex justify-between px-6">
              <div className="flex-row flex items-center text-dark">
                <p className="font-sans text-lg text-gray-900 text-center">
                  เพิ่มรถ
                </p>
                <button
                  className="px-2"
                  onClick={() => router.push("/AddCar_Qr")}
                >
                  <AddCircleIcon sx={{ color: "#FA8F54" }} />
                </button>
              </div>
              <div className="mr-5 items-center text-dark">
                <form action="" className="relative mx-auto w-max">
                  <div className="relative flex flex-row items-center">
                    <div className="absolute pl-3 z-10">
                      <SearchIcon sx={{ color: "#FA8F54" }} />
                    </div>
                    <input
                      type="search"
                      className="peer cursor-pointer relative h-12 w-12 rounded-full bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border focus:border-dark focus:pl-16 focus:pr-4"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-80">
            {cars.map((car, index) => {
              return (
                <>
                  <div className="pb-[10px] items-center justify-center flex flex-col ">
                    <div className="w-full h-20 items-center rounded-lg flex justify-start">
                      <div className="px-4 flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row w-full items-center">
                          <div
                            className={
                              car.status === "in-process"
                                ? "flex px-5 py-3 rounded-[10px] bg-[#F9F5EC] items-center w-full"
                                : "flex px-5 py-3 rounded-[10px] bg-[#7FD1AE33] items-center w-full"
                            }
                          >
                            {car.status === "in-process" ? (
                              <button
                                className="bg-white shadow-lg rounded-[5px]"
                                onClick={handleClickOpen}
                              >
                                <FiCheckSquare
                                  className="w-10 h-10"
                                  color="#FA8F54"
                                />
                              </button>
                            ) : (
                              <FiCheckSquare
                                className="w-10 h-10"
                                color="#7FD1AE"
                              />
                            )}
                            <div className="px-4 w-full text-dark">
                              <p className="font-medium text-lg">
                                {car.car_id.license_plate}
                              </p>
                              <div className="flex flex-row justify-between font-normal text-base">
                              
                              <p className="truncate md:w-full w-20">
                                
                                {service_array.map((ser) => {
                                  
                                  return (
                                    
                                    <React.Fragment key={ser[0]}>
                                    {ser[0]} ,
                                    </React.Fragment>
                                    );
                                })}
                              </p>
                                
                                <p>
                                  {new Intl.NumberFormat().format(
                                    car.total_price
                                  )}
                                  ฿
                                </p>
                              </div>
                            </div>

                            <div className="px-4">
                              <FaUserCircle className="w-10 h-10 text-dark" />
                            </div>
                            <ArrowForwardIosOutlinedIcon
                              sx={{ color: "#484542" }}
                              className="w-6 h-6"
                              onClick={() => handleCardClick(car._id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
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
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <BottomNav name="Home" />
    </div>
  );
};

// export const getServerSideProps = authMiddleware(async () => {
 
//   // return { props: { data } };
// });

export default Home;

