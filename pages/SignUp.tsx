import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState(true);

  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setValidation(false);
      //   return <Alert severity="error">Password aren't the same</Alert>;
    }

    if (validation) {
      router.push("/SignUp_OTP");
    }
  };

  return (
    <div className="bg-[#F9F5EC] h-screen">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">
          ลงทะเบียน
        </h1>
        <div className="pt-4"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="pl-4 pb-2" htmlFor="firstName">
          ชื่อ*
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="กรอกชื่อ"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <label className="pl-4 pb-2" htmlFor="lastName">
          นามสกุล*
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            placeholder="กรอกนามสกุล"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <label className="pl-4 pb-2" htmlFor="phoneNum">
          เบอร์โทร*
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="tel"
            pattern="[0-9]{10}"
            id="phoneNum"
            name="phoneNum"
            value={phoneNum}
            placeholder="กรอกเบอร์โทร"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>
        <label className="pl-4 pb-2" htmlFor="email">
          email*
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="กรอก email"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label className="pl-4 pb-2" htmlFor="password">
          รหัสผ่าน*
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="กรอกรหัสผ่าน"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <label className="pl-4 pb-2" htmlFor="confirmPassword">
          ยืนยันรหัสผ่าน*
        </label>
        <div className="px-4 pt-2 pb-2">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="p-6 pr-2 text-[#FA8F54]">
          <input type="checkbox" required></input>
          ยินยอมให้เก็บข้อมูล
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center"
          >
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  );
}
