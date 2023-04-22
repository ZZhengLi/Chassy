import React, { useState } from "react";
import ChassyLogo from "../public/navlogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
//import handler from "/api/users/signin";
import router from "next/router";
import { getUsers } from "../lib/user_helper";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit users", users);

    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (user) {
      window.user = user;
      router.push("/Home");
    } else {
      alert("Invalid email or password");
    }
  };

  const router = useRouter();

  // const handler = (e) => {
  //   //e.preventDefault();
  //   //router.push("/Home");
  //   action = "/api/users/signin";
  // };

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
      console.log("insider employee", data.length);
      if (data.length > 0) {
        const modifiedData = data.map((owner) => {
          if (owner.user_type == "owner") {
            console.log("owner hu", owner);
            return {
              ...owner,
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

  return (
    <div className="bg-[#F9F5EC] h-screen">
      <div className="p-6 text-[18px] font-prompt">เข้าสู่ระบบ</div>
      <div className="flex justify-center pb-4 pt-8">
        <Image src={ChassyLogo} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="pl-4 pb-2 font-prompt" htmlFor="email">
          ชื่อผู้ใช้หรือ email
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="text"
            id="email"
            name="email"
            //value={email}
            className="w-full h-12 border-2 pl-2 font-prompt rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            placeholder="กรอกชื่อผู้ใช้หรือ email"
            required
            onChange={(e) => setEmail(e.target.value)}
            {...register("email", {
              required: true,
            })}
          />
        </div>
        <label className="pl-4 pb-2 font-prompt" htmlFor="password">
          รหัสผ่าน
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="password"
            id="password"
            name="password"
            //value={password}
            placeholder="กรอกรหัสผ่าน"
            className="w-full h-12 pl-2 border-2 font-prompt rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <button className=" pl-4 pb-4 flex font-prompt text-[18px] font-bold font-prompt text-[#FA8F54]">
          ลืมรหัสผ่าน
        </button>
        <div className="flex items-center justify-center">
          <button
            //onClick={handler}
            //onSubmit={handler}
            type="submit"
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-prompt font-bold py-4 px-8 rounded items-center flex justify-center"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>

      <div
        className="font-prompt text-[18px] font-bold text-[#FA8F54] pb-1 pt-6 flex items-center justify-center"
        onClick={() => router.push("/SignUp")}
      >
        <button className="font-prompt text-[18px]">ลงทะเบียน</button>
      </div>

      <div className="flex items-center justify-center">
        สำหรับเจ้าของร้านที่ยังไม่มีบัญชีผู้ใช้
      </div>
      <div className="pt-12 flex font-prompt text-[18px]  items-center justify-center">
        <p className="pr-1">พบเจอปัญหา?</p>
        <button className="font-prompt text-[18px] text-[#FA8F54]">
          ติดต่อเรา
        </button>
      </div>
    </div>
  );
}
