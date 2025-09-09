import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectToDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
connectToDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/", authRoutes);
app.use("/", expenseRoutes);

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
