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
  getShopOwners,
  createShop,
  updateShop,
  deleteShopById,
} from "../../../lib/shop_helper";
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

// console.log("getshops", getShops())
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

console.log("shopd", getShops());

function IndexPage() {
  const [modalMode, setModalMode] = React.useState(ModalMode.None);
  const [open, setOpen] = React.useState(false);
  const [owner, setOwner] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  console.log("search it is", search);
  const queryClient = useQueryClient();
  const router = useRouter();

  //Mutation
  const addMutation = useMutation(createShop, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      router.reload();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });

  const updateMutation = useMutation(updateShop, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.reload();
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });

  const deleteMutation = useMutation(deleteShopById, {
    onSuccess: () => {
      console.log("Data Deleted");
    },
  });

  //get data
  const { data: owners } = useQuery({
    queryKey: ["owners"],
    queryFn: getShopOwners,
    refetchOnWindowFocus: false,
  });
  console.log("Owners na ja", owners);

  //Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.debug("onSubmit", data.owner, data);

    if (modalMode == ModalMode.Add) {
      const theOwner = shops.find(
        (o) => o.owner.first_name == data.owner 
      );
      console.assert(theOwner != undefined);
      console.log("chalo owner", theOwner.owner_id);

      addMutation.mutate({
        name: data.name,
        registered_name: data.registered_name,
        location: data.location,
        phone_number: data.phone_number,
        owner: theOwner.owner._id,
      });
    } else if (modalMode == ModalMode.Update) {
      console.debug("Data to be updated", data);
      const theOwner = shops.find(
        (o) => o.owner.first_name == owner
      );
      console.assert(theOwner != undefined); // Since the data is from the same list
      console.debug("---", theOwner, data.owner);

      updateMutation.mutate({
        ...data,
        owner: theOwner.owner._id,
      });
    }
  };

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
            console.log("shop hu", shop)
            return {
              ...shop,
            };
          }
        });
        console.log("modified data it is", modifiedData)
        const filteredData = modifiedData.filter((item) => item);
        console.log("item data it is", filteredData)
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

  //ModalMode
  const handleOpenAdd = () => {
    setModalMode(ModalMode.Add);
    reset({});
    setOwner(undefined); // UNSURE is this the right approach to un-select any option
    setOpen(true);
  };

  const handleOpenUpdate = (shop) => {
    console.debug("updateShop", shop, shop.owner.first_name);
    setModalMode(ModalMode.Update);
    reset(shop);
    // setFirstName(shop.owner.first_name)
    // setLastName(shop.owner.last_name)
    setOwner(shop.owner.first_name);
    setOpen(true);
  };

  const confirmDeleteShop = (shop) => {
    if (
      console.log("delete shop", shop),
      confirm(
        `Are you sure to delete [${shop.registered_name}] by [${shop.owner.first_name}]?`
      )
    ) {
      
      deleteMutation.mutate(shop._id);
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
    {
      register("owner");
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

  const shownOwnerIds = [];

  return (
    <div className="bg-[#F9F5EC] w-full h-screen">
      <AdminAppBar />
      <div className="flex flex-row my-5 mx-5 justify-between">
        <div className="text-lg flex font-sans">
          Shops
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
                    Create Shop
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold font-sans my-5">
                    Update Shop
                  </h1>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="Shop Name"
                    variant="outlined"
                    className="w-full my-2"
                    type="text"
                    placeholder="Shop Name"
                    {...register("name", {
                      required: true,
                      maxLength: 80,
                    })}
                  />
                  <TextField
                    label="Shop Registered Name"
                    variant="outlined"
                    className="w-full my-2"
                    type="text"
                    placeholder="Shop Registered Name"
                    {...register("registered_name", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Owner Name
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
                      {owners?.map((owner) => {
                        if (owner.owner_id === null || shownOwnerIds.includes(owner.owner_id)) {
                          // skip rendering MenuItem for this owner
                          return null;
                        } else {
                          // add owner_id to the array of shownOwnerIds
                          shownOwnerIds.push(owner.owner_id);
                          // render MenuItem for this owner
                          return (
                            <MenuItem key={owner.owner_id} value={owner.first_name}>
                              {owner.first_name} {owner.last_name}
                            </MenuItem>
                          );
                        }
                      })}
                    </Select>
                  </FormControl>

                  

                  <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("location", { required: true, maxLength: 80 })}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("phone_number", {
                      required: true,
                      maxLength: 80,
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
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Shop
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Owner
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Location
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Phone Number
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops
              .filter((shop) =>
                Object.values(shop).some((field) =>
                  field.toString().toLowerCase().includes(search.toLowerCase())
                )
              )
              .map((shop) => (
                <StyledTableRow key={shop._id}>

                  <StyledTableCell align="left">
                    <div>{shop.name} </div>
                    {shop.registered_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {shop.owner.first_name} {shop.owner.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {shop.location}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {shop.phone_number}
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
                          onClick={() => handleOpenUpdate(shop)}
                        />
                      </div>
                      <DeleteForeverIcon
                        sx={{
                          color: "#FA8F54",
                          borderRadius: 0,
                          border: "3px solid",
                        }}
                        onClick={() => confirmDeleteShop(shop)}
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

export async function getServerSideProps(context) {
  // TODO dummy values
  return {
    props: {
      todayTransactionCount: 2750,
    },
  };
}

IndexPage.admin = true;

export default IndexPage;
