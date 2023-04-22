import mongoose, { mongo } from "mongoose";
import Cars from "./car";
import Shops from "./shop";
import Users from "./user";
import Services from "./service";
import mongoosePaginate from "mongoose-paginate-v2";

const CarTransactionSchema: any = new mongoose.Schema(
  {
    car_id: { type: mongoose.Types.ObjectId, ref: Cars, require: true },
    shop_id: { type: mongoose.Types.ObjectId, ref: Shops, require: true },
    //user_id: { type: mongoose.Types.ObjectId, ref: Users, require: true },
    imgId: { type: String, require: true },
    start_date: { type: Date, default: Date.now },
    finish_date: { type: Date, default: null },
    services: { type: [mongoose.Types.ObjectId], default: [], ref: Services },
    total_price: { type: Number },
    rating_from_customer: { type: Number, default: null },
    review_from_customer: { type: String, default: "" },
    rating_from_shop: { type: Number, default: null },
    review_from_shop: { type: String, default: "" },
    car_image: { type: String, default: "" },
    evidence_image: { type: [String], default: [] },
    status: {
      type: String,
      default: "in-process",
      enum: {
        values: ["in-process", "completed"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    strict: true,
  }
);

// CarTransactionSchema.pre("save", async function () {
//   var total = 0;
//   // @ts-ignore
//   for (const value of this.services) {
//     const service = await Services.findById(value);
//     total += service.price;
//   }
//   console.log(total);
//   // @ts-ignore
//   this.total_price = total;
// });

CarTransactionSchema.plugin(mongoosePaginate);
const model =
  mongoose.models.CarTransaction ||
  mongoose.model("CarTransaction", CarTransactionSchema);
//type = 'O', 'C'
export default model;
