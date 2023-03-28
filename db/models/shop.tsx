import mongoose from 'mongoose'
import User from './user';

interface IShop {
    name: string,
    registered_name: string,
    business_no: string,
    location: string,   // TODO this should be a compound objects, especially province, country.
    phone_number: string,    // TODO change this to `phone_number` to be consistent with user
    owner: object,
    remaining_cars: number,
    rating: number
}

const ShopSchema: any = new mongoose.Schema({
    name: { type: String },
    registered_name: { type: String },
    business_no: { type: String },
    location: { type: String },
    phone_number: { type: String },
    owner: {
        type: mongoose.Types.ObjectId, ref: "User", require: true,
        validate: {
            validator: async function (value: any) {
                const user = await User.findById(value);
                if (!user) return false
                return true
            },
            message: "there is no owner's user exist"
        }
    },
    remaining_cars: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0 }
}, {
    strict: true
})

// export default mongoose.models.Shop || mongoose.model('Shop', ShopSchema)
const Shop = mongoose.models.Shop || mongoose.model<IShop>('Shop', ShopSchema);
export default Shop;
// That || is to prevent cyclic declaration
