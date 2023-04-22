import BottomNav from "./BottomNav";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Data from "./HomeData.json";
import { FaUserCircle } from "react-icons/fa";
import router from "next/router";
import { useEffect, useState } from "react";
import { getBlobsInContainer } from "../ts/azure-storage-blob";

//API
import {
  getShops,
  getShopOwners,
  createShop,
  updateShop,
  deleteShopById,
} from "../lib/shop_helper";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import { Model } from "mongoose";

const Shop = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  console.log("search it is", search);

  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(list.filter((file) => file.name.includes("shop")));
    });
  }, []);

  const {
    isLoading,
    isError,
    error,
    data: shops,
  } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      console.log("insider shop", data.length);
      if (data.length > 0) {
        const modifiedData = data.map((shop) => {
          if (shop.owner != null) {
            // console.log("shop hu", shop);
            return {
              ...shop,
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

  console.log("show me shops", shops);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  const handleCardClick = (shopId) => {
    router.push({
      pathname: "/ShopInfo",
      query: { shopId: shopId },
    });
  };

  console.log("show me shop info", shops);
  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-2">
        <h1 className="text-3xl font-prompt font-bold text-[#484542] ml-5 mt-8">
          ร้าน
        </h1>
      </div>

      <div className="flex justify-center items-center md:w-full w-full">
        <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen min-w-full">
          <div className="py-5 w-full">
            <div className="flex-row flex justify-between px-6">
              <div className="flex-row flex items-center text-dark">
                <p className="font-sans font-prompt text-lg text-gray-900 text-center">
                  เพิ่มร้าน
                </p>
                <button className="px-2">
                  <AddCircleIcon
                    sx={{ color: "#FA8F54" }}
                    onClick={() => router.push("/AddShop")}
                  />
                </button>
              </div>
              <div className="mr-5 items-center text-dark">
                <form action="" className="relative mx-auto w-max">
                  <div className="relative flex flex-row items-center">
                    <div className="absolute pl-3 z-10">
                      <SearchIcon sx={{ color: "#FA8F54" }} />
                    </div>
                    <input
                      type="search"
                      className="peer cursor-pointer relative h-12 w-12 rounded-full bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border focus:border-dark focus:pl-16 focus:pr-4"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-screen">
            {shops.filter((shop) =>
                Object.values(shop).some((field) => {
                  if (field !== null && field !== undefined) {
                    return field.toString().toLowerCase().includes(search.toLowerCase());
                  }
                  return false;
                })
              ).map((shop) => {
              return (
                <>
                  <div className="pb-[10px] items-center justify-center flex flex-col ">
                    <div className="w-full h-20 items-center rounded-lg flex justify-start">
                      <div className="px-4 flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row w-full items-center">
                          <div className="flex px-5 py-3 rounded-[10px] bg-[#F9F5EC] items-center w-full">
                            <div className="px-4">
                              <img className="w-14 h-12 text-dark"
                                src={
                                  images.filter((file) =>
                                    file.name.includes(shop.imgId)
                                  )[0] !== undefined
                                    ? images.filter((file) =>
                                        file.name.includes(shop.imgId)
                                      )[0].url
                                    : null
                                }
                              ></img>
                              {/* <FaUserCircle className="w-10 h-10 text-dark" /> */}
                            </div>

                            <div className="px-4 w-full text-dark">
                              <p className="font-medium text-lg">{shop.name}</p>
                              <div className="flex flex-row justify-between font-normal text-base">
                                <p className="w-full font-prompt">
                                  การใช้งานคงเหลือ: {shop.remaining_cars} คัน
                                </p>
                              </div>
                            </div>

                            <ArrowForwardIosOutlinedIcon
                              onClick={() => handleCardClick(shop._id)}
                              sx={{ color: "#484542" }}
                              className="w-6 h-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav name="Shop" />
    </div>
  );
};

export async function getServerSideProps(context) {
  // TODO dummy values
  return {
    props: {
      todayTransactionCount: 2750,
    },
  };
}

export default Shop;
