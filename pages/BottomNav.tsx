"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  RiHome5Line,
  RiStore2Line,
  RiUser2Line,
  RiAddFill,
  RiSettings3Line,
} from "react-icons/ri";

const BottomNav = (props: { name: any }) => {
  const router = useRouter();
  const [activeTabs, setActiveTabs] = useState(props.name);

  return (
    <div className="bottomNav rounded-t-[20px]">
      <div className="bnTab">
        {activeTabs === "Home" ? (
          <div onClick={() => router.push("/Home")}>
            <RiHome5Line
              size="35"
              color="#F9F5EC"
              onClick={() => setActiveTabs("Home")}
            />
            <p>Home</p>
          </div>
        ) : (
          <div onClick={() => router.push("/Home")}>
            <RiHome5Line
              size="35"
              color="#484542"
              onClick={() => setActiveTabs("Home")}
            />
            <p>Home</p>
          </div>
        )}
      </div>
      <div className="bnTab">
        {activeTabs === "Shop" ? (
          <div onClick={() => router.push("/Shop")}>
            <RiStore2Line
              size="35"
              color="#F9F5EC"
              onClick={() => setActiveTabs("Shop")}
            />
            <p>Shop</p>
          </div>
        ) : (
          <div onClick={() => router.push("/Shop")}>
            <RiStore2Line
              size="35"
              color="#484542"
              onClick={() => setActiveTabs("Shop")}
            />
            <p>Shop</p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <button className="w-28 h-28 rounded-full absolute -top-12 relative center bg-[#FA8F54] text-white border-solid border-8 border-white justify-center items-center">
          {activeTabs === "AddCar" ? (
            <div
              className="flex justify-center items-center"
              onClick={() => router.push("/AddCar_Qr")}
            >
              <RiAddFill
                size="60"
                color="#F9F5EC"
                onClick={() => setActiveTabs("AddCar")}
              />
            </div>
          ) : (
            <div
              className="flex justify-center items-center"
              onClick={() => router.push("/AddCar_Qr")}
            >
              <RiAddFill
                size="60"
                color="#484542"
                onClick={() => setActiveTabs("AddCar")}
              />
            </div>
          )}
        </button>
      </div>
      <div className="bnTab items-center justify-center">
        {activeTabs === "Employee" ? (
          <div className=" " onClick={() => router.push("/Employee")}>
            <div className=" flex items-center justify-center ">
              <RiUser2Line
                size="35"
                color="#F9F5EC"
                className="flex justify-center -pr-2"
                onClick={() => setActiveTabs("Employee")}
              />
            </div>
            <p className="flex self-center">Employee</p>
          </div>
        ) : (
          <div onClick={() => router.push("/Employee")}>
            <div className=" flex items-center justify-center ">
              <RiUser2Line
                size="35"
                color="#484542"
                className="justify-center"
                onClick={() => setActiveTabs("Employee")}
              />
            </div>
            <p>Employee</p>
          </div>
        )}
      </div>
      <div className="bnTab">
        {activeTabs === "Setting" ? (
          <div onClick={() => router.push("/Setting")}>
            <RiSettings3Line
              size="35"
              color="#F9F5EC"
              onClick={() => setActiveTabs("Setting")}
            />
            <p>Setting</p>
          </div>
        ) : (
          <div onClick={() => router.push("/Setting")}>
            <RiSettings3Line
              size="35"
              color="#484542"
              onClick={() => setActiveTabs("Setting")}
            />
            <p>Setting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
