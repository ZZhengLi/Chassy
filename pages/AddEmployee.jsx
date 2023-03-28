import React, { useState } from "react";
import BottomNav from "./BottomNav";
import { MdOutlineArrowBack } from "react-icons/md";
import router from "next/router";
import { BiCamera } from "react-icons/bi";
import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import {
  getUsers,
  getShops,
  createUser,
  updateUser,
  deleteUserById,
} from "../lib/user_helper";
import uploadFileToBlob from "../ts/azure-storage-blob";

export default function AddEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [num, setNum] = useState("");
  const [shop, setShop] = React.useState("");
  const [uploading, setUploading] = useState(false);

  //Upload image
  const [selectedImage, setSelectedImage] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   router.push("/Employee");
  // };

  const handleChange = (event) => {
    setShop(event.target.value);
    {
      register("shop");
    }
  };

  //Mutation
  const addMutation = useMutation(createUser, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      router.reload();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  //Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit", data);

    // if (modalMode == ModalMode.Add) {
    //   const theOwner = users.find(
    //     (o) => o.owner.first_name == data.owner
    //   );
    //   console.assert(theOwner != undefined);
    //   console.log("chalo owner", theOwner.owner_id);

    const theShop = shops.find((s) => s.registered_name == data.shop);
    console.assert(theShop != undefined);

    const time = Date().toLocaleString();
    const imgId = data.first_name + time;

    addMutation.mutate({
      shop: theShop._id,
      first_name: data.first_name,
      last_name: data.last_name,
      user_type: data.user_type,
      phone_number: data.phone_number,
      owener_id: theShop.owener_id,
      username: "",
      password: "",
      email: "",
      __v: 0,
      picture_url: "",
    });
    // }

    if (selectedImage != null) {
      setUploading(true);
      try {
        //Rename file
        let myRenamedFile = new File([selectedImage], "employee" + imgId);

        // *** UPLOAD TO AZURE STORAGE ***
        await uploadFileToBlob(myRenamedFile);

        setUploading(false);
        router.push("/Employee");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Your didn't upload any image");
    }
  };

  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">
          เพิ่มพนักงาน
        </h1>
      </div>
      <div className="flex ... pt-7 ml-8">
        ร้าน:
        <select
          className=" font-prompt bg-transparent text-lg font-medium ml-2 text-dark bg-[#F9F5EC]"
          value={shop}
          defaultValue={shop}
          label="Shop Name"
          {...register("shop", {
            required: true,
          })}
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
      <div className="p-6 px-8 flex items-center justify-center ">
        <button className=" w-44 h-44 flex flex-col items-center justify-center rounded-full border-[#D9D9D9] text-[#FA8F54]">
          <div className="flex space-x-2">
            <div className="relative">
              <div className="relative z-0">
                <img
                  className="rounded-full shadow-sm bg-white"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3233252/camera-icon-md.png"
                  }
                  alt="user image"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                <div className="absolute inset-0 flex justify-center items-center z-10">
                  <input
                    type="file"
                    name="myImage"
                    className="w-full rounded-full text-9xl opacity-0"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  {selectedImage ? (
                    <div
                      className="absolute top-0 right-0 h-6 w-6 my-1 border-4 border-red rounded-full bg-gray-300 z-2"
                      onClick={() => setSelectedImage(null)}
                    ></div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          อัพโหลดโปรไฟล์
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2 px-6 ">ชื่อจริง*</div>
        <div className="pb-6 px-4 flex items-center justify-center">
          <input
            //type="text"
            id="firstName"
            name="firstName"
            placeholder="กรอกชื่อจริง"
            //value={firstName}
            className="pl-2 w-full h-12 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            onChange={(e) => setFirstName(e.target.value)}
            {...register("first_name", {
              required: true,
            })}
          ></input>
        </div>

        <div className="p-2 px-6 break-words">นามสกุล*</div>
        <div className="pb-6 px-4  flex items-center justify-center">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="กรอกนามสกุล"
            //value={lastName}
            required
            className=" pl-2 w-full h-12 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            onChange={(e) => setLastName(e.target.value)}
            {...register("last_name")}
          ></input>
        </div>

        <div className="p-2 px-6 break-words">ตำแหน่ง*</div>
        <div className="pb-6 px-4 flex flex-row w-full">
          <input
            type="text"
            id="position"
            name="position"
            placeholder="กรอกตำแหน่ง"
            //value={position}
            required
            className=" pl-2 w-full h-12 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            onChange={(e) => setPosition(e.target.value)}
            {...register("user_type")}
          ></input>
        </div>

        <div className="p-2 px-6 break-words">เบอร์*</div>
        <div className="px-4 flex flex-row  w-full">
          <input
            type="tel"
            id="num"
            name="num"
            pattern="[0-9]{10}"
            placeholder="กรอกเบอร์"
            //value={num}
            required
            className="pl-2 w-full h-12 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            onChange={(e) => setNum(e.target.value)}
            {...register("phone_number")}
          ></input>
        </div>

        <div className="p-8 flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center text-[18px]"
          >
            ยืนยัน
          </button>
        </div>
      </form>

      <div className="h-40"></div>

      <BottomNav name="Employee" />
    </div>
  );
}
