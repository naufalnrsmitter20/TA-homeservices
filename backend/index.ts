import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import employeeRoute from "./routes/employeeRoute";
import serviceTypeRoute from "./routes/servicesTypeRoute";
import servicesRoute from "./routes/serviceRoute";
import cartRoute from "./routes/cartRoute";
import transactionRoute from "./routes/transactionRoute";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(`/api/auth`, authRoute);
app.use(`/api/users`, userRoute);
app.use(`/api/employee`, employeeRoute);
app.use(`/api/services/type`, serviceTypeRoute);
app.use(`/api/services`, servicesRoute);
app.use(`/api/cart`, cartRoute);
app.use(`/api/transaction`, transactionRoute);

app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`);
});
