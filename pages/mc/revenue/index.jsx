import * as React from "react";
// import type { NextPage } from "next";
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
  getShops,
  getServices,
  createService,
  updateService,
  deleteServiceById,
} from "../../../lib/helper";
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

function IndexPage() {
  const [modalMode, setModalMode] = React.useState(ModalMode.None);

  const [open, setOpen] = React.useState(false);
  const [shop, setShop] = React.useState("");
  const [search, setSearch] = React.useState("");

  console.log("search it is", search);
  const queryClient = useQueryClient();
  const router = useRouter();

  //search filter

  //Mutation
  const addMutation = useMutation(createService, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      router.reload();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const updateMutation = useMutation(updateService, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.reload();
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const deleteMutation = useMutation(deleteServiceById, {
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
    console.debug("onSubmit", data);

    if (modalMode == ModalMode.Add) {
      const theShop = shops.find((s) => s.registered_name == data.shop);
      console.assert(theShop != undefined);

      addMutation.mutate({
        ...data,
        shop: theShop._id,
      });
    } else if (modalMode == ModalMode.Update) {
      console.debug("Data to be updated", data);
      const theShop = shops.find((s) => s.registered_name == shop);
      console.assert(theShop != undefined); // Since the data is from the same list
      console.debug("---", theShop, data.shop.registered_name);

      updateMutation.mutate({
        ...data,
        shop: theShop._id,
      });
    }
  };
  // console.log("useSession", useSession());
  // console.log(getServices())
  //get data
  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });
  // console.log("Shops na ja",shops)

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
      console.log("data received: ", data);
      if (data.length === 0) {
        return []; // return an empty array instead of undefined
      }
      if (data.length > 0) {
        const modifiedData = data.map((service) => {
          if (service.shop != null) {
            return {
              ...service,
            };
          }
        });
        const filteredData = modifiedData.filter((item) => item);
        return filteredData;
      }
    },
  });

  console.log("show me services", services);

  if (isLoading) return "Loading";
  if (isError) {
    console.error(error);
    return "Error";
  }

  //ModalMode
  const handleOpenAdd = () => {
    setModalMode(ModalMode.Add);
    reset({});
    setShop(undefined); // UNSURE is this the right approach to un-select any option
    setOpen(true);
  };

  const handleOpenUpdate = (service) => {
    console.debug("updateService", service, service.shop.registered_name);
    setModalMode(ModalMode.Update);
    reset(service);
    setShop(service.shop.registered_name);
    setOpen(true);
  };

  const confirmDeleteService = (service) => {
    if (
      confirm(
        `Are you sure to delete [${service.service_name}] by [${service.shop.registered_name}]?`
      )
    ) {
      deleteMutation.mutate(service._id);
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
    setShop(event.target.value);
    {
      register("shop");
    }
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
          Revenue
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
                    Create Service
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold font-sans my-5">
                    Update Service
                  </h1>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="Service Name"
                    variant="outlined"
                    className="w-full my-2"
                    type="text"
                    placeholder="Service Name"
                    {...register("service_name", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Category"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("category", { required: true, maxLength: 80 })}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Shop Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={shop}
                      defaultValue={shop}
                      label="Shop Name"
                      {...register("shop", {
                        required: true,
                        maxLength: 80,
                      })}
                      className="w-full my-2"
                      onChange={handleChange}
                    >
                      {shops?.map((shop) => (
                        <MenuItem key={shop._id} value={shop.registered_name}>
                          {shop.registered_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("price", {
                      required: true,
                      maxLength: 100,
                      min: 0,
                    })}
                  />

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
                #
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Shop Name
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Total Car
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Total Revenue
              </StyledTableCell>
              
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services
              .filter((service) =>
                Object.values(service).some((field) =>
                  field.toString().toLowerCase().includes(search.toLowerCase())
                )
              )
              .map((service) => (
                <StyledTableRow key={service._id}>
                  <StyledTableCell align="center">
                    {service.__v}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {service.shop.registered_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    10
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  25000
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
                          onClick={() => handleOpenUpdate(service)}
                        />
                      </div>
                      <DeleteForeverIcon
                        sx={{
                          color: "#FA8F54",
                          borderRadius: 0,
                          border: "3px solid",
                        }}
                        onClick={() => confirmDeleteService(service)}
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
  await queryClient.prefetchQuery({ queryKey: ["shops"], queryFn: getShops });
  await queryClient.prefetchQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

IndexPage.admin = true;

export default IndexPage;
