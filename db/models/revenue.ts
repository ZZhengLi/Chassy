import mongoose from 'mongoose';
import Shop from './shop';

interface IService {
  shop: object,
  service_name: string, // TODO change to 'name'
  price: number,
  category?: string
}

const ServiceSchema: any = new mongoose.Schema({
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
  service_name: { type: String, require: true },
  price: { type: Number, require: true }, // TODO add constraint not less than 0
  category: { type: String, default: "" }
}, {
  strict: true
})

// export default mongoose.models.Service || mongoose.model('Service', ServiceSchema)
const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)
export default Service;