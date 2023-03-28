// TODO adjust to TypeScript
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcryptjs';
import Shop from "./shop";

interface IUser {
  first_name: string,
  last_name: string,
  username: string,
  password: string,
  picture_url?: string,
  email: string,
  phone_number: string,
  user_type: string,
  shop: object
}

const UserSchema = new mongoose.Schema({
  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  username: {
    type: String,
    validate: {
      validator: function (value: any) {
        // @ts-ignore
        if (this.user_type === "owner") {
          // @ts-ignore
          if (!value || value === "") return false;
          return true
        }
      },
      message: "Please specify username"
    }
  },
  password: {
    type: String,
    validate: {
      validator: function (value: any) {
        // @ts-ignore
        if (this.user_type === "owner") {
          // @ts-ignore
          if (!value || value === "") return false;
          return true
        }
      },
      message: "Please specify password"
    }
  },
  email: { type: String, default: "" },
  phone_number: { type: String, required: true },
  picture_url: { type: String, default: "" },
  user_type: {
    type: String, required: true,
    enum: { values: ["owner", "employee"], message: '{VALUE} is not supported' }
  },
  owner_id: { // TODO change this to `owner
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "User",
    validate: {
      validator: async function (values: any) {
        // validate
        // @ts-ignore
        if (this.user_type == "employee") {
          if (values) {
            // @ts-ignore
            const user = await this.constructor.findById(values);
            if (!user) return false
          } else {
            return false;
          }
        }
        return true
      },
      message: "This Owner's id doesn't exist"
    }
  },
  shop: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "Shop",
    validate: {
      validator: async function (values: any) {
        // validate
        // @ts-ignore
        if (this.user_type == "employee") {
          const shop = await Shop.findById(values);
          if (!shop) return false
        }
        return true
      },
      message: "This Shop's id doesn't exist"
    }
  }
}, {
  strict: true
})

UserSchema.pre('save', async function (next) {
  let password;
  let username;
  if (this.user_type === "employee") {
    const shop = await Shop.findById(this.shop);
    if (shop) {
      let two_letter_name;
      if (shop.name_en.length > 2) {
        two_letter_name = shop.name_en.slice(0, 2);
      }

      two_letter_name = two_letter_name.toLowerCase()

      password = this.phone_number + two_letter_name;
      // @ts-ignore
      const replica_username_count = await this.constructor.find({ user_type: "employee", owner_id: this.owner_id, phone_number: this.phone_number, shop: this.shop }).count();
      username = (replica_username_count + 1).toString() + two_letter_name + this.phone_number;
    }
  } else {
    password = this.password;
    username = this.username;
  }

  console.log(password);
  console.log(username);
  const saltRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password as string, saltRounds);

  this.password = hash;
  this.username = username;
  next();

});

UserSchema.plugin(mongoosePaginate);
// export default mongoose.models.User || mongoose.model('User', UserSchema)
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export default User
