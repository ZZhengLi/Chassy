import React, { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import { Carousel } from "antd";
import { getBlobsInContainer, deleteBlob } from "../ts/azure-storage-blob";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
console.log("get services thingy", getCarServices());

export default function CheckReview() {
  const router = useRouter();

  const [regNum, setRegNum] = useState("ณ5289");
  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Jazz");
  const [color, setColor] = useState("เหลือง");
  const [date, setDate] = useState("16-07-2022 ");
  const [status, setStatus] = useState("in-process");
  const [edit, setEdit] = useState(true);

  const [imgId, setImgId] = useState("");
  useEffect(() => {
    setImgId(router.query.imgId);
  }, [router.query]);

  const [images, setImages] = useState([]);
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(
        list.filter((file) => file.name.includes(cars ? cars[0].imgId : "car"))
      );
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);
    if (images.filter((file) => file.name.includes(cars[0].imgId))[0]) {
      await deleteBlob(
        images.filter((file) => file.name.includes(cars[0].imgId))[0].name
      );
    }
    deleteMutation.mutate(cars[0]._id);
    router.push("/Home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/Home");
  };

  const handleChange = (event) => {
    setShop(event.target.value);
    {
      register("shop");
    }
  };

  const deleteMutation = useMutation(deleteCarById, {
    onSuccess: () => {
      console.log("Data Deleted");
    },
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getCarServices,
    refetchOnWindowFocus: false,
  });
  console.log("services it is", services);

  const { carId } = router.query;
  console.log("car id printing", carId);
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
          console.log("_id and id", car._id, carId);
          if (car._id == carId) {
            car.services.map((service) => {
              services.map((s) => {
                if (service == s._id) {
                  console.log("moment of truth", s._id);
                  service_array.push([s.name, s.price]);
                }
              });
            });

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

  console.log("show me cars in details", cars);
  console.log("service array", service_array);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  const confirmDeleteCars = (car) => {
    if (
      (console.log("delete car", car),
      confirm(`Are you sure to delete this car?`))
    ) {
      deleteMutation.mutate(car._id);
    }
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

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8 font-prompt">
          รายละเอียดรถ
        </h1>
      </div>

      <div className="bg-white h-screen rounded-t-[20px]">
        <div className="flex flex-row absolute right-0 p-4 pb-24">
          <button
            className="flex flex-row items-right pb-4  p-2"
            onClick={handleClickOpen}
          >
            <p className="flex font-prompt text-[18px] font-bold text-[#FA8F54]">
              ลบ
              <FaRegTrashAlt className="w-6 h-6 ml-2" color="#FA8F54" />
            </p>
          </button>
          <button
            className="flex flex-row items-right pb-4 p-2"
            onClick={() => handleCardClick(cars[0])}
          >
            <p className=" flex font-prompt text-[18px] font-bold text-[#FA8F54]">
              แก้ไข
              <FaRegEdit className="w-6 h-6 ml-2" color="#FA8F54" />
            </p>
          </button>
        </div>
        <div>
          <div className="pt-16">
            <Carousel autoplay>
              {images.map((image, key) => {
                return (
                  <div key={key}>
                    <img
                      className="rounded-mg object-scale-down object-cover"
                      src={image.url}
                    ></img>
                  </div>
                );
              })}
            </Carousel>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="pl-6">
              <div className="flex flex-nowrap">
                <p className="text-left font-prompt text-[18px] pr-2 pb-1 ">
                  เลขทะเบียน:
                </p>
                <input
                  type="text"
                  id="regNum"
                  name="regNum"
                  value={cars[0].car_id.license_plate}
                  disabled
                  required
                  className="font-prompt text-[18px] font-bold pb-1 bg-white"
                ></input>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1 pr-2">
                    ยี่ห้อ:
                  </p>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={cars[0].car_id.brand}
                    disabled
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1 pr-2">
                    รุ่น:
                  </p>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={cars[0].car_id.model}
                    disabled
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1 pr-2">
                    สี:
                  </p>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={cars[0].car_id.color}
                    disabled
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1 pr-2">
                    วันที่เข้ารับบริการ:
                  </p>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={new Date(cars[0].start_date).toLocaleDateString(
                      "en-GB"
                    )}
                    disabled
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1 pr-2">
                    สถานะ:
                  </p>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={cars[0].status}
                    disabled
                    required
                    className={
                      cars[0].status === "in-process"
                        ? "font-prompt text-[18px] font-bold pb-1 bg-white text-[#FA8F54]"
                        : "font-prompt text-[18px] font-bold pb-1 bg-white text-[#7FD1AE]"
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="pt-4 pl-6 font-prompt text-[20px]">
              ใช้บริการ 3 รายการ
            </div>

            <br />

            <div className="px-4 py-1">
              {service_array.map((ser, key) => (
                <div className="flex px-4" key={key}>
                  <div>{ser[0]}</div>
                  <div className="absolute right-0 pr-10">{ser[1]} บาท</div>
                </div>
              ))}

              <div className="flex px-4 py-1 font-prompt">
                <div>รวม</div>
                <div className="absolute right-0 pr-10 font-prompt font-prompt">
                  {cars[0].total_price} บาท
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-5 bg-white px-6 shadow-2xl rounded-lg w-96">
                <div className="font-prompt text-[18px] font-bold pb-1 bg-white">
                  {" "}
                  รีวิวลูกค้า{" "}
                </div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1 pr-2">
                    ให้คะแนน:
                  </p>
                  <Rating
                    name="read-only"
                    value={Number(cars[0].rating_from_shop)}
                    size="large"
                    readOnly
                  />
                </div>
                <input
                  type="review_from_shop"
                  id="review_from_shop"
                  name="review_from_shop"
                  value={cars[0].review_from_shop}
                  disabled
                  required
                  className="font-prompt text-[16px] pb-1 bg-white"
                ></input>
              </div>
            </div>
            <div className="p-6 flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 font-prompt rounded items-center text-[18px]"
              >
                ยืนยัน
              </button>
            </div>
          </form>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
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
}
