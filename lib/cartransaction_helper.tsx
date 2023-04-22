import axios, { AxiosResponse } from "axios";
import Car from "../db/models/carTransactions";
import Service from "../db/models/service";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://chassy-web-app-zzhengli.vercel.app/";
export async function getCars(): Promise<Array<typeof Car>> {
  const apiUri = `${BASE_URL}api/cartransactions/hello`;
  try {
    const ret = await axios.get(apiUri);
    // console.log(ret);
    const cars = ret.data;
    console.log("cars aaja", cars);
    return cars;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCarServices(): Promise<Array<typeof Service>> {
  // Test API http://localhost:3000/api/shops
  // console.debug("getShops() is called")
  const apiUri = `${BASE_URL}api/services/hello`;
  const ret = await axios.get(apiUri);
  const services = ret.data;
  // console.debug(`\t${shops.length}`)
  return services;
}

export async function createCarTransactions(
  car: typeof Car
): Promise<Array<typeof Car>> {
  const apiUri = `${BASE_URL}api/cartransactions/hello`;
  const res = await axios.post(apiUri, car);
  return res.data;
}

export async function updateCar(car: typeof Car): Promise<Array<typeof Car>> {
  console.log("updateCar", car);
  const apiUri = `${BASE_URL}api/cartransactions/hello`;
  const { data } = await axios.put(apiUri, car);
  return data;
}

export function deleteCarById(carId: string): any {
  console.debug("deleteCarById", carId);
  const apiUri = `${BASE_URL}api/cartransactions/${carId}`;
  return axios.delete(apiUri);
}
