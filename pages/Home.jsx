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
import { useEffect } from "react";

import dayjs from "dayjs";
import "dayjs/locale/en";
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
import { getShops } from "../lib/user_helper";
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
  const [carId, setCarId] = React.useState("");
  const [search, setSearch] = React.useState("");
  console.log("search it is", search);

  const handleClickOpen = (id) => {
    setOpen(true);
    setCarId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    router.push({
      pathname: "/ReviewCustomer_CarDetail",
      query: { carId: carId },
    });
  };

  const checkReview = (carId) => {
    router.push({
      pathname: "/CheckReview",
      query: { carId: carId },
    });
  };

  const handleCardClick = (car) => {
    console.log(
      services.filter((service) => car.services.includes(service._id))
    );
    router.push({
      pathname: "/EditCar_Img",
      query: {
        car: JSON.stringify(car),
        services: JSON.stringify(
          services.filter((service) => car.services.includes(service._id))
        ),
      },
    });
  };

  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });
  const handleChange = (event) => {
    console.log("SHOP ID", event.target.value);
    window.shopId = event.target.value;
    setShop(event.target.value);
  };

  const initializeShopId = () => (window.shopId = shops[0]._id);

  useEffect(() => {
    if (!shops) return;
    initializeShopId();
  }, [shops]);

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getCarServices,
    refetchOnWindowFocus: false,
  });
  console.log("services it is", services);
  const service_array = [];

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

  let totalPrice = 0;
  cars.forEach((car) => {
    totalPrice += car.total_price;
  });

  return (
    <div className="bg-[#F9F5EC]">
      <h1 className="text-3xl font-bold text-[#484542] px-6 pt-10 pb-2 font-prompt">
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
          // defaultValue={"Cargo Limited"}
          label="Shop Name"
          onChange={handleChange}
        >
          {shops?.map((shop, key) => (
            <option key={key} value={shop._id}>
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
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                value={dayjs(params.value).format("DD/MM/YYYY")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat="DD/MM/YYYY"
              />
            )}
            locale="en"
            day={dayjs}
          />
        </LocalizationProvider>
      </div>

      <div className="flex flex-row justify-between w-full px-6 py-5">
        <div className="h-20 items-center justify-center flex-col flex bg-white min-w-[160px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-primary">
          <FaCar className="w-9 h-9" color="#FA8F54" />
          <p className="text-lg">
            {new Intl.NumberFormat().format(
              cars
                .filter((car) =>
                  Object.values(car).some((field) => {
                    if (field !== null && field !== undefined) {
                      return field
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    }
                    return false;
                  })
                )
                .filter((car) => car.shop_id == window.shopId).length
            )}{" "}
            คัน
          </p>
        </div>
        <div className="h-20 items-center justify-center flex-col flex bg-white min-w-[160px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-green">
          <FaMoneyBill className="w-9 h-9" color="#7FD1AE" />
          <p className="text-lg">
            {" "}
            {new Intl.NumberFormat().format(totalPrice)} บาท
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center md:w-full w-full">
        <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen min-w-full">
          <div className="py-5 w-full">
            <div className="flex-row flex justify-between px-6">
              <div className="flex-row flex items-center text-dark">
                <p className="font-sans text-lg text-gray-900 text-center font-prompt">
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
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-80">
            {cars
              .filter((car) =>
                Object.values(car).some((field) => {
                  if (field !== null && field !== undefined) {
                    return field
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  }
                  return false;
                })
              )
              .filter((car) => car.shop_id == window.shopId)
              .map((car, index) => {
                return (
                  <div
                    className="pb-[10px] items-center justify-center flex flex-col"
                    key={index}
                  >
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
                                onClick={() => handleClickOpen(car._id)}
                              >
                                <FiCheckSquare
                                  className="w-10 h-10"
                                  color="#FA8F54"
                                />
                              </button>
                            ) : (
                              <button
                                className="shadow-lg rounded-[5px]"
                                disabled
                              >
                                <FiCheckSquare
                                  className="w-10 h-10"
                                  color="#7FD1AE"
                                />
                              </button>
                            )}
                            <div className="px-4 w-full text-dark">
                              <p className="font-medium text-lg">
                                {car.car_id ? car.car_id.license_plate : ""}
                              </p>
                              <div className="flex flex-row justify-between font-normal text-base">
                                <p className="truncate md:w-full w-20">
                                  {car.status === "in-process"
                                    ? services
                                      ? services
                                          .filter((service) =>
                                            car.services.includes(service._id)
                                          )
                                          .map((ser, key) => {
                                            return (
                                              <React.Fragment key={key}>
                                                {ser.name} ,
                                              </React.Fragment>
                                            );
                                          })
                                      : ""
                                    : "Rating: " + car.rating_from_shop}
                                </p>

                                <p>
                                  {new Intl.NumberFormat().format(
                                    car.total_price
                                  )}
                                  บาท
                                </p>
                              </div>
                            </div>

                            <div className="px-4">
                              <FaUserCircle className="w-10 h-10 text-dark" />
                            </div>
                            <ArrowForwardIosOutlinedIcon
                              sx={{ color: "#484542" }}
                              className="w-6 h-6"
                              onClick={() =>
                                car.status === "in-process"
                                  ? handleCardClick(car)
                                  : checkReview(car._id)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
