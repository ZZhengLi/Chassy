import BottomNav from "./BottomNav";
import AppBar from "./AppBar";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Data from "./HomeData.json";
import PaymentsIcon from "@mui/icons-material/Payments";

const Home = () => {
  return (
    <div>
      <AppBar />
      <h1 className="text-3xl font-bold text-[#484542] mx-5">Home</h1>
      <div className="flex ...">
        <img
          src="https://thumbs.dreamstime.com/b/shop-building-colorful-isolated-white-33822015.jpg"
          className="object-cover h-10 w-10 rounded-full ml-5"
        />

        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="text-black focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Shop Name{" "}
          <svg
            className="ml-2 w-4 h-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          id="dropdown"
          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2  place-items-center">
        <div className="max-w-sm rounded shadow-lg px-5 py-5 rounded-[10px]">
          <div className="px-10">
            <DirectionsCarIcon sx={{ color: "#FA8F54" }} />
          </div>
          <p className="font-sans text-lg text-gray-900 text-center">
            1,000 cars
          </p>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg px-5 py-5 mr-5 rounded-[10px]">
          <div className="px-10">
            <PaymentsIcon sx={{ color: "#7FD1AE" }} />
          </div>
          <p className="font-sans text-lg text-gray-900 text-center">
            500,000 Baht
          </p>
        </div>
      </div>

      <div className="max-w-sm rounded shadow-lg rounded-[20px]">
        <div className="flex flex-row mx-5 my-6">
          <p className="font-sans text-lg text-gray-900 text-center">Add Car</p>
          <button className="px-2">
            <AddCircleIcon sx={{ color: "#FA8F54" }} />
          </button>
          <button>
            <SearchIcon sx={{ color: "#484542" }} />
          </button>
        </div>

        <div className="overflow-y-auto h-80">
          {Data.cars.map((car) => {
            return (
              <>
                <div
                  className={
                    car.status === "in-process"
                      ? "flex max-w-sm shadow-lg rounded-[10px] bg-[#F9F5EC] mx-5 items-center"
                      : "flex max-w-sm shadow-lg rounded-[10px] bg-[#7FD1AE33] mx-5 items-center"
                  }
                >
                  {car.status === "in-process" ? (
                    <button className="bg-white shadow-lg py-1 px-1 rounded-[5px]">
                      <CheckBoxOutlinedIcon sx={{ color: "#FA8F54" }} />
                    </button>
                  ) : (
                    <CheckBoxOutlinedIcon sx={{ color: "#7FD1AE" }} />
                  )}

                  <div className="grid">
                    <p>{car.license_plate}</p>
                    <div className="flex">
                      <p>
                        {car.services.map((service) => {
                          return <>{service.service_name},</>;
                        })}
                      </p>
                      <p>{car.total_price}฿</p>
                    </div>
                  </div>
                  <img
                    src={car.staff_picture_url}
                    className="object-cover h-10 w-10 rounded-full ml-5"
                  />
                  <ArrowForwardIosOutlinedIcon sx={{ color: "#484542" }} />
                </div>
              </>
            );
          })}
        </div>
      </div>

      <BottomNav name="Home" />
    </div>
  );
};

export default Home;
