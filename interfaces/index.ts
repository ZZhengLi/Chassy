// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

// NEED TO REVIEW THIS LATER

import { Schema, Types } from 'mongoose';

// For Mongoose
export type UserData = {
  fname: String;
  lname: String;
  email: String;
  userid: String; // TODO Camel case
  customerid: String; // TODO Camel case
};

export type Profile = {
  userId?: string;
  displayName?: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export type OwnerData = {
  fname: string;
  lname: string;
  age: number;
  email: string;
  phone_number: string;
  username: string;
  password: string;
  stores_id: [Types.ObjectId];
  type: string;
};

export type StoreData = {};

export type Shop = {
  _id: [Types.ObjectId];
  name_th: string;
  name_en: string;
  location: string;
  tel: string;
  user: string;
  rating: number;
  __v: number;
  remaining_car: number;
};
export type Employee = {
  _id: [Types.ObjectId];
  first_name: string;
  last_name: string;
  picture_url: string;
  shop_id: Shop;
};
