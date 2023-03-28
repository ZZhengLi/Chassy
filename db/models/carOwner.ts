import mongoose from 'mongoose'

const CarOwnerSchema: any = new mongoose.Schema({
    line_id: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    phone_number: {type: String},
    email: {type: String}
},{
    strict: true
})

const model = mongoose.models.CarOwner || mongoose.model('CarOwner', CarOwnerSchema);

export default model;