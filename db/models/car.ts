import mongoose from 'mongoose';
import CarOwners from "./carOwner";
const CarSchema: any = new mongoose.Schema({
    license_plate: {type: String, require: true},
    brand: {type: String, default: ""},
    model: {type: String, default: ""},
    color: {type: String, default: ""},
    car_owner_id: {type: mongoose.Types.ObjectId, require: true, ref: CarOwners,
        validate: {
            validator: async function(value: any) {
                const carOwner = await CarOwners.findById(value);
                if (!carOwner) return false
                return true
            },
            message: "This CarOwner's id does not exist"
        }
    },
    rating: {type: Number, default: 5.0}
},{
    strict: true
});

export default mongoose.models.Car || mongoose.model('Car', CarSchema);