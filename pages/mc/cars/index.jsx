import * as React from "react";
// import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
// import styles from '@styles/Home.module.css'
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import AdminAppBar from "../../../components/mc/AdminAppBar";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

//icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";

//table
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RiDeleteBin6Fill } from "react-icons/ri";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";

//API
import {
  getCarOwners,
  getCars,
  createCar,
  updateCar,
  deleteCarById,
} from "../../../lib/car_helper";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

console.log("show si", getCarOwners());
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

const ModalMode = {
  None: "",
  Add: "New",
  Update: "Update",
}

function IndexPage()  {
  const [modalMode, setModalMode] = React.useState(ModalMode.None);
  const [open, setOpen] = React.useState(false);
  const [owner, setOwner] = React.useState("");
  const [search, setSearch] = React.useState("");

  console.log("search it is", search);
  const queryClient = useQueryClient();
  const router = useRouter();

  //search filter

  //Mutation
  const addMutation = useMutation(createCar, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      router.reload();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const updateMutation = useMutation(updateCar, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.reload();
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const deleteMutation = useMutation(deleteCarById, {
    onSuccess: () => {
      console.log("Data Deleted");
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
    console.debug("onSubmit",  owners);

    if (modalMode == ModalMode.Add) {
      const theOwner = owners.find(
        (o) => o.first_name == data.owner 
      );
      console.log("theOwner", theOwner)
      console.assert(theOwner != undefined);

      addMutation.mutate({
        license_plate: data.license_plate,
        brand: data.brand,
        color: data.color,
        model: data.model,
        car_owner_id: theOwner._id,
      });
    } else if (modalMode == ModalMode.Update) {
      console.debug("Data to be updated", data);
      const theOwner = owners.find(
        (o) => o.first_name == owner
      );
      console.assert(theOwner != undefined); // Since the data is from the same list
      console.debug("---", theOwner, data.owner);

      updateMutation.mutate({
        ...data,
        car_owner_id: theOwner._id,
      });
    }
  };
  // console.log("useSession", useSession());
  // console.log(getCars())
  //get data
  const { data: owners } = useQuery({
    queryKey: ["owners"],
    queryFn: getCarOwners,
    refetchOnWindowFocus: false,
  });
  // console.log("Shops na ja",shops)

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
      console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      if (data.length > 0) {
        const modifiedData = data.map((car) => {
          if (car.car_owner_id != null) {
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

  //ModalMode
  const handleOpenAdd = () => {
    setModalMode(ModalMode.Add);
    reset({});
    setOwner(undefined); // UNSURE is this the right approach to un-select any option
    setOpen(true);
  };
  
  const handleOpenUpdate = (car) => {
    console.debug("updateCar", car);
    setModalMode(ModalMode.Update);
    reset(car);
    setOwner(car.car_owner_id.first_name);
    setOpen(true);
  };

  const confirmDeleteCar = (car) => {
    
    if (
      console.log("delete shop", car),
      confirm(
        `Are you sure to delete [${car.license_plate}] by [${car.car_owner_id.first_name}]?`
      )
    ) {
      deleteMutation.mutate(car._id);
      router.reload();
    }
  };

  //Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setOwner(event.target.value);
    register("owner");
  };
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 15,
    pt: 2,
    px: 4,
    pb: 4,
  };

  return (
    <div className="bg-[#F9F5EC] w-full h-screen">
      <AdminAppBar />
      <div className="flex flex-row my-5 mx-5 justify-between">
        <div className="text-lg flex font-sans">
          Cars
          <div className="ml-2">
            <button onClick={handleOpen}>
              <AddCircleOutlineIcon
                sx={{ color: "#FA8F54" }}
                onClick={handleOpenAdd}
              />
            </button>

            <Modal
              hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 500 }}>
                {modalMode == ModalMode.Add ? (
                  <h1 className="text-2xl font-bold font-sans my-5">
                    Create Car
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold font-sans my-5">
                    Update Car
                  </h1>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="License Plate"
                    variant="outlined"
                    className="w-full my-2"
                    type="text"
                    placeholder="License Plate"
                    {...register("license_plate", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Model"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("model", { required: true, maxLength: 80 })}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Brand"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("brand", {
                      required: true,
                      maxLength: 100,
                      min: 0,
                    })}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Color"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("color", {
                      required: true,
                      maxLength: 100,
                      min: 0,
                    })}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Owner
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={owner}
                      defaultValue={owner}
                      label="Owner Name"
                      {...register("owner", {
                        required: true,
                        maxLength: 80,
                      })}
                      className="w-full my-2"
                      onChange={handleChange}
                    >
                      {owners?.map((owner) => (
                        <MenuItem key={owner._id} value={owner.first_name}>
                          {owner.first_name} {owner.last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* <div className="flex mr-1">
                    {" "}
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      className="w-full my-2"
                      {...register("first_name", {
                        required: true,
                        maxLength: 80,
                      })}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      className="w-full my-2"
                      {...register("last_name", {
                        required: true,
                        maxLength: 80,
                      })}
                    />
                  </div> */}

                  <div className="flex justify-end mt-2">
                    <Button
                      className="text-[#FA8F54] font-bold text-right"
                      style={{ textTransform: "none" }}
                      size="large"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    {modalMode == ModalMode.Add ? (
                      <Button
                        className="text-white font-bold text-right"
                        type="submit"
                        size="large"
                        style={{
                          textTransform: "none",
                          backgroundColor: "#FA8F54",
                        }}
                      >
                        Add
                      </Button>
                    ) : (
                      <Button
                        className="text-white font-bold text-right"
                        type="submit"
                        style={{
                          textTransform: "none",
                          backgroundColor: "#FA8F54",
                        }}
                        size="large"
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
        <div className="mr-5 items-center text-dark">
          <form action="" className="relative mx-auto w-max">
            <div className="relative flex flex-row items-center">
              <div className="absolute pl-3 z-10">
                <SearchIcon sx={{ color: "#FA8F54" }} />
              </div>
              <input
                type="search"
                className="peer cursor-pointer relative h-12 w-12 rounded-full pl-12 outline-none focus:w-full focus:cursor-text focus:border focus:border-dark focus:pl-16 focus:pr-4"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      <TableContainer
        component={Paper}
        className="ml-5 "
        sx={{ maxWidth: 1500 }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                License Plate
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Brand
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Model
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Color
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Car Owner
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars
              .filter((car) =>
                Object.values(car).some((field) =>
                  field.toString().toLowerCase().includes(search.toLowerCase())
                )
              )
              .map((car) => (
                <StyledTableRow key={car._id}>
                  <StyledTableCell align="center">
                    {car.license_plate}
                  </StyledTableCell>
                  <StyledTableCell align="left">{car.brand}</StyledTableCell>
                  <StyledTableCell align="left">{car.model}</StyledTableCell>
                  <StyledTableCell align="left">{car.color}</StyledTableCell>
                  <StyledTableCell align="left">
                    {car.car_owner_id.first_name} {car.car_owner_id.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="flex">
                      <div className="px-2">
                        <EditIcon
                          sx={{
                            color: "#FA8F54",
                            borderRadius: 0,
                            border: "3px solid",
                          }}
                          onClick={() => handleOpenUpdate(car)}
                        />
                      </div>
                      <DeleteForeverIcon
                        sx={{
                          color: "#FA8F54",
                          borderRadius: 0,
                          border: "3px solid",
                        }}
                        onClick={() => confirmDeleteCar(car)}
                      />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   // TODO no Product API
//   // const res = await axios.get(
//   //   `${process.env.API_URI}products`
//   // );
//   // console.debug(`Calling ${process.env.API_URI}products`)
//   // console.debug(res.data)
//   // 'https://chassywebapp.azurewebsites.net/api/products'
//   // TODO dummy values
//   return {
//     props: {
//       todayTransactionCount: 2750,
//     },
//   };
// }
export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["owners"],
    queryFn: getCarOwners,
  });
  await queryClient.prefetchQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

IndexPage.admin = true;

export default IndexPage;
