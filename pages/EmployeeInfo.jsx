import React, { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import router from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { getBlobsInContainer, deleteBlob } from "../ts/azure-storage-blob";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//API
import {
  getUsers,
  getUserOwners,
  createUser,
  updateUser,
  deleteUserById,
} from "../lib/user_helper";
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

export default function EmployeeInfo() {
  //const [userName, setUserName] = useState("wa_0830232555");
  const [password, setPassword] = useState("0830232555.wa");
  //const [fullName, setFullName] = useState("เปาบุ้นจิ้น ไทฟง");
  //const [position, setPosition] = useState("ล้าง");
  const [store, setStore] = useState("Washever");
  const [edit, setEdit] = useState(true);

  //get img form azure blob storage
  const [images, setImages] = useState([]);
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(list.filter((file) => file.name.includes("employee")));
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
    router.push("Employee");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("Employee");
  };

  const router = useRouter();
  const { userId } = router.query;
  console.log("id printing", userId);

  const {
    isLoading,
    isError,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      console.log("insider user", data.length);
      if (data.length > 0) {
        const modifiedData = data.map((user) => {
          if (user._id == userId) {
            console.log("user matched and showed", user);
            return {
              ...user,
            };
          }
        });
        console.log("modified data it is", modifiedData);
        const filteredData = modifiedData.filter((item) => item);
        console.log("item data it is", filteredData);
        return filteredData;
      }
    },
  });

  console.log("show me users", users);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  console.log("first name showing or not", users[0].first_name);

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
          <div className="align-content: center pt:64 flex items-center justify-center">
            <img
              src={
                images.filter((file) => file.name.includes(""))[0] !== undefined //add imgId
                  ? images.filter((file) => file.name.includes(""))[0].url //add imgId
                  : null
              }
              className="w-60 h-auto rounded-full  p-8"
              alt="employee picture"
            ></img>
          </div>
          <div>
            <div className="flex flex-nowrap p-1 flex ">
              <div className=" flex pl-24">ชื่อผู้ใช้:</div>
              <input
                type="text"
                id="userName"
                name="userName"
                value={users[0].username}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>

            <div className=" flex flex-nowrap p-1 flex ">
              <div className="flex pl-24">รหัสผ่าน:</div>
              <input
                type="text"
                id="password"
                name="password"
                value={users[0].password}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-nowrap p-1 flex ">
              <div className="flex pl-24 ">ชื่อ-นามสกุล:</div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={users[0].first_name + " " + users[0].last_name}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setFullName(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-nowrap p-1 flex ">
              <div className="flex pl-24">ตำแหน่ง:</div>
              <input
                type="text"
                id="position"
                name="position"
                value={users[0].user_type}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setPosition(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-nowrap p-1 flex">
              <div className="flex pl-24">ร้าน:</div>
              <input
                type="text"
                id="store"
                name="store"
                value={users[0].shop.name}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setStore(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-nowrap p-1 flex">
              <div className="p-1 flex pl-24">สถานะ:</div>
              <select className="text-[#7FD1AE] bg-transparent text-lg font-medium ml-2">
                <option className="text-[#7FD1AE]" selected>
                  Active
                </option>
                <option value="Inactive">Inactive</option>
              </select>
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
      <BottomNav name="Employee" />
    </div>
  );
}
