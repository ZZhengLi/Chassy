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
  getEmployees,
  deleteEmployeeById,
  updateEmployee,
} from "../lib/employee_helper";
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
import { getShops } from "../lib/user_helper";

export default function EmployeeInfo() {
  //const [userName, setUserName] = useState("wa_0830232555");
  const [password, setPassword] = useState("0830232555.wa");
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [edit, setEdit] = useState(true);
  const [shop, setShop] = React.useState("");
  const [status, setStatus] = React.useState("");
  const queryClient = useQueryClient();
  const statuses = ["Active", "Inactive"];

  //get img form azure blob storage
  const [images, setImages] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Hook Form
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  // const onSubmit = (data) => {
  //   console.log("onSubmit", data);
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

  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });
  const handleChange = (event) => {
    window.shopId = event.target.value;
    console.log(window.shopId);
    setShop(event.target.value);
  };

  useEffect(() => {
    window.shopId = shops ? shops[0]._id : "";
  }, [shops]);


  const handleConfirm = async () => {
    setOpen(false);
    if (
      images.filter((file) => file.name.includes(employees[0].picture_url))[0]
    ) {
      await deleteBlob(
        images.filter((file) => file.name.includes(employees[0].picture_url))[0]
          .name
      );
    }
    deleteMutation.mutate(employees[0]._id);
    router.push("Employee");
  };

  const updateMutation = useMutation(updateEmployee, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.push("/Employee");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  console.log('shop khrab', shop) 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullname: fullName,
      position: position,
      shop: shop,
    };
    const [firstName, lastName] = formData.fullname.split(" ");
   
    console.log("form data", formData.fullname);
    updateMutation.mutate({
      _id: employees[0]._id,
      first_name: firstName,
      last_name: lastName,
      position: String(formData.position),
      shop: formData.shop,
    });
  };

  const deleteMutation = useMutation(deleteEmployeeById, {
    onSuccess: () => {
      console.log("Data Deleted");
    },
  });

  const handleOpenUpdate = (employee) => {
    console.debug("updateService", employee.shop.registered_name);
    setEdit(false);
    reset(employee);
    setShop(employee.shop.registered_name);
  };

  const router = useRouter();
  const { employeeId } = router.query;
  console.log("id printing", employeeId);

  const {
    isLoading,
    isError,
    error,
    data: employees,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      console.log("insider user", data.length);
      if (data.length > 0) {
        const modifiedData = data.map((employee) => {
          if (employee._id == employeeId) {
            console.log("user matched and showed", employee);
            return {
              ...employee,
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

  console.log("show me employees", employees);
  //setShop(employees[0].shop.registered_name)
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(list.filter((file) => file.name.includes("employee")));
    });
    setFullName(
      employees ? employees[0].first_name + " " + employees[0].last_name : ""
    );
    setPosition(employees ? employees[0].position : "");
    setShop(employees ? employees[0].shop.registered_name : "");
  }, [employees]);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  console.log("first name showing or not", employees[0].first_name);

  // const confirmDeleteEmployee = (employee) => {
  //   if (
  //     (console.log("delete employee", employee),
  //     confirm(`Are you sure to delete [${employee.first_name}]?`))
  //   ) {
  //     deleteMutation.mutate(employee._id);
  //     router.push("Employee");
  //   }
  // };

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
              <FaRegTrashAlt
                //onClick={() => confirmDeleteEmployee(employees[0])}
                className="w-6 h-6 ml-2"
                color="#FA8F54"
              />
            </p>
          </button>
          <button
            className="flex flex-row items-right pb-4 p-2"
            onClick={() => setEdit(false)}
            //onClick={() => handleOpenUpdate(employees[0])}
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
                images.filter((file) =>
                  file.name.includes(employees[0].picture_url)
                )[0] !== undefined //add imgId
                  ? images.filter((file) =>
                      file.name.includes(employees[0].picture_url)
                    )[0].url //add imgId
                  : null
              }
              className="w-60 h-auto rounded-full  p-8"
              alt="employee picture"
            ></img>
          </div>
          <div>
            {/* <div className="flex flex-nowrap p-1 flex ">
              <div className=" flex pl-24">ชื่อผู้ใช้:</div>
              <input
                type="text"
                id="userName"
                name="userName"
                value={employees[0].username}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div> */}

            {/* <div className=" flex flex-nowrap p-1 flex ">
              <div className="flex pl-24">รหัสผ่าน:</div>
              <input
                type="text"
                id="password"
                name="password"
                value={employees[0].password}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div> */}

            <div className="flex flex-nowrap p-1 flex ">
              <div className="flex pl-24 ">ชื่อ-นามสกุล:</div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                // value={employees[0].first_name + " " + employees[0].last_name}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setFullName(e.target.value)}
                // {...register("fullname", {
                //   required: true,
                //   maxLength: 80,
                // })}
              ></input>
            </div>

            <div className="flex flex-nowrap p-1 flex ">
              <div className="flex pl-24">ตำแหน่ง:</div>
              <input
                type="text"
                id="position"
                name="position"
                value={position}
                // value={employees[0].position}
                disabled={edit}
                required
                className="text-left font-prompt text-[18px] font-bold bg-white"
                onChange={(e) => setPosition(e.target.value)}
                // {...register("position", {
                //   required: true,
                //   maxLength: 80,
                // })}
              ></input>
            </div>

            <div className="flex flex-nowrap p-1 flex">
              <div className="flex pl-24">ร้าน:</div>
              <select
                className=" font-prompt bg-transparent text-lg font-medium ml-2 text-dark"
                value={shop}
                defaultValue={shop}
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

            {/* <div className="flex flex-nowrap p-1 flex">
              <div className="flex pl-24">สถานะ:</div>
              <select
                className=" font-prompt bg-transparent text-lg font-medium ml-2 text-dark"
                value={status}
                defaultValue={status}
                label="Status"
                onChange={handleChange}
              >
                {statuses?.map((status, key) => (
                  <option key={key} value={status}>
                    {" "}
                    {status}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="flex flex-nowrap p-1 flex">
              <div className="p-1 flex pl-24">สถานะ:</div>
              <select
                className="text-[#7FD1AE] bg-transparent text-lg font-medium ml-2"
                disabled
              >
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
