import mongoose from 'mongoose';
import Shop from './shop';

interface IStoreRevenue {
  shop: object,
  total_car: number, // TODO change to 'name'
  total_revenue: number,
}

const StoreRevenueSchema: any = new mongoose.Schema({
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
  total_car: { type: Number, require: true },
  total_revenue: { type: Number, require: true }, // TODO add constraint not less than 0
}, {
  strict: true
})

// export default mongoose.models.Service || mongoose.model('Service', ServiceSchema)
const StoreRevenue = mongoose.models.StoreRevenue || mongoose.model<IStoreRevenue>('StoreRevenue', StoreRevenueSchema)
export default StoreRevenue;