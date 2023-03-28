

import mongoose from 'mongoose'
import Shop from "./shop";
import User from "./user";
const ShopTransactionSchema: any = new mongoose.Schema({
    user_id: {type: mongoose.Types.ObjectId, require: true, ref: User,
        validate: {
            validator: async function(value: any) {
                const user = await User.findById(value);
                if (!user) return false;
                return true;
            },
            message: "User's id does not exist"
        }
    },
    shop_id: {type: mongoose.Types.ObjectId, require: true, ref: Shop,
        validate: {
            validator: async function(value: any) {
                const shop = await Shop.findById(value);
                if (!shop) return false;
                return true;
            },
            message: "Shop's id does not exist"
        }
    },
    date: {type: Date, default: Date.now},
    car_amount: {type: Number, require: true, min: 0},
    price_per_unit: {type: Number, require: true, min: 0},
    total_price: {type: Number, default: function() {
        // @ts-ignore
            return this.car_amount * this.price_per_unit;
    }}
},{
    strict: true
})

// {
//     validator: async function(value: any) {
//         const shop = await Shop.findById(value);
//         // console.log(this.user_id)
//         // console.log(shop.user_id)
//         if (shop.user_id === this.user_id) return true;
//         else return false;
//     },
//     message: "This user is no authentication to buy package for this shop"
// }
ShopTransactionSchema.pre('save', async function () {
    // @ts-ignore
    const shop = await Shop.findById(this.shop_id);
    if(shop) {
         // @ts-ignore
        shop.remaining_car = this.car_amount;
        await shop.save();
    }

});

export default mongoose.models.ShopTransaction || mongoose.model('ShopTransaction', ShopTransactionSchema)