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
  getUsers,
  getUserOwners,
  createUser,
  updateUser,
  deleteUserById,
} from "../lib/user_helper";
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
console.log("getUsers", getUsers());
const Employee = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      setImages(list.filter((file) => file.name.includes("shop")));
      console.log(list);
    });
  }, []);

  const {
    isLoading,
    isError,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      console.log("insider user", data.length);
      if (data.length > 0) {
        const modifiedData = data.map((user) => {
          if (user.first_name != null) {
            console.log("user hu", user);
            return {
              ...user,
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

  console.log("show me users", users);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  const handleCardClick = (userId) => {
    router.push({
      pathname: "/EmployeeInfo",
      query: { userId: userId },
    });
  };

  // console.log(images[0].url);

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <h1 className="text-3xl font-bold text-[#484542] mx-5 pt-10 pb-2">
          พนักงาน
        </h1>
      </div>

      <div className="flex justify-center items-center md:w-full w-full">
        <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen min-w-full">
          <div className="py-5 w-full">
            <div className="flex-row flex justify-between px-6">
              <div className="flex-row flex items-center text-dark">
                <p className="font-sans text-lg text-gray-900 text-center">
                  เพิ่มพนักงาน
                </p>
                <button className="px-2">
                  <AddCircleIcon
                    sx={{ color: "#FA8F54" }}
                    onClick={() => router.push("/AddEmployee")}
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
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-screen">
            {/* {Data.employees.map((employee) => {
              
              return ( */}
            {users
              .filter((user) => user.user_type === "employee")

              .map((user) => (
                <>
                  <div className="pb-[10px] items-center justify-center flex flex-col ">
                    <div className="w-full h-20 items-center rounded-lg flex justify-start">
                      <div className="px-4 flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row w-full items-center">
                          <div className="flex px-5 py-3 rounded-[10px] bg-[#F9F5EC] items-center w-full">
                            <div className="px-4">
                              {/* <img
                                src={
                                  images.filter((file) =>
                                    file.name.includes("")
                                  )[0] !== undefined
                                    ? images.filter((file) =>
                                        file.name.includes("")
                                      )[0].url
                                    : null
                                }
                              ></img> */}
                              <FaUserCircle className="w-10 h-10 text-dark" />
                            </div>

                            <div className="px-4 w-full text-dark">
                              <p className="font-medium text-lg">
                                {user.first_name} {user.last_name}
                              </p>
                              <div className="flex flex-row justify-between font-normal text-base">
                                <p className="w-full">ร้าน: {user.shop.name}</p>
                              </div>
                            </div>

                            <ArrowForwardIosOutlinedIcon
                              onClick={() => handleCardClick(user._id)}
                              sx={{ color: "#484542" }}
                              className="w-6 h-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
      <BottomNav name="Employee" />
    </div>
  );
};

export default Employee;
