import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {
  createUser,
} from "../lib/user_helper";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState(true);

  const router = useRouter();
  const queryClient = useQueryClient();

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   if (password != confirmPassword) {
  //     setValidation(false);
  //     //   return <Alert severity="error">Password aren't the same</Alert>;
  //   }

  //   if (validation) {
  //     router.push("/SignUp_OTP");
  //   }
  // };

  //Mutation
  const addMutation = useMutation(createUser, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      router.push("/SignUp_OTP");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.debug("onSubmit", data);

    if (data.password != data.confirmPassword) {
      setValidation(false);
      return <Alert severity="error">Password are not the same</Alert>;
    } else {
      addMutation.mutate({
        ...data,
        password: data.confirmPassword,
        user_type: "owner"
        // shop: theShop._id,
      });
    }
  };


  return (
    <div className="bg-[#F9F5EC] h-screen">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] font-prompt ml-5 mt-8">
          ลงทะเบียน
        </h1>
        <div className="pt-4"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="pl-4 pb-2" htmlFor="firstName">
          ชื่อ*
        </label>
        <div className="px-4 pt-2 pb-4 font-prompt">
          <input
            type="text"
            id="firstName"
            name="firstName"
            //value={firstName}
            placeholder="กรอกชื่อ"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setFirstName(e.target.value)}
            {...register("first_name", {
              required: true,
              maxLength: 80,
            })}
          />
        </div>
        <label className="pl-4 pb-2 font-prompt " htmlFor="lastName">
          นามสกุล*
        </label>
        <div className="px-4 pt-2 font-prompt  pb-4">
          <input
            type="text"
            id="lastName"
            name="lastName"
            //value={lastName}
            placeholder="กรอกนามสกุล"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setLastName(e.target.value)}
            {...register("last_name", {
              required: true,
              maxLength: 80,
            })}
          />
        </div>
        <label className="pl-4 pb-2 font-prompt " htmlFor="phoneNum">
          เบอร์โทร*
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="tel"
            pattern="[0-9]{10}"
            id="phoneNum"
            name="phoneNum"
            //value={phoneNum}
            placeholder="กรอกเบอร์โทร"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setPhoneNum(e.target.value)}
            {...register("phone_number", {
              required: true,
              maxLength: 80,
            })}
          />
        </div>
        <label className="pl-4 pb-2 font-prompt " htmlFor="email">
          email*
        </label>
        <div className="px-4 pt-2 pb-4 font-prompt ">
          <input
            type="email"
            id="email"
            name="email"
            //value={email}
            placeholder="กรอก email"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setEmail(e.target.value)}
            {...register("email", {
              required: true,
              maxLength: 80,
            })}
          />
        </div>
        <label className="pl-4 pb-2 font-prompt " htmlFor="password">
          รหัสผ่าน*
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="password"
            id="password"
            name="password"
            //value={password}
            placeholder="กรอกรหัสผ่าน"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: true,
              maxLength: 80,
            })}
          />
        </div>
        <label className="pl-4 pb-2 font-prompt" htmlFor="confirmPassword">
          ยืนยันรหัสผ่าน*
        </label>
        <div className="px-4 pt-2 pb-2 font-prompt ">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            //value={confirmPassword}
            placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            {...register("confirmPassword", {
              required: true,
              maxLength: 80,
            })}
          />
        </div>
        <div className="p-6 pr-2 text-[#FA8F54]">
          <input className="font-prompt " type="checkbox" required></input>
          ยินยอมให้เก็บข้อมูล
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded  items-center"
          >
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  );
}
