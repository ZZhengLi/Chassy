import mongoose from 'mongoose';
import Shop from './shop';

interface IEmployee {
  shop: object,
  first_name: string, // TODO change to 'name'
  last_name: number,
  position: string,
  status: string,
  email: string,
  phone_number: string,
  picture_url: string,
  user_type: string,
  password: string,
  username: string
}

const EmployeeSchema: any = new mongoose.Schema({
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
  first_name: { type: String, require: true },
  last_name: { type: String, require: true }, // TODO add constraint not less than 0
  phone_number: { type: String, require: true },
  position:  { type: String, require: true },
  status: { type: String, require: "Active" },
  picture_url: { type: String, default: "" },
  email: {type: String, default: ""},
  password: {type: String, default: ""},
  username: {type: String, default: ""},
  user_type: {type: String, default: "employee"},
}, {
  strict: true
})

// export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema)
const Employee = mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema)
export default Employee;