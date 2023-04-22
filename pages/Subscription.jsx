import router from "next/router";
import React, { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getShops } from "../lib/shop_helper";
import { createService } from "../lib/helper";

const Subscription = () => {
  const [num, setNum] = useState("");
  const router = useRouter();
  const [shop, setShop] = React.useState("");
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServices(JSON.parse(router.query.services));
  }, [router.query]);

  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });
  const handleChange = (event) => {
    setShop(event.target.value);
  };

  //Mutation
  const addMutation = useMutation(createService, {
    onSuccess: () => {
      console.log("Data Inserted");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (shop != "") {
      try {
        for (let i = 0; i < services.length; i++) {
          addMutation.mutate({
            shop: new mongoose.Types.ObjectId(shop),
            name: services[i].service,
            price: Number(services[i].price),
            category: services[i].category,
          });
        }

        router.push("/Success_AddShop");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please select a shop");
    }
  };

  return (
    <div className="bg-[#F9F5EC] h-screen">
      <div className="flex flex-row p-5">
        <h1 className="text-3xl font-bold text-[#484542] mx-5 pt-10 pb-2 font-prompt">
          Subscription
        </h1>
      </div>
      <div>
        <div className="flex ... pt-7 pb-2 ml-8 font-prompt">
          ร้าน:
          <select
            className=" font-prompt bg-transparent text-lg font-medium ml-2 text-dark bg-[#F9F5EC]"
            value={shop}
            defaultValue={shop}
            label="Shop Name"
            onChange={handleChange}
          >
            <option>Choose a Shop</option>
            {shops?.map((shop, key) => (
              <option key={key} value={shop._id}>
                {" "}
                {shop.registered_name}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex ... pb-2 pl-6 font-prompt">
            จำนวนรถที่ต้องการบันทึก:
          </div>
          <div>
            <div className="px-4 flex flex-row  w-full">
              <input
                type="number"
                min="0"
                step="1"
                id="num"
                name="num"
                placeholder="กรอกจำนวนรถที่ต้องการบันทึก"
                value={num}
                required
                className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
                onChange={(e) => setNum(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="p-4 pl-6 font-prompt">
            <div>ราคารวม: 1,900 บาท</div>
            <div></div>
          </div>
          <div className="p-8 flex items-center justify-center">
            <div>
              <button
                className="bg-[#789BF3] font-prompt text-[#789BF3] text-slate-400 hover:bg-[#789BF3] bg-opacity-10 text-opacity-100 font-bold text-blue  rounded items-center py-4 px-8"
                onClick={() => router.back()}
              >
                ข้าม
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#789BF3] hover:bg-[#789BF3] font-prompt text-white font-bold py-4 px-8 rounded items-center text-[18px]"
              >
                ชำระเงิน
              </button>
            </div>
          </div>
        </form>
      </div>
      <BottomNav name="Shop" />
    </div>
  );
};

export default Subscription;
