import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ChassyLogo from "../public/navlogo.png";
import Image from "next/image";

export default function Logo() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/SignIn");
    }, 3000);
  }, []);
  return (
    <div className="flex h-screen w-full justify-center items-center bg-[#F9F5EC]">
      <Image className="mx-auto" src={ChassyLogo} alt="Logo" />
    </div>
  );
}
