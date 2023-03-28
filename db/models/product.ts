import mongoose from 'mongoose';
import Shop from './shop';
5
interface IProduct {
  shop: object,
  product_name: string, // TODO change to 'name'
  price: number,
  brand: string,
  description: string
}

const ProductSchema: any = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: Shop,
    validate: {
      validator: async function (value: any) {
        const shop = await Shop.findById(value);
        if (!shop) return false;
        return true;
      },
      message: "This `shop` doesn't exist"
    }
  },
  product_name: { type: String, require: true },
  price: { type: Number, require: true }, // TODO add constraint not less than 0
  brand: { type: String, require: true },
  description: { type: String, require: true }
}, {
  strict: true
})

// export default mongoose.models.Service || mongoose.model('Service', ServiceSchema)
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
export default Product;