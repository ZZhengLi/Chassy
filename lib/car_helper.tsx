import axios from "axios";
import Car from "../db/models/car";
import CarOwner from "../db/models/carOwner";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://chassy-web-app-zzhengli.vercel.app/";
export async function getCars(): Promise<Array<typeof Car>> {
  const apiUri = `${BASE_URL}api/cars/hello`;
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

export async function getCarOwners(): Promise<Array<typeof CarOwner>> {
  // Test API http://localhost:3000/api/shops
  // console.debug("getShops() is called")
  const apiUri = `${BASE_URL}api/carowners/hello`;
  const ret = await axios.get(apiUri);
  const carOwners = ret.data;
  // console.debug(`\t${shops.length}`)
  return carOwners;
}

export async function createCar(car: typeof Car): Promise<Array<typeof Car>> {
  const apiUri = `${BASE_URL}api/cars/hello`;
  const res = await axios.post(apiUri, car);
  return res.data;
}

export async function updateCar(car: typeof Car): Promise<Array<typeof Car>> {
  console.debug("updateCar", car);
  const apiUri = `${BASE_URL}api/cars/hello`;
  const { data } = await axios.put(apiUri, car);
  return data;
  // consoledebug(ret)
}

export function deleteCarById(carId: string): any {
  console.debug("deleteCarById", carId);
  const apiUri = `${BASE_URL}api/cars/${carId}`;
  return axios.delete(apiUri);
}
