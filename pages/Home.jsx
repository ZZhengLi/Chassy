import BottomNav from "./BottomNav";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Data from "./HomeData.json";
import {
  FaRegCalendarAlt,
  FaCar,
  FaMoneyBill,
  FaUserCircle,
} from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";

const Home = () => {
  return (
    <div className="bg-[#F9F5EC]">
      <h1 className="text-3xl font-bold text-[#484542] mx-5 pt-10 pb-2">
        Home
      </h1>
      <div className="flex ... pt-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdTTqi1gRWv1XKq1eG2sJs94GAXbk1DScNA&usqp=CAU"
          className="object-cover h-10 w-10 rounded-full ml-5"
        />

        <select className="bg-transparent text-lg font-medium ml-2 text-dark">
          <option selected>Chassy</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>

      <div className="flex-row flex items-center w-full md:px-0 px-6 pt-3">
        <p className="text-sm font-normal text-center text-dark">
          Date 19-12-2022
        </p>
        <FaRegCalendarAlt className="w-4 h-4 ml-2 text-dark" />
      </div>

      <div className="flex flex-row justify-between w-full md:px-0 px-6 py-5">
        <div className="h-20 items-center justify-center flex-col flex bg-white min-w-[160px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-primary">
          <FaCar className="w-9 h-9" color="#FA8F54" />
          <p className="text-lg">{new Intl.NumberFormat().format(100)} Car</p>
        </div>
        <div className="h-20 items-center justify-center flex-col flex bg-white min-w-[160px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-green">
          <FaMoneyBill className="w-9 h-9" color="#7FD1AE" />
          <p className="text-lg">
            {new Intl.NumberFormat().format(50000)} Baht
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center md:w-full w-full">
        <div className="bg-white rounded-t-[20px] my-5 pb-28 md:pb-0 md:h-screen md:min-w-[840px] min-w-full">
          <div className="py-5 w-full">
            <div className="flex-row flex justify-between px-6">
              <div className="flex-row flex items-center text-dark">
                <p className="font-sans text-lg text-gray-900 text-center">
                  Add Car
                </p>
                <button className="px-2">
                  <AddCircleIcon sx={{ color: "#FA8F54" }} />
                </button>
              </div>
              <div className="mr-5 items-center text-dark">
                <form action="" className="relative mx-auto w-max">
                  <div className="relative flex flex-row items-center">
                    <div className="absolute pl-3">
                      <SearchIcon sx={{ color: "#484542" }} />
                    </div>
                    <input
                      type="search"
                      className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border focus:border-dark focus:pl-16 focus:pr-4"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-80">
            {Data.cars.map((car) => {
              return (
                <>
                  <div className="pb-[10px] items-center justify-center flex flex-col ">
                    <div className="w-full h-20 bg-primary/20 items-center rounded-lg flex justify-start">
                      <div className="px-4 flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row w-full items-center">
                          <div
                            className={
                              car.status === "in-process"
                                ? "flex px-5 py-3 rounded-[10px] bg-[#F9F5EC] items-center w-full"
                                : "flex px-5 py-3 rounded-[10px] bg-[#7FD1AE33] items-center w-full"
                            }
                          >
                            {car.status === "in-process" ? (
                              <button className="bg-white shadow-lg py-1 px-1 rounded-[5px]">
                                <FiCheckSquare
                                  className="w-10 h-10"
                                  color="#FA8F54"
                                />
                              </button>
                            ) : (
                              <FiCheckSquare
                                className="w-10 h-10"
                                color="#7FD1AE"
                              />
                            )}

                            <div className="px-4 w-full text-dark">
                              <p className="font-medium text-lg">
                                {car.license_plate}
                              </p>
                              <div className="flex flex-row justify-between font-normal text-base">
                                <p className="truncate md:w-full w-20">
                                  {car.services.map((service) => {
                                    return <>{service.service_name},</>;
                                  })}
                                </p>
                                <p>
                                  {new Intl.NumberFormat().format(
                                    car.total_price
                                  )}
                                  ฿
                                </p>
                              </div>
                            </div>

                            <div className="px-4">
                              <FaUserCircle className="w-10 h-10 text-dark" />
                            </div>
                            <ArrowForwardIosOutlinedIcon
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

      <BottomNav name="Home" />

    </div>
  );
};

export default Home;
