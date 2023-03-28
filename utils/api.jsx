import axios from "axios";
import Service from "db/models/service";
import Shop from "db/models/shop";
import User from "../db/models/user";

export async function getUsers() {
  // Test API http://localhost:3000/api/users
  console.debug("getUsers() is called", process.env.API_URI);
  const apiUri = `${process.env.API_URI}users`;
  const ret = await axios(apiUri);
  const users = ret.data;
  return users;
}

export async function getShops() {
  // Test API http://localhost:3000/api/shops
  // console.debug("getShops() is called")
  const apiUri = `${process.env.API_URI}shops`;
  const ret = await axios(apiUri);
  const shops = ret.data;
  // console.debug(`\t${shops.length}`)
  return shops;
}

export async function getServices() {
  // Test API http://localhost:3000/api/services
  // console.debug("getServices() is called", `${process.env.API_URI}services`)
  const apiUri = `${process.env.API_URI}services`;
  const ret = await axios.get(apiUri);
  const services = ret.data;
  // console.debug(`\t${services.length}`)
  return services;
}

export function createService(service) {
  console.debug("createService", service)
  const apiUri = `${process.env.API_URI}services`
  return axios.post(apiUri, service)
  // console.debug(ret)
}

export function updateService(service) {
  console.debug("createService", service)
  const apiUri = `${process.env.API_URI}services`
  return axios.put(apiUri, service)
  // console.debug(ret)
}

export function deleteService(service) {
  console.debug("deleteService", service)
  const apiUri = `${process.env.API_URI}services/${service._id}`
  return axios.delete(apiUri)
}
