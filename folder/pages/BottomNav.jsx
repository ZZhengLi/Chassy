"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiHome5Line,
  RiStore2Line,
  RiUser2Line,
  RiAddFill,
  RiSettings3Line,
} from "react-icons/ri";

const BottomNav = (props) => {
  const router = useRouter();
  const [activeTabs, setActiveTabs] = useState(props.name);

  return (
    <div className="bottomNav">
      <div className="bnTab">
        {activeTabs === "Home" ? (
          <div>
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
          <div>
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
      <div className="bnTab">
        {activeTabs === "AddCar" ? (
          <div>
            <RiAddFill
              size="35"
              color="#F9F5EC"
              onClick={() => setActiveTabs("AddCar")}
            />
            <p>AddCar</p>
          </div>
        ) : (
          <div onClick={() => router.push("/AddCar_Qr")}>
            <RiAddFill
              size="35"
              color="#484542"
              onClick={() => setActiveTabs("AddCar")}
            />
            <p>AddCar</p>
          </div>
        )}
      </div>
      <div className="bnTab">
        {activeTabs === "Staff" ? (
          <div>
            <RiUser2Line
              size="35"
              color="#F9F5EC"
              onClick={() => setActiveTabs("Staff")}
            />
            <p>Staff</p>
          </div>
        ) : (
          <div onClick={() => router.push("/Staff")}>
            <RiUser2Line
              size="35"
              color="#484542"
              onClick={() => setActiveTabs("Staff")}
            />
            <p>Staff</p>
          </div>
        )}
      </div>
      <div className="bnTab">
        {activeTabs === "Setting" ? (
          <div>
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
