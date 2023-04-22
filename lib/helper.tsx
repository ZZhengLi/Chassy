import axios from "axios";
import Service from "../db/models/service";
import Shop from "../db/models/shop";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://chassy-web-app-zzhengli.vercel.app/";
export async function getServices(): Promise<Array<typeof Service>> {
  const apiUri = `${BASE_URL}api/services/hello`;
  try {
    const ret = await axios.get(apiUri);
    // console.log(ret);
    const services = ret.data;
    console.log("services aaja", services);
    return services;
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

export async function createService(
  service: typeof Service
): Promise<Array<typeof Service>> {
  const apiUri = `${BASE_URL}api/services/hello`;
  const res = await axios.post(apiUri, service);
  return res.data;
}

export async function updateService(
  service: typeof Service
): Promise<Array<typeof Service>> {
  console.debug("updateService", service);
  const apiUri = `${BASE_URL}api/services/hello`;
  const { data } = await axios.put(apiUri, service);
  return data;
  // consoledebug(ret)
}

export function deleteServiceById(serviceId: string): any {
  console.debug("deleteServiceById", serviceId);
  const apiUri = `${BASE_URL}api/services/${serviceId}`;
  return axios.delete(apiUri);
}
