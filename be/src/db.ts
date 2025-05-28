import dotenv from "dotenv";
import mongoose, { model, Schema } from "mongoose";


dotenv.config();

const uri = process.env.MONGODB_URI;
if(!uri){
    throw new Error(`Mongodb_URI is not defined`)
}
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

const UserSchema = new Schema({
  firstname : String,
  lastname : String,
  username : { type: String, unique: true },
  password : String,
});

//bankSchema
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
export const AccountModel = mongoose.model("Account", accountSchema);
