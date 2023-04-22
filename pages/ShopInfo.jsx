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
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";

export default function ShopInfo() {
  const [branch, setBranch] = useState("");
  const [edit, setEdit] = useState(true);
  const [thShopName, setThShopName] = useState("")
  const [enShopName, setEnShopName] = useState("")
  const [address, setAddress] = useState("")
  const [numOfCar, setNumOfCar] = useState("")
  const queryClient = useQueryClient();

  const router = useRouter();
  const { shopId } = router.query;
  console.log("shop id printing", shopId);

  //get img form azure blob storage
  const [images, setImages] = useState([]);
  const [imgId, setImgId] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);
    await deleteBlob(
      images.filter((file) => file.name.includes(services[0].shop.imgId))[0]
        .name
    );
    router.push("Shop");
  };

  const deleteMutation = useMutation(deleteShopById, {
    onSuccess: () => {
      console.log("Data Deleted");
    },
  });

  const updateMutation = useMutation(updateShop, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.push("/Shop");
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      remaining_cars: numOfCar,
      branch: branch,
      name: thShopName,
      registered_name: enShopName,
      location: address
    }
    console.log("form data", services[0].shop.owner);
    updateMutation.mutate({
      _id: services[0].shop._id,
      name: String(formData.name),
      registered_name: String(formData.registered_name),
      location: String(formData.location),
      phone_number: services[0].shop.phone_number,
      owner: services[0].shop.owner,
      branch: formData.branch,
      remaining_cars: formData.remaining_cars
    })
    // Do something with the form data

  }



  // const [formData, setFormData] = useState({
  //   numOfCar: "",
  //   branch: "",
  //   //branch:  services[0].branch,
  //   thShopName: "",
  //   enShopName: "",
  //   address: ""
  //   // add other input values here
  // });
  //Hook Form
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  // const onSubmit = (data) => {
  //   console.log("onSubmit", data.owner, data);
  //   console.log("Data to be updated", data);
  // const theOwner = shops.find(
  //   (o) => o.owner.first_name == owner
  // );
  // console.assert(theOwner != undefined); // Since the data is from the same list
  // console.debug("---", theOwner, data.owner);

  // updateMutation.mutate({
  //   ...data,
  //   owner: theOwner.owner._id,
  // });

  // };

  const routerToEditServices = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/Edit_Services",
      query: {
        shopId: shopId,
      },
    });
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

  // const pushToNextPage = (e) => {
  //   e.preventDefault();
  //   router.push({
  //     pathname: "/Dashboard",
  //     query: {
  //       //
  //     },
  //   });
  // };



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

  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(
        list.filter((file) =>
          file.name.includes(services ? services[0].shop.imgId : "shop")
        )
      );
    });
    services ? setEnShopName(services[0].shop.registered_name) : ""
    services ? setThShopName(services[0].shop.name) : ""
    services ? setNumOfCar(services[0].shop.remaining_cars) : ""
    services ? setAddress(services[0].shop.location) : ""
    services ? setBranch(services[0].shop.branch) : ""

  }, [services]);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }



  const confirmDeleteShop = (shop) => {
    if (
      console.log("delete shop", shop),
      confirm(
        `Are you sure to delete [${shop.shop.registered_name}]?`
      )
    ) {

      deleteMutation.mutate(shop.shop._id);
      router.push("Shop");
    }
  };

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row py-5 px-2">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold font-prompt text-[#484542] ml-5 mt-8">
          รายละเอียดร้าน
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
                <FaRegTrashAlt onClick={() => confirmDeleteShop(services[0])} className="w-6 h-6 ml-2" color="#FA8F54" />
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
              <div className="">
                <div className="text-left font-prompt  text-[18px] pr-2">
                  ชื่อร้าน (อังกฤษ):
                </div>
                <input
                  type="text"
                  id="enShopName"
                  name="enShopName"
                  defaultValue={services[0].shop.registered_name}
                  disabled={edit}
                  required
                  className="font-prompt text-[18px] font-bold bg-white"
                  //onChange={(e) => setFormData({ ...formData, enShopName: e.target.value })}
                  onChange={(e) => setEnShopName(e.target.value)}
                // {...register("name", {
                //   required: true,
                //   maxLength: 80,
                // })}
                ></input>
              </div>
              <div>
                <div className="">
                  <p className="text-left font-prompt text-[18px]">ชื่อร้าน (ไทย):</p>
                  <input
                    type="text"
                    id="thShopName"
                    name="thShopName"
                    defaultValue={services[0].shop.name}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    //onChange={(e) => setFormData({ ...formData, thShopName: e.target.value })}
                    onChange={(e) => setThShopName(e.target.value)}
                  // {...register("registered_name", {
                  //   required: true,
                  //   maxLength: 80,
                  // })}
                  ></input>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-left font-prompt text-[18px]">สาขา:</p>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    defaultValue={services[0].shop.branch}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    //onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    onChange={(e) => setBranch(e.target.value)}
                  // {...register("branch", {
                  //   required: true,
                  //   maxLength: 80,
                  // })}
                  ></input>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-left font-prompt text-[18px]">
                    ที่อยู่ร้าน:
                  </p>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={services[0].shop.location}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    onChange={(e) => setAddress(e.target.value)}
                  //onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  // {...register("location", {
                  //   required: true,
                  //   maxLength: 80,
                  // })}
                  ></input>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-left font-prompt text-[18px]">
                    จำนวนรถที่ใช้ได้:
                  </p>
                  <input
                    type="text"
                    id="numOfCar"
                    name="numOfCar"
                    defaultValue={services[0].shop.remaining_cars}
                    disabled={edit}
                    required
                    className="font-prompt text-[18px] font-bold bg-white"
                    //onChange={(e) => setFormData({ ...formData, numOfCar: e.target.value })}
                    onChange={(e) => setNumOfCar(e.target.value)}
                  // {...register("remaining_cars", {
                  //   required: true,
                  //   maxLength: 80,
                  // })}
                  ></input>
                </div>
              </div>
              <div className="p-6 flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-prompt font-bold py-4 px-8 rounded items-center text-[18px]"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex flex-row justify-between w-full px-4 pt-6 py-5">
            <div className="h-32 items-center justify-center flex-col flex bg-[#7FD1AE1A] min-w-[160px] md:h-[160px] rounded-[10px] text-[#7FD1AE] mr-2">
              <div>
                <HiOutlineCreditCard
                  className="w-12 h-12 ml-2"
                  color="#7FD1AE"
                />
              </div>
              <div className="p-2 font-prompt">เพิ่มจำนวนรถ</div>
            </div>

            <button
              className="h-32 items-center justify-center flex-col flex bg-[#789BF31A] min-w-[160px] md:h-[160px] font-prompt rounded-[10px] text-[#789BF3]"
              onClick={pushToNextPage}
            >
              <div>
                <TiChartBar className="w-12 h-12 ml-2" color="#789BF3" />
              </div>
              <div className="font-prompt">รายงานแดชบอร์ด</div>
            </button>
          </div>
          <br />
          <button onClick={routerToEditServices}>
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
                <div className="flex font-prompt p-4 px-4m-4 rounded-[10px] bg-[#F9F5EC] items-center">
                  <div>{service.name}</div>
                  <div className="absolute right-0 pr-10 font-prompt">
                    {service.price} บาท
                  </div>
                </div>
                <br />
              </>
            ))}
          </div>

        </form>
      </div>
      <BottomNav name="Shop" />
    </div>
  );
}
