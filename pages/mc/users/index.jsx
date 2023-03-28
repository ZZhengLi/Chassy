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
  getUsers,
  getShops,
  createUser,
  updateUser,
  deleteUserById,
} from "../../../lib/user_helper";
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
import bcrypt from 'bcryptjs';

// console.log("getusers", getUsers())
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

console.log("userd", getUsers());

function IndexPage() {
  const [modalMode, setModalMode] = React.useState(ModalMode.None);
  const [open, setOpen] = React.useState(false);
  const [shop, setShop] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const [search, setSearch] = React.useState("");


  console.log("search it is", search);
  const queryClient = useQueryClient();
  const router = useRouter();

  //Mutation
  const addMutation = useMutation(createUser, {
    onSuccess: () => {
      console.log("Data Inserted");
      alert("Your new feature has been successfully added into the database");
      router.reload();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      console.log("Data Updated");
      alert("Your new feature has been successfully updated into the database");
      router.reload();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteMutation = useMutation(deleteUserById, {
    onSuccess: () => {
      console.log("Data Deleted");
    },
  });

  //get data
  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
  });
  console.log("Shops na ja", shops);

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
      const ifShop = data.user_type === "owner" ? null : shops.find((s) => s.registered_name == data.shop);
      console.assert(theShop != undefined);

      console.log("chalo shop", ifShop._id);

      const theOwner = data.user_type === "owner" ? null : ifShop.owner_id;
      const theShop = ifShop == null ? null : ifShop._id
      const password = data.password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      console.log("hash it is",hash);

      addMutation.mutate({
        shop: theShop,
        first_name: data.first_name,
        last_name: data.last_name,
        user_type: data.user_type,
        phone_number: data.phone_number,
        password: hash,
        owner_id: theOwner,
        username: data.username,  
        email: data.email,
        __v: 0,
        picture_url: "",
      });
    } else if (modalMode == ModalMode.Update) {
      console.debug("Data to be updated", data);
      const theOwner = users.find(
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
            console.log("user hu", user)
            return {
              ...user,
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

  console.log("show me users", users);

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

  const handleOpenUpdate = (user) => {
    console.debug("updateUser", user, user.owner.first_name);
    setModalMode(ModalMode.Update);
    reset(user);
    // setFirstName(user.owner.first_name)
    // setLastName(user.owner.last_name)
    setShop(user.owner.first_name);
    setOpen(true);
  };

  const confirmDeleteUser = (user) => {
    if (
      console.log("delete user", user),
      confirm(
        `Are you sure to delete [${user.registered_name}] by [${user.owner.first_name}]?`
      )
    ) {

      deleteMutation.mutate(user._id);
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
    setUserType(event.target.value);
    {
      register("user_type");
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
          Users
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
                    Create User
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold font-sans my-5">
                    Update User
                  </h1>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    className="w-full my-2"
                    type="text"

                    {...register("first_name", {
                      required: true,
                      maxLength: 80,
                    })}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    className="w-full my-2"
                    type="text"

                    {...register("last_name", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("username", { required: true, maxLength: 80 })}
                  />


                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("email", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    className="w-full my-2"
                    {...register("password", { required: true, maxLength: 80 })}
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

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userType}
                      defaultValue={userType}
                      label="User Type"
                      {...register("user_type", {
                        required: true,
                        maxLength: 80,
                      })}
                      className="w-full my-2"
                      onChange={handleChange}
                    >

                      {[...new Set(users.map(user => user.user_type))].map((userType) => (
                        <MenuItem key={userType} value={userType}>
                          {userType}
                        </MenuItem>
                      ))}

                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Assigned Shop
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
                Firstname
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Lastname
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Username
              </StyledTableCell>

              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Email
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
              >
                User Type
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              >
                Assigned Shop
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontSize: 16, fontWeight: 700 }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) =>
                Object.values(user).some((field) =>
                  field.toString().toLowerCase().includes(search.toLowerCase())
                )
              )
              .map((user) => (
                <StyledTableRow key={user._id}>

                  <StyledTableCell align="left">
                    {user.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.username}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.phone_number}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {user.user_type}
                  </StyledTableCell>
                  {user.shop == null ? (
                    <StyledTableCell align="left">-</StyledTableCell>
                  ) : (<StyledTableCell align="left">
                    {user.shop.registered_name}
                  </StyledTableCell>)}

                  <StyledTableCell align="left">
                    <div className="flex">
                      <div className="px-2">
                        <EditIcon
                          sx={{
                            color: "#FA8F54",
                            borderRadius: 0,
                            border: "3px solid",
                          }}
                          onClick={() => handleOpenUpdate(user)}
                        />
                      </div>
                      <DeleteForeverIcon
                        sx={{
                          color: "#FA8F54",
                          borderRadius: 0,
                          border: "3px solid",
                        }}
                        onClick={() => confirmDeleteUser(user)}
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
