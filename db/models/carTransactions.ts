
import mongoose, { mongo } from 'mongoose'
import Cars from "./car";
import Shops from "./shop";
import Users from "./user";
import Services from "./service";
import mongoosePaginate from 'mongoose-paginate-v2';

const CarTransactionSchema: any = new mongoose.Schema({
    car_id: {type: mongoose.Types.ObjectId, ref: Cars, require: true,
        validate: {
            validator: async function(values: any){
                const car = await Cars.findById(values);
                if (!car) return false
                return true
            },
            message: "This Car's id doesn't exist"
        }
    },
    shop_id: {type: mongoose.Types.ObjectId, ref: Shops, require: true,
        validate: {
            validator: async function(values: any){
                const shop = await Shops.findById(values);
                if (!shop) return false
                return true
            },
            message: "This Shop's id doesn't exist"
        }
    },
    user_id: {type: mongoose.Types.ObjectId, ref: Users, require: true,
        validate: {
            validator: async function(values: any){
                const user = await Users.findById(values);
                if (!user) return false
                return true
            },
            message: "This User's id doesn't exist"
        }
    },
    start_date: {type: Date, default: Date.now},
    finish_date: {type: Date, default: null},
    services: {type: [mongoose.Types.ObjectId], default: [], ref: Services,
        validate: {
            validator: async function(values: any){
                for (const value of values) {
                    const service = await Services.findById(value);
                    if (!service) return false;
                    // @ts-ignore
                    else if (service.shop_id.toString() != this.shop_id) return false;
                }
                return true;
            },
            message: '{VALUE} does not exist'
        }
    },
    total_price: {type: Number},
    rating_from_customer: {type: Number, default: null},
    review_from_customer: {type: String, default: ""},
    rating_from_shop: {type: Number, default: null},
    review_from_shop: {type: String, default: ""},
    car_image: {type: String, default: ""},
    evidence_image: {type: [String], default: []},
    status: {type: String, default: "in-process",
        enum: {values: ["in-process", "completed"], message: '{VALUE} is not supported'}
    }
},{
    strict: true
})

CarTransactionSchema.pre('save', async function () {
    var total = 0;
    // @ts-ignore
    for (const value of this.services) {
        const service = await Services.findById(value);
        total += service.price;
    }
    console.log(total);
    // @ts-ignore
    this.total_price = total;
});

CarTransactionSchema.plugin(mongoosePaginate);
const model = mongoose.models.CarTransaction || mongoose.model('CarTransaction', CarTransactionSchema);
//type = 'O', 'C'
export default model;