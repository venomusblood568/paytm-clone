import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes";

dotenv.config()
const PORT = process.env.PORT || 3001;
const cors = require("cors")
const app = express();

app.use(cors())
//the below line is for parse json bodies
app.use(express.json()); 
app.use("/api/v1",apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
