import axios from "axios";
import Product from "../db/models/product";
import Shop from "../db/models/shop";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://chassy-web-app-zzhengli.vercel.app/";
export async function getProducts(): Promise<Array<typeof Product>> {
  const apiUri = `${BASE_URL}api/products/hello`;
  try {
    const ret = await axios.get(apiUri);
    // console.log(ret);
    const products = ret.data;
    console.log("products aaja", products);
    return products;
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

// export async function createProduct(product: Product): Array<Product> {
//   console.debug("createProduct() is called")
//   const apiUri = `${BASE_URL}api/products/hello`;
//   const res = await axios.post(apiUri, product);
//   console.debug("bole toh", res);
//   return res.data;
// }

export async function createProduct(
  product: typeof Product
): Promise<Array<typeof Product>> {
  const apiUri = `${BASE_URL}api/products/hello`;
  const res = await axios.post(apiUri, product);
  return res.data;
}

export async function updateProduct(
  product: typeof Product
): Promise<Array<typeof Product>> {
  console.debug("updateProduct", product);
  const apiUri = `${BASE_URL}api/products/hello`;
  const { data } = await axios.put(apiUri, product);
  return data;
  // consoledebug(ret)
}

export function deleteProductById(productId: string): any {
  console.debug("deleteProductById", productId);
  const apiUri = `${BASE_URL}api/products/${productId}`;
  return axios.delete(apiUri);
}
