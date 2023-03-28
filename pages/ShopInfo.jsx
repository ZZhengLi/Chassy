import React, { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi";
import { TiChartBar } from "react-icons/ti";
import shopPic from "../img/car.png";
import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getBlobsInContainer, deleteBlob } from "../ts/azure-storage-blob";

//API shop
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

import {
  getServices,
  createService,
  updateService,
  deleteServiceById,
} from "../lib/helper";

export default function ShopInfo() {
  const [enShopName, setEnShopName] = useState("Washever");
  const [thShopName, setThShopName] = useState("ว้อชเอฟเวอร์");
  const [branch, setBranch] = useState("ห้วยกะปิ");
  const [address, setAddress] = useState(
    "2/22 หมู่ 1 ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี 20000"
  );
  const [numOfCar, setNumOfCar] = useState("100 คัน");
  const [edit, setEdit] = useState(true);

  const router = useRouter();
  const { shopId } = router.query;
  console.log("shop id printing", shopId);

  //get img form azure blob storage
  const [images, setImages] = useState([]);
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(list.filter((file) => file.name.includes("shop")));
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
    await deleteBlob(images.filter((file) => file.name.includes(""))[0].name); //add imgId here
    router.push("Shop");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("Shop");
  };

  const routerToAddShop = (e) => {
    e.preventDefault();
    router.push("AddShop");
  };

  const pushToNextPage = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/Dashboard",
      query: {
        //data here
      },
    });
  };

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: shops,
  // } = useQuery({
  //   queryKey: ["shops"],
  //   queryFn: getShops,
  //   refetchOnWindowFocus: false,
  //   select: (data) => {
  //     console.log("shop data received: ", data);
  //     if (data.length === 0) {
  //       return []; // return an empty array instead of undefined
  //     }
  //     console.log("insider shop", data.length);
  //     if (data.length > 0) {
  //       const modifiedData = data.map((shop) => {
  //         if (shop._id == shopId) {
  //           console.log("shop hu", shop)
  //           return {
  //             ...shop,
  //           };
  //         }
  //       });
  //       console.log("modified data it is", modifiedData)
  //       const filteredData = modifiedData.filter((item) => item);
  //       console.log("item data it is", filteredData)
  //       return filteredData;
  //     }
  //   },
  // });
  //below api from services

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
      console.log("service data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      if (data.length > 0) {
        return data
          .map((service) => {
            if (service.shop != null && service.shop._id == shopId) {
              console.log("service show", service);
              return {
                ...service,
              };
            }
            return null; // Return null for services that do not match the shopId
          })
          .filter((item) => item !== null);
      }
    },
  });

  console.log("show me services", services);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">
          รายละเอียดพนักงาน
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
        <form onSubmit={handleSubmit}>
          <div className=" p-8"></div>
          <div className="flex ">
            <div className="text-center font-prompt text-[18px] pl-4 p-2 flex flex-nowrap ">
              <img
                className="max-w-lg max-h-lg rounded-lg ml-6 object-scale-down h-10 ..."
                src={
                  images.filter((file) => file.name.includes(""))[0] !==
                  undefined
                    ? images.filter((file) => file.name.includes(""))[0].url
                    : null
                }
                alt="shop picture"
              ></img>
            </div>
            <div className="pl-4">
              <div className="flex flex-nowrap">
                <p className="text-left font-prompt text-[18px] pr-2">
                  ชื่อร้าน อังกฤษ:
                </p>
                <input
                  type="text"
                  id="enShopName"
                  name="enShopName"
                  value={services[0].shop.registered_name}
                  disabled={edit}
                  required
                  className="font-prompt text-[18px] font-bold bg-white"
                  onChange={(e) => setEnShopName(e.target.value)}
                ></input>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px]">
                    ชื่อร้าน ไทย:
                  </p>
                  <input
                    type="text"
                    id="thShopName"
                    name="thShopName"
                    value={services[0].shop.name}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    onChange={(e) => setThShopName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px]">สาขา:</p>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    value={branch}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    onChange={(e) => setBranch(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px]">
                    ที่อยู่ร้าน:
                  </p>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={services[0].shop.location}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-nowrap">
                  <p className="text-left font-prompt text-[18px]">
                    จำนวนรถที่ใช้ได้:
                  </p>
                  <input
                    type="text"
                    id="numOfCar"
                    name="numOfCar"
                    value={services[0].shop.remaining_cars}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    onChange={(e) => setNumOfCar(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex flex-row justify-between w-full px-12 pt-6 py-5">
            <div className="h-32 items-center justify-center flex-col flex bg-[#7FD1AE1A] min-w-[160px] md:h-[160px] rounded-[10px] text-[#7FD1AE]">
              <div>
                <HiOutlineCreditCard
                  className="w-12 h-12 ml-2"
                  color="#7FD1AE"
                />
              </div>
              <div className="p-2">เพิ่มจำนวนรถ</div>
            </div>
            <button
              className="h-32 items-center justify-center flex-col flex bg-[#789BF31A] min-w-[160px] md:h-[160px] rounded-[10px] text-[#789BF3]"
              onClick={pushToNextPage}
            >
              <div>
                <TiChartBar className="w-12 h-12 ml-2" color="#789BF3" />
              </div>
              <div>รายงานแดชบอร์ด</div>
            </button>
          </div>
          <br />
          <button onClick={routerToAddShop}>
            <div className="flex flex-nowrap">
              <p className="pl-4 pr-4 ">รายการที่ให้บริการ </p>
              <p className=" flex font-prompt text-[18px] font-bold text-right text-[#FA8F54] absolute right-0 pr-6">
                แก้ไขเมนู
                <FaRegEdit className="w-6 h-6 ml-2" color="#FA8F54" />
              </p>
            </div>
          </button>

          <div className="px-6 p-4">
            {services.map((service) => (
              <>
                <div className="flex p-4 px-4m-4 rounded-[10px] bg-[#F9F5EC] items-center">
                  <div>{service.service_name}</div>
                  <div className="absolute right-0 pr-10">
                    {service.price} บาท
                  </div>
                </div>
                <br />
              </>
            ))}
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
      <BottomNav name="Shop" />
    </div>
  );
}
