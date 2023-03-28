import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import BottomNav from "./BottomNav";
import { useQuery } from "@tanstack/react-query";
import { getShops } from "../lib/user_helper";
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

export default function Dashboard() {
  const data = [
    { x: "A", y: 10 },
    { x: "B", y: 5 },
    { x: "C", y: 15 },
    { x: "D", y: 20 },
  ];

  const data2 = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
  ];

  const data3 = [
    {
      num: 1,
      license: "งล918",
      transaction: 2,
      latest_date: "22/02/2023"
    },
    {
      num: 2,
      license: "ณญ2145",
      transaction: 5,
      latest_date: "28/02/2023"
    },
    {
      num: 3,
      license: "มก123",
      transaction: 2,
      latest_date: "8/02/2023"
    }
  ]

  const router = useRouter();

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
  const bigMonth = ["1", "3", "5", "7", "8", "10", "12"];
  const montharr = Array.from({ length: 12 }, (_, index) => index + 1);

  const dayArr = Array.from({ length: days }, (_, index) => index + 1);

  const handleChangeMonth = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
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

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
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
        <div className="grid grid-cols-4 gap-4 p-4">
          <div>
            <div>ร้าน:</div>
            <select
              className=" font-prompt bg-transparent text-lg font-medium ml-2 text-dark bg-[#F9F5EC] w-20"
              value={shop}
              defaultValue={shop}
              onChange={handleChange}
            >
              <option value={""}>All</option>
              {shops?.map((shop: any) => (
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
        </div>
        <div>
          <div className="flex flex-row justify-between w-full px-6 py-5 ">
            <div className="h-20 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-blue">
              <div>รายได้รวม</div>
              <div className="text-lg">
                {new Intl.NumberFormat().format(50000)} บาท
              </div>
            </div>
            <div className="h-20 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-primary">
              <div>จำนวนรถรวม</div>
              <div className="text-lg">
                {new Intl.NumberFormat().format(50)} คัน
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between w-full px-6 py-5">
            <div className="h-20 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-primary">
              <div>บริการเสร็จสิ้น</div>
              <div className="text-lg">
                {new Intl.NumberFormat().format(40)} คัน
              </div>
            </div>
            <div className="h-20 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-green">
              <div>กำลังให้บริการ</div>
              <div className="text-lg">
                {new Intl.NumberFormat().format(50000)} บาท
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>Bar Chart</div>
          <div className="h-100 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-blue">
            <XYPlot xType="ordinal" width={300} height={300}>
              <XAxis />
              <YAxis />
              <VerticalBarSeries  barWidth={0.5} data={data} color="#FA8F54"/>
            </XYPlot>
          </div>
        </div>

        <div>Table 
        <TableContainer
        component={Paper}
        className="mr-5 mb-3"
        sx={{ maxWidth: 1500 }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                #
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                License Plate
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Number of Transactions
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Latest Date
              </StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {data3.map((data) => (
                <StyledTableRow key={data.num}>
                  <StyledTableCell align="center">
                    {data.num}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {data.license}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {data.transaction}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {data.latest_date}
                  </StyledTableCell>
                 
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

        </div>

        <div>
          <div>Line Chart</div>
          <div className="h-100 items-center justify-center flex-col flex bg-[#F9F5EC] bg-opacity-50 min-w-[100px] md:min-w-[410px] md:h-[92px] rounded-[10px] text-blue">
            <XYPlot width={300} height={300}>
              <XAxis />
              <YAxis />
              <LineSeries data={data2} color="#FA8F54" />
            </XYPlot>
          </div>
        </div>
        <div className="h-40"></div>
      </div>

      <BottomNav name="Shop" />
    </div>
  );
}
