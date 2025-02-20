import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import userRouter from "./Routes/user.route.js";

dotenv.config(); 

const app = express();
const PORT = 3000;

app.use(express.json());



app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
  
}))

app.use("/api/users",userRouter)

app.listen(PORT, () => {
  connectDB();
  console.log(`The server is running on http://localhost:${PORT}`);
})
