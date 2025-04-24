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

export const UserModel = model("User", UserSchema);
