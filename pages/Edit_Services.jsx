import React, { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import { MdOutlineArrowBack } from "react-icons/md";
import { BiX } from "react-icons/bi";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createService, deleteServiceById, getServices } from "../lib/helper";

export default function AddShop_AddMenu() {
  const [service_name, setService_name] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shopId, setShopId] = useState("");
  const router = useRouter();
  useEffect(() => {
    setShopId(router.query.shopId);
  }, [router.query]);

  const {
    isLoading,
    isError,
    error,
    data: services,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("service data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      if (data.length > 0) {
        return data
          .map((service) => {
            if (service.shop != null && service.shop._id == shopId) {
              console.log("service show", service);
              return {
                ...service,
              };
            }
            return null; // Return null for services that do not match the shopId
          })
          .filter((item) => item !== null);
      }
    },
  });

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    try {
      addMutation.mutate({
        shop: shopId,
        name: service_name,
        price: Number(price),
        category: category == "" ? "Default Category" : category,
      });
      alert("Added new service successfully!");
    } catch (error) {
      alert(error);
    }
    setService_name("");
    setPrice("");
    setCategory("");
    window.location.reload(false);
  };

  //Mutation
  const addMutation = useMutation(createService, {
    onSuccess: () => {
      console.log("Data Inserted");
    },
  });

  const deleteMutation = useMutation(deleteServiceById, {
    onSuccess: () => {
      console.log("Data Deleted");
    },
  });

  const confirmDeleteService = (service) => {
    if (
      confirm(
        `Are you sure to delete [${service.name}] by [${service.shop.registered_name}]?`
      )
    ) {
      deleteMutation.mutate(service._id);
      router.reload();
    }
  };

  async function pushToNextPage() {
    if (services.length != 0) {
      router.push("/Home");
    } else {
      alert("You didn't add any services yet");
    }
  }

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8 font-prompt">
          บริการแก้ไข
        </h1>
      </div>

      <form onSubmit={handleServiceSubmit}>
        <div className="bg-white rounded-t-[20px] font-prompt rounded-b-[20px] my-2 pb-8 md:pb-0 md:min-w-[840px] min-w-full">
          <div className="p-4 px-6 font-prompt">บริการ*</div>
          <div className="pb-6 px-4 flex items-center justify-center">
            <input
              type="text"
              id="service"
              name="service"
              placeholder="กรอกบริการ"
              value={service_name}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setService_name(e.target.value)}
            ></input>
          </div>

          <div className="p-2 px-6 break-words font-prompt">ราคา*</div>
          <div className="pb-6 px-4  flex items-center justify-center font-prompt">
            <input
              type="number"
              id="price"
              name="price"
              placeholder="กรอกราคา"
              value={price}
              required
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className="p-2 px-6 break-words font-prompt">หมวดหมู่</div>
          <div className="pb-6 px-4 flex flex-row w-full font-prompt">
            <input
              type="text"
              id="category"
              name="category"
              placeholder="กรอกหมวดหมู่"
              value={category}
              className="w-full h-12 pl-4 border-2 rounded-lg border-[#D9D9D9] font-prompt text-[18px] font-bold"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="pt-6 flex items-center justify-center ">
          <button
            type="submit"
            className="bg-[#FA8F54] rounded-lg hover:bg-[#FA8F54] text-white font-bold py-4 px-8 rounded items-center text-[18px]"
          >
            ยืนยัน
          </button>
        </div>
      </form>

      {services
        ? services.map((service, index) => (
            <div key={index}>
              <div className="px-6 p-4">
                <div
                  key={index}
                  className="flex p-4 px-4m-4 rounded-[10px] bg-white items-center font-prompt"
                >
                  <div>{service.name}</div>
                  <div className="absolute right-10 pr-10 font-prompt">
                    {service.price} บาท
                  </div>
                  <button
                    className="absolute right-0 pr-10"
                    onClick={() => {
                      confirmDeleteService(service);
                    }}
                  >
                    <BiX className="w-8 h-8" color="#484542" />
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}

      <div className="p-8 flex items-center justify-center">
        <div>
          <button
            className="bg-[#789BF3] text-[#789BF3] text-slate-400 hover:bg-[#789BF3] font-prompt bg-opacity-10 text-opacity-100 font-bold text-blue  rounded items-center py-4 px-8"
            onClick={() => router.back()}
          >
            ก่อนหน้า
          </button>
        </div>
        <div>
          <button
            className="bg-[#789BF3] hover:bg-[#789BF3] text-white font-bold py-4 px-8 font-prompt rounded items-center text-[18px]"
            onClick={pushToNextPage}
          >
            ยืนยัน
          </button>
        </div>
      </div>

      <div className="h-40"></div>

      <BottomNav name="Shop" />
    </div>
  );
}
