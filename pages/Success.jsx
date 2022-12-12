import React from "react";
import Successful from "../img/Success.png";
import Image from "next/image";
import BottomNav from "./BottomNav";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <div>
      <div>
        <Image src={Successful} width={100} alt="success" />
      </div>
      <div>
        <p>successfully added the car</p>
      </div>
      <div>
        <p onClick={() => router.push("/Home")}>go to main page</p>
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
