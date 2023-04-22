import React, { useState } from "react";
import BottomNav from "./BottomNav";
import { MdOutlineArrowBack } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { getShops } from "../lib/user_helper";
import {
  getCarServices,
  getCars,
  createCar,
  updateCar,
  deleteCarById,
} from "../lib/cartransaction_helper";

export default function ReviewCustomer() {
  const [regNum, setRegNum] = useState("ณ5289");
  const [brand, setBrand] = useState("Honda");
  const [model, setModel] = useState("Jazz");
  const [color, setColor] = useState("เหลือง");
  const [date, setDate] = useState("16-07-2022 ");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const router = useRouter();
  const { carId } = router.query;
  console.log("car id printing", carId);

  const handleOpenUpdate = (car) => {
    console.debug("updateCar", car);
    reset(car);
    //setOwner(car.car_owner_id.first_name);
  };

  const updateMutation = useMutation(updateCar, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.reload();
      QueryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  //Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    try {
      updateMutation.mutate({
        _id: cars[0]._id,
        car_id: cars[0].car_id._id,
        shop_id: cars[0].shop_id,
        user_id: cars[0].user_id,
        start_date: cars[0].start_date,
        finish_date: "",
        services: cars[0].services,
        total_price: cars[0].total_price,
        rating_from_customer: "",
        review_from_customer: "",
        rating_from_shop: rating,
        review_from_shop: data.review_from_shop,
        car_image: "",
        evidence_image: [],
        status: "completed",
        __v: 0,
      });
      router.push("/Home");
    } catch (error) {
      alert(error);
    }
  };

  const {
    isLoading,
    isError,
    error,
    data: cars,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("data services  received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      if (data.length > 0) {
        const modifiedData = data.map((car) => {
          console.log("_id and id", car._id, carId);
          if (car._id == carId) {
            return {
              ...car,
            };
          }
        });
        const filteredData = modifiedData.filter((item) => item);
        return filteredData;
      }
    },
  });

  console.log("show me cars in details", cars);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-prompt font-bold text-[#484542] ml-5 mt-8">
          รีวิวลูกค้า
        </h1>
      </div>
      <div className="bg-white h-screen rounded-t-[20px] pt-8 pl-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pl-2">
            <div className="flex flex-nowrap pb-2">
              <p className="text-left font-prompt text-[18px] pr-2">
                เลขทะเบียน:
              </p>
              <input
                type="text"
                id="regNum"
                name="regNum"
                value={cars[0].car_id.license_plate}
                className="pl-2 font-prompt text-[18px] font-bold"
                onChange={(e) => setRegNum(e.target.value)}
              ></input>
            </div>
            <div>
              <div className="flex flex-nowrap pb-2">
                <p className="text-left font-prompt text-[18px]">
                  ชื่อร้าน ไทย:
                </p>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={cars[0].car_id.brand}
                  className="pl-2 font-prompt text-[18px] font-bold"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex flex-nowrap pb-2">
                <p className="text-left font-prompt text-[18px]">สาขา:</p>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={cars[0].car_id.model}
                  className="pl-2 font-prompt text-[18px] font-bold"
                  onChange={(e) => setModel(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex flex-nowrap pb-2">
                <p className="text-left font-prompt text-[18px]">
                  ที่อยู่ร้าน:
                </p>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={cars[0].car_id.color}
                  className="pl-2 font-prompt text-[18px] font-bold"
                  onChange={(e) => setColor(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex flex-nowrap pb-2">
                <p className="text-left font-prompt text-[18px]">
                  ความคิดเห็น:
                </p>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={new Date(cars[0].start_date).toLocaleDateString(
                    "en-GB"
                  )}
                  className="pl-2 font-prompt text-[18px] font-bold"
                  onChange={(e) => setDate(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <div className="flex flex-nowrap pb-2">
                <p className="text-left font-prompt text-[18px]">ให้คะแนน:</p>
                <div className="App font-prompt">
                  <Rating
                    name="simple-controlled"
                    //value={rating}
                    precision={0.5}
                    size="large"
                    onChange={(_event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="pr-8">
                <p className="text-left font-prompt text-[18px] pb-2">
                  ความคิดเห็น:
                </p>
                <textarea
                  className="peer block h-32 w-full shadow-2xl p-2  px-3 leading-[1.6] transition-all focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-neutral-200 font-prompt dark:placeholder:text-neutral-200"
                  placeholder="เขียนแสดงความคิดเห็น..."
                  {...register("review_from_shop", {})}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="p-6 flex items-center justify-center">
            <button
              className="bg-[#789BF3] hover:bg-[#789BF3] border-2 rounded-lg text-white font-prompt font-bold py-4 px-8 rounded items-center text-[18px]"
              //onClick={() => handleOpenUpdate(cars)}
              type="submit"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
      <BottomNav name="Home" />
    </div>
  );
}
