import axios from "axios";
const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://chassy-web-app-zzhengli.vercel.app/";
import Shop from "../db/models/shop";
import User from "../db/models/user";

export async function getShops(): Promise<Array<typeof Shop>> {
  const apiUri = `${BASE_URL}api/shops/hello`;
  try {
    const ret = await axios.get(apiUri);
    // console.log(ret);
    const shops = ret.data;
    console.log("shops aaja", shops);
    return shops;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getShopOwners(): Promise<Array<typeof User>> {
  // Test API http://localhost:3000/api/shops
  // console.debug("getShops() is called")
  const apiUri = `${BASE_URL}api/users/hello`;
  const ret = await axios.get(apiUri);
  const owners = ret.data;
  // console.debug(`\t${shops.length}`)
  return owners;
}

export async function createShop(
  shop: typeof Shop
): Promise<Array<typeof Shop>> {
  const apiUri = `${BASE_URL}api/shops/hello`;
  const res = await axios.post(apiUri, shop);
  return res.data;
}

export async function updateShop(
  shop: typeof Shop
): Promise<Array<typeof Shop>> {
  console.debug("updateShop", shop);
  const apiUri = `${BASE_URL}api/shops/hello`;
  const { data } = await axios.put(apiUri, shop);
  return data;
  // consoledebug(ret)
}

export function deleteShopById(shopId: string): any {
  console.debug("deleteShopById", shopId);
  const apiUri = `${BASE_URL}api/shops/${shopId}`;
  return axios.delete(apiUri);
}
