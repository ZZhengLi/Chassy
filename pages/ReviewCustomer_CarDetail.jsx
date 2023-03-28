import React, { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import shopPic from "../img/car.png";
import Image from "next/image";
import { Carousel } from "antd";
import { getBlobsInContainer } from "../ts/azure-storage-blob";

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

export default function ReviewCustomer_CarDetail() {
  const router = useRouter();

  const [regNum, setRegNum] = useState("ณ5289");
  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Jazz");
  const [color, setColor] = useState("เหลือง");
  const [date, setDate] = useState("16-07-2022 ");
  const [status, setStatus] = useState("กำลังให้บริการ");
  const [edit, setEdit] = useState(true);

  const [imgId, setImgId] = useState("");
  useEffect(() => {
    setImgId(router.query.imgId);
  }, [router.query]);

  const [images, setImages] = useState([]);
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(list.filter((file) => file.name.includes(""))); //**********change to imgId **********/
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    router.push("/Home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/ReviewCustomer",
      query: { carId: carId },
    });
  };

  // const { data: shops } = useQuery({
  //   queryKey: ["shops"],
  //   queryFn: getShops,
  //   refetchOnWindowFocus: false,
  // });
  const handleChange = (event) => {
    setShop(event.target.value);
    {
      register("shop");
    }
  };
  // console.log('getshops show', shops)

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
            // car.services.forEach(serviceId => {
            //   const matchedService = services.some(service => service._id === serviceId);
            //   if (matchedService) {
            //     console.log('moment', serviceId); // print the matched service id
            //   }
            // });

            car.services.map((service) => {
              services.map((s) => {
                //console.log('moment of truth', s._id, service)
                if (service == s._id) {
                  console.log("moment of truth", s._id);
                  service_array.push([s.service_name, s.price]);
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

  // const

  // });

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">
          รายละเอียดรถ
        </h1>
      </div>

      <div className="bg-white h-screen rounded-t-[20px]">
        <div className="flex flex-row absolute right-0 p-4 pb-24">
          <div>
            <button
              className="flex flex-row items-right pb-4  p-2"
              onClick={handleClickOpen}
            >
              <p className="flex font-prompt text-[18px] font-bold text-[#FA8F54]">
                ลบ
                <FaRegTrashAlt className="w-6 h-6 ml-2" color="#FA8F54" />
              </p>
            </button>
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
          </div>

          <button
            className="flex flex-row items-right p-2"
            onClick={() => setEdit(false)}
          >
            <p className=" flex font-prompt text-[18px] font-bold text-[#FA8F54]">
              แก้ไข
              <FaRegEdit className="w-6 h-6 ml-2" color="#FA8F54" />
            </p>
          </button>
        </div>
        <div className="pt-16"></div>
        <div>
          <div>
            <Carousel>
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
                <p className="text-left font-prompt text-[18px] pr-2 pb-1">
                  เลขทะเบียน:
                </p>
                <input
                  type="text"
                  id="regNum"
                  name="regNum"
                  value={cars[0].car_id.license_plate}
                  disabled={edit}
                  required
                  className="font-prompt text-[18px] font-bold pb-1 bg-white"
                  onChange={(e) => setRegNum(e.target.value)}
                ></input>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1">
                    ชื่อร้าน ไทย:
                  </p>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={cars[0].car_id.brand}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1">
                    สาขา:
                  </p>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={cars[0].car_id.model}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                    onChange={(e) => setModel(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1">สี:</p>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={cars[0].car_id.color}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                    onChange={(e) => setColor(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1">
                    จวันที่เข้ารับบริการ:
                  </p>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={cars[0].start_date}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white"
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px] pb-1">
                    สถานะ:
                  </p>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={cars[0].status}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold pb-1 bg-white text-[#FA8F54]"
                    onChange={(e) => setStatus(e.target.value)}
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

              {/* <div className="flex px-4 py-1">
                <div>ดูดฝุ่น</div>
                <div className="absolute right-0 pr-10">300 บาท</div>
              </div>

              <div className="flex px-4 py-1">
                <div>ขัดสี</div>
                <div className="absolute right-0 pr-10">300 บาท</div>
              </div> */}

              <div className="flex px-4 py-1">
                <div>รวม</div>
                <div className="absolute right-0 pr-10">2000 บาท</div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center text-[18px]"
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
      <BottomNav name="Home" />
    </div>
  );
}
