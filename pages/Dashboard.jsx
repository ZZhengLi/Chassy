import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import BottomNav from "./BottomNav";
import { useQuery } from "@tanstack/react-query";
import { getShops } from "../lib/user_helper";
import { getCarServices, getCars } from "../lib/cartransaction_helper";
import { XYPlot, XAxis, YAxis, VerticalBarSeries, LineSeries } from "react-vis";
import "react-vis/dist/style.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import router from "next/router";


export default function Dashboard() {
  const data = [
    { x: "Car Detailing", y: 500 },
    { x: "Car Dealing", y: 1000 },
    { x: "Washing", y: 1500 },
    { x: "D", y: 2000 },
  ];

  // const data2 = [
  //   { x: 0, y: 8 },
  //   { x: 1, y: 5 },
  //   { x: 2, y: 4 },
  //   { x: 3, y: 9 },
  //   { x: 4, y: 1 },
  // ];

  // const data3 = [
  //   {
  //     num: 1,
  //     license: "งล918",
  //     transaction: 2,
  //     latest_date: "22/02/2023",
  //   },
  //   {
  //     num: 2,
  //     license: "ณญ2145",
  //     transaction: 5,
  //     latest_date: "28/02/2023",
  //   },
  //   {
  //     num: 3,
  //     license: "มก123",
  //     transaction: 2,
  //     latest_date: "8/02/2023",
  //   },
  // ];


  const [shop, setShop] = React.useState("");
  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState(30);
  const [search, setSearch] = React.useState("");
  const bigMonth = ["1", "3", "5", "7", "8", "10", "12"];
  const montharr = Array.from({ length: 12 }, (_, index) => index + 1);

  const dayArr = Array.from({ length: days }, (_, index) => index + 1);

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);

    if (Number(event.target.value) === 2) {
      if (Number(year) % 4 != 0) {
        setDays(28);
      } else {
        setDays(29);
      }
    } else if (bigMonth.includes(event.target.value.toString())) {
      setDays(31);
    } else {
      setDays(30);
    }
  };

  const handleChange = (event) => {
    setShop(event.target.value);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FA8F54",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#F9F5EC",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getCarServices,
    refetchOnWindowFocus: false,
  });
  console.log("services it is", services);
  const service_array = [];

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
          if (car._id != null) {
            if (car.services)
              car.services.map((service) => {
                services.map((s) => {
                  //console.log('moment of truth', s._id, service)
                  if (service == s._id) {
                    console.log("moment of truth", s._id);
                    service_array.push([s.service_name, s.price, s._id]);
                  }
                });
              });
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

  console.log("show me cars", cars);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  const totalPrice = cars.reduce((acc, car) => acc + car.total_price, 0);

  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row w-full p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8">
          แดชบอร์ด
        </h1>
      </div>
      <div className="rounded-t-[20px] bg-white h-full">
        {/* <div className="grid grid-cols-4 gap-4 p-4">
          <div>
            <div>ร้าน:</div>
            <select
              className=" font-prompt bg-transparent text-lg font-medium ml-2 text-dark bg-[#F9F5EC] w-20"
              value={shop}
              defaultValue={shop}
              onChange={handleChange}
            >
              <option value={""}>All</option>
              {shops?.map((shop) => (
                <option key={shop._id} value={shop.registered_name}>
                  {" "}
                  {shop.registered_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>ปี:</div>
            <select
              className="bg-[#F9F5EC]"
              value={year}
              defaultValue={"All"}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value={""}>All</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>
          <div>
            <div>เดือน:</div>
            <select
              className="bg-[#F9F5EC]"
              value={month}
              defaultValue={"All"}
              onChange={handleChangeMonth}
            >
              <option value={""}>All</option>
              {montharr.map((month, i) => {
                return <option key={i}>{month}</option>;
              })}
            </select>
          </div>
          <div>
            <div>วันที่:</div>
            <select
              className="bg-[#F9F5EC]"
              value={date}
              defaultValue={"All"}
              onChange={(e) => setDate(e.target.value)}
            >
              <option value={""}>All</option>
              {dayArr.map((day, i) => {
                return <option key={i}>{day}</option>;
              })}
            </select>
          </div>
        </div> */}
        <div>
          <div className="flex flex-row justify-between w-full px-6 py-5 ">
            <div className="h-20 items-center font-prompt justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-blue">
              <div>รายได้รวม</div>
              <div className="text-lg">
              {new Intl.NumberFormat().format(totalPrice)} บาท
              </div>
            </div>
            <div className="h-20 items-center font-prompt justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-primary">
              <div>จำนวนรถรวม</div>
              <div className="text-lg">
              {new Intl.NumberFormat().format(cars.length)} คัน
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <div className="flex flex-row justify-between w-full px-6 py-5">
            <div className="h-20 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-primary">
              <div>บริการเสร็จสิ้น</div>
              <div className="text-lg">
                {new Intl.NumberFormat().format(40)} คัน
              </div>
            </div>
            <div className="h-20 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-green">
              <div>in-process</div>
              <div className="text-lg">
                {new Intl.NumberFormat().format(50000)} บาท
              </div>
            </div>
          </div> */}
        </div>
        {/* <div>
          <div className="text-center font-prompt text-[18px] align-content: center py-4 pt-10 ">
            Transactions per Categories
          </div>
          <div className="h-100 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-blue">
            <XYPlot xType="ordinal" width={300} height={300}>
              <XAxis />
              <YAxis />
              <VerticalBarSeries barWidth={0.5} data={data} color="#FA8F54" />
            </XYPlot>
          </div>
        </div> */}

        <div>
          <div className="text-center font-prompt text-[18px] align-content: center py-4 pt-10">
            {/* Transactions Table */}
            ตารางการซื้อขาย
          </div>
          <TableContainer
            component={Paper}
            className="mr-5 mb-3"
            sx={{ maxWidth: 1500 }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell
                    align="center"
                    sx={{ fontSize: 16, fontWeight: 700 }}
                  >
                    #
                  </StyledTableCell> */}
                  <StyledTableCell
                  className="font-promt"
                    align="left"
                    sx={{ fontSize: 16, fontWeight: 700 }}
                  >
                    {/* License Plate */}
                    ป้ายทะเบียนรถ
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="font-promt"
                    sx={{ fontSize: 16, fontWeight: 700 }}
                  >
                    {/* Total Price */}
                    ราคารวม
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="font-promt"
                    sx={{ fontSize: 16, fontWeight: 700 }}
                  >
                    {/* Date */}
                    วันที่
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars
                  
                  .map((car, index) => {
                    return (
                    <StyledTableRow key={index}>
                      
                      {/* <StyledTableCell align="center">
                        {car.car_id.license_plate}
                      </StyledTableCell> */}
                      <StyledTableCell align="left" className="font-promt">
                        
                        {car.car_id.license_plate}
                      </StyledTableCell>
                      <StyledTableCell align="left" className="font-promt">
                      
                                  {new Intl.NumberFormat().format(
                                    car.total_price
                                  )}
                                  บาท
                      </StyledTableCell>
                      <StyledTableCell align="left" className="font-promt">
                        {/* {service_array.map((ser) => {
                                    return (
                                      <React.Fragment key={ser[0]}>
                                        {ser[0]} ,
                                      </React.Fragment>
                                    );
                                  })} */}
                                  {new Date(car.start_date).toLocaleDateString('en-GB')}
                     
                      </StyledTableCell>
                    </StyledTableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* <div>
          <div className="text-center font-prompt text-[18px] align-content: center py-4 pt-10">
            Revenue Per Month
          </div>
          <div className="h-100 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-blue">
            <XYPlot width={300} height={300}>
              <XAxis />
              <YAxis />
              <LineSeries data={data2} color="#FA8F54" />
            </XYPlot>
          </div>
        </div> */}
        <div className="h-40"></div>
      </div>

      <BottomNav name="Shop" />
    </div>
  );
}
