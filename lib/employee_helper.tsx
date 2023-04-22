import axios from "axios";
import Employee from "../db/models/employee";
import Shop from "../db/models/shop";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://chassy-web-app-zzhengli.vercel.app/";
export async function getEmployees(): Promise<Array<typeof Employee>> {
  const apiUri = `${BASE_URL}api/employees/hello`;
  try {
    const ret = await axios.get(apiUri);
    // console.log(ret);
    const employees = ret.data;
    console.log("employees aaja", employees);
    return employees;
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

export async function createEmployee(
  employee: typeof Employee
): Promise<Array<typeof Employee>> {
  const apiUri = `${BASE_URL}api/employees/hello`;
  const res = await axios.post(apiUri, employee);
  return res.data;
}

export async function updateEmployee(
  employee: typeof Employee
): Promise<Array<typeof Employee>> {
  console.debug("updateEmployee", employee);
  const apiUri = `${BASE_URL}api/employees/hello`;
  const { data } = await axios.put(apiUri, employee);
  return data;
  // consoledebug(ret)
}

export function deleteEmployeeById(employeeId: string): any {
  console.debug("deleteEmployeeById", employeeId);
  const apiUri = `${BASE_URL}api/employees/${employeeId}`;
  return axios.delete(apiUri);
}
