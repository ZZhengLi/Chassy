import React, { useState } from "react";
import ChassyLogo from "../public/navlogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
//import handler from "/api/users/signin";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handler = (e) => {
    //e.preventDefault();
    //router.push("/Home");
    action = "/api/users/signin";
  };

  return (
    <div className="bg-[#F9F5EC] h-screen">
      <div className="p-6 text-[18px]">เข้าสู่ระบบ</div>
      <div className="flex justify-center pb-4 pt-8">
        <Image src={ChassyLogo} alt="Logo" />
      </div>
      <form action="/api/users/signin" method="POST">
        <label className="pl-4 pb-2" htmlFor="email">
          ชื่อผู้ใช้หรือ email
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            className="w-full h-12 border-2 pl-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            placeholder="กรอกชื่อผู้ใช้หรือ email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label className="pl-4 pb-2" htmlFor="password">
          รหัสผ่าน
        </label>
        <div className="px-4 pt-2 pb-4">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="กรอกรหัสผ่าน"
            className="w-full h-12 pl-2 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className=" pl-4 pb-4 flex font-prompt text-[18px] font-bold text-[#FA8F54]">
          ลืมรหัสผ่าน
        </button>
        <div className="flex items-center justify-center">
          <button
            //onClick={handler}
            onSubmit={handler}
            type="submit"
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 rounded items-center flex justify-center"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>

      <div
        className="font-prompt text-[18px] font-bold text-[#FA8F54] pb-1 pt-6 flex items-center justify-center"
        onClick={() => router.push("/SignUp")}
      >
        <button>ลงทะเบียน</button>
      </div>

      <div className="flex items-center justify-center">
        สำหรับเจ้าของร้านที่ยังไม่มีบัญชีผู้ใช้
      </div>
      <div className="pt-12 flex items-center justify-center">
        <p className="pr-1">พบเจอปัญหา?</p>
        <button className="font-prompt text-[18px] text-[#FA8F54]">
          ติดต่อเรา
        </button>
      </div>
    </div>
  );
}
