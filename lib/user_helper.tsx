import axios from "axios";
import Car from "../db/models/car";
import User from "../db/models/user";
import CarOwner from "../db/models/user";
import Shop from "../db/models/shop";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://chassy-web-app-zzhengli.vercel.app/";
export async function getUsers(): Promise<Array<typeof User>> {
  const apiUri = `${BASE_URL}api/users/hello`;
  try {
    const ret = await axios.get(apiUri);
    // console.log(ret);
    const users = ret.data;
    console.log("users aaja", users);
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getShops(): Promise<Array<typeof Shop>> {
  // Test API http://localhost:3000/api/shops
  // console.debug("getShops() is called")
  const apiUri = `${BASE_URL}api/shops/hello`;
  const ret = await axios.get(apiUri);
  const shops = ret.data;
  // console.debug(`\t${shops.length}`)
  return shops;
}

export async function createUser(
  user: typeof User
): Promise<Array<typeof User>> {
  const apiUri = `${BASE_URL}api/users/hello`;
  const res = await axios.post(apiUri, user);
  return res.data;
}

export async function updateUser(
  user: typeof User
): Promise<Array<typeof User>> {
  console.debug("updateUser", user);
  const apiUri = `${BASE_URL}api/users/hello`;
  const { data } = await axios.put(apiUri, user);
  return data;
  // consoledebug(ret)
}

export function deleteUserById(userId: string): any {
  console.debug("deleteUserById", userId);
  const apiUri = `${BASE_URL}api/users/${userId}`;
  return axios.delete(apiUri);
}
